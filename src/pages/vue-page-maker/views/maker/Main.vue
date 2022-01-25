<template>
    <div
        v-loading="loading"
        :class="{
            editMode: !isPreview,
            [$style.previewBox]: isPreview
        }"
    >
        <transition name="el-zoom-in-top">
            <EditorHeader
                v-if="!isPreview"
                v-model="scale"
                :is-mobile="fakeMobile"
                @onMenu="handleMenu"
                @onPreview="handlePreview(true)"
                @onUpdateDevice="(v) => {this.fakeMobile = v}"
                @onImport="handleImport"
                @onExport="handleExport"
                @onPublish="handlePublish"
            ></EditorHeader>
            <el-button
                v-if="isPreview && action != ''"
                type="success"
                size="min"
                style="position: fixed; top: 20%; right: 0px; z-index: 999999; padding: 10px;"
                @click="handlePreview(false)"
            >
                结<br>束<br>预<br>览
            </el-button>
        </transition>

        <div :class="$style.container">
            <div
                v-show="showTool"
                :class="$style.toolBox"
            >
                <EditorToolBar
                    :current-use-component-num="currentUseComponentNum"
                    :drag-group="dragOptions.group"
                    :config-tools="toolList"
                    @onFilter="$message.error('该组件添加数目已达上限！')"
                >
                </EditorToolBar>
            </div>
            <div
                :class="[$style.toolSwitch, showTool ? '': $style.hideTool]"
                @click="showTool = !showTool"
            >
                <i class="el-icon-caret-left"></i>
            </div>

            <div
                v-show="showForm"
                :class="$style.formBox"
            >
                <i
                    class="el-icon-close"
                    :class="$style.close"
                    @click="showForm=false"
                ></i>
                <el-tabs v-model="activeTab">
                    <el-tab-pane
                        v-if="editComp && editComp.isEdit"
                        :label="'配置 - ' + editComp.title"
                        name="compTab"
                    >
                        <div :class="$style.form">
                            <!-- 传入form使用传入的form组件 -->
                            <component
                                :is="editComp.componentFormName"
                                v-if="editComp.componentFormName"
                                slot="componentForm"
                                :value="editComp.componentValue"
                                @on-change="handleFormChange"
                                @on-cancel="handleFormCanel"
                                @on-submit="handleFormSubmit"
                            >
                            </component>
                            <!-- schema生成form -->
                            <VueElementForm
                                v-else
                                slot="componentForm"
                                :value="editComp.componentValue"
                                :schema="editComp.componentPack.propsSchema"
                                :ui-schema="editComp.componentPack.uiSchema"
                                :error-schema="editComp.componentPack.errorSchema"
                                :custom-rule="editComp.componentPack.customRule"
                                :form-props="editComp.componentPack.formProps"
                                :form-footer="{okBtn: '设置', cancelBtn: '关闭'}"
                                @on-change="handleFormChange"
                                @on-cancel="handleFormCanel"
                                @on-submit="handleFormSubmit"
                            >
                            </VueElementForm>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane
                        label="页面设置"
                        name="pageTab"
                    >
                        <div :class="$style.form">
                            <VueElementForm
                                v-model="pageConfig"
                                :schema="pageSchema.schema"
                                :ui-schema="pageSchema.uiSchema"
                                :form-footer="pageSchema.formFooter"
                                :form-props="pageSchema.formProps"
                                @on-change="handlePageChange"
                                @on-cancel="handlePageReset"
                                @on-submit="handlePageSubmit"
                            >
                            </VueElementForm>
                        </div>

                        <el-dropdown v-show="action == 'edit'" :class="$style.subpage" split-button @click="handleCommand('+')" @command="handleCommand">
                            新建子页面
                            <el-dropdown-menu v-if="Object.keys(subpage).length > 1" slot="dropdown">
                                <el-dropdown-item icon="el-icon-arrow-down" disabled>子页面列表：</el-dropdown-item>
                                <el-dropdown-item v-for="(v, k) in subpage" :key="k" :command="k" :icon="k == name ? 'el-icon-star-on' : 'el-icon-star-off'" :title="v.page.title">{{k}}</el-dropdown-item>
                                <el-dropdown-item divided command="-" icon="el-icon-delete">删除当前子页面：{{name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </el-tab-pane>
                </el-tabs>
            </div>

            <div id="page" :class="$style.deviceWrap">
                <div id="device"
                    :class="$style.device"
                    :style="{
                        width: deviceWidth,
                        height: deviceHeight,
                        transform: `scale(${scale/100})`,
                    }"
                >

                    <div :class="$style.contentHead" :style="{height: pageConfig['hheight'] / 16 + 'em', ...pageConfig['hstyle']}">
                        <div :class="[$style.contentHeadArc, $style[pageConfig['heffect']]]"></div>
                    </div>

                    <div :class="[$style.contentBody, 'content']" :style="{
                        width: pageConfig['width'],
                        maxWidth: (pageConfig['mwidth'] || '1180px'),
                        minHeight: '100%',
                    }">

                        <draggable
                            ref="draggable"
                            v-model="editComponentList"
                            v-bind="dragOptions"
                            :class="$style.dragArea"
                            @change="handleDragChange"
                        >
                            <div
                                v-for="item in trueComponentList"
                                :key="item.id"
                                :slot="item.$$slot || 'default' "
                                :class="{
                                    draggableSlot: item.$$slot,
                                    draggableItem: !item.$$slot,
                                    [`draggableSlot_${item.$$slot}`]: item.$$slot
                                }"
                            >
                                <ViewComponentWrap
                                    :editor-item="item"
                                    :is-preview="isPreview"
                                    @onOperate="handleItemOperate"
                                >
                                    <component
                                        :is="item.componentViewName"
                                        slot="componentView"
                                        :form-data="item.componentValue"
                                        :zoom="scale/100"
                                    >
                                    </component>
                                </ViewComponentWrap>
                            </div>
                        </draggable>
                        <div
                            v-if="trueComponentList.length === 0 && !isPreview"
                            :class="$style.tipBox"
                        >
                            <div :class="$style.icon"><i class="el-icon-thumb"></i></div>
                            <p>请在左边选择模块并拖入该区域</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import VueElementForm from '@lljj/vue-json-schema-form';

import * as arrayMethods from './common/utils/array';
import {debounce, throttle} from './common/utils/noRepeat';
import componentWithDialog from './common/componentWithDialog';
import { vm2Api, api2VmToolItem } from './common/dataConvert';
import { getComponentsAndInitToolsConfig, generateEditorItem } from './common/editorData';

import EditorHeader from './components/EditorHeader.vue';
import EditorToolBar from './components/EditorToolBar.vue';
import ViewComponentWrap from './components/ViewComponentWrap.vue';

import PageList from './components/PageList.vue';
import MediaList from './components/MediaList.vue';
import SchemaImport from './components/SchemaImport.vue';
import SchemaExport from './components/SchemaExport.vue';

import toolList from './config/tools';
import pageSchema from './config/pageSchema';
import defaultConfig from './config/demo';

import './fieldComponents/register';

// 工具栏配置的组件
const components = getComponentsAndInitToolsConfig(toolList);

export default {
    name: 'Editor',
    components: {
        ...components,
        VueElementForm,
        Draggable,
        EditorHeader,
        EditorToolBar,
        ViewComponentWrap
    },
    props: {
        action: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            default: "index",
        },
    },
    data() {
        return {
            loading: true,
            isPreview: true,
            scale: 100,

            showTool: true,
            showForm: true,

            deviceWidth: "100vw",
            deviceHeight: "100vh",

            toolList,

            editComp: {},
            editComponentList: [],
            editHeaderComponentList: [],
            editFooterComponentList: [],
            templateComponentHeader: [],
            templateComponentFooter: [],

            pageSchema,
            pageConfigDefault: null, // 原始值
            pageConfigDynamic: {},   // 设置值

            subpage: {}, // 子页面集合 {名称:标题}

            tabName: 'pageTab',
        };
    },

    created() {
        window.addEventListener("resize", () => {
            this.handleResize();
            let e = document.createEvent("UIEvents");
            e.initUIEvent("scroll", true, false, window, 0);
            document.querySelector('#device').dispatchEvent(e);
        }, true);
        window.addEventListener("scroll", debounce(this.handleScroll, 300), true);
        this.loadEditorData(this.action, this.id);
    },
    mounted() {
        window.document.body.classList.add('page-decorate-design');
    },
    destroyed() {
        window.document.body.classList.remove('page-decorate-design');
    },

    computed: {
        activeTab: {
            get() {
                return this.editComp && this.editComp.isEdit ? this.tabName : 'pageTab';
            },
            set(value) {
                this.tabName = value;
            }
        },
        compConfig: {
            get() {
                return JSON.parse(JSON.stringify(vm2Api([].concat(this.editHeaderComponentList, this.editComponentList, this.editFooterComponentList))));
            },
            set(value) {
                this.initTopNav();
                this.initEditorData(value);
            }
        },
        pageConfig: {
            get() {
                return this.pageConfigDynamic;
            },
            set(value) {
                this.initTopNav();
                this.pageConfigDynamic = value;
                if (this.pageConfigDefault == null) {
                    this.pageConfigDefault = Object.create(value);
                }
            }
        },

        fakeMobile: {
            get() {
                return typeof this.pageConfig.fitMobile !== 'boolean' || this.pageConfig.fitMobile;
            },
            set(v) {
                this.pageConfig.fitMobile = v;
            }
        },

        dragOptions() {
            return {
                animation: 300,
                group: 'listComponentsGroup',
                disabled: this.isPreview,
                ghostClass: this.$style.ghost,
                filter: this.$style.disabled,
                draggable: '.draggableItem',
                tag: 'div',
                swapThreshold: 0.3,
                // forceFallback: true
                // fallbackTolerance: 0
            };
        },

        // 头部、中间、底部各个list集合
        componentListGroup() {
            return [this.templateComponentHeader, this.editHeaderComponentList, this.editComponentList, this.editFooterComponentList, this.templateComponentFooter];
        },

        // 真实使用的组件 - 包含顶部、底部、不可拖动的模块平铺
        trueComponentList() {
            return [].concat(...this.componentListGroup);
        },

        // 计算出各个模块当前的使用数量
        currentUseComponentNum() {
            return this.trueComponentList.reduce((preVal, curVal) => {
                preVal[curVal.componentViewName] = preVal[curVal.componentViewName]
                    ? (preVal[curVal.componentViewName] + 1)
                    : 1;
                return preVal;
            }, {});
        }
    },
    watch: {
        $route: function(newVal, oldVal) {
            if (newVal != oldVal) {
                this.loadEditorData(this.action, this.id);
            }
        },
        isPreview: {
            handler (val) {
                this.handleResize();
            },
            immediate: true
        },
        scale: {
            handler (val) {
                this.handleResize();
            },
            immediate: true
        },
        fakeMobile: {
            handler (val) {
                this.handleResize();
            },
            immediate: true
        },
        trueComponentList() {
            this.computedComponentToolBarStatus();
        }
    },
    methods: {
        loadEditorData(action = "", id = "") {

            if (this.action == "" && this.id == "") {
                id = "7a3cn10yozlk46gjqb9m532";
                if (/(127|192|siteimg)/.test(location.host)){
                    action = /(127)/.test(location.host) ? "edit" : "view";
                    return this.$forward(action, id);
                }
                if (location.host == "localhost") {
                    id = "7a3cn10yozlk46gjqb9m532";
                }
            }

            if (id && id.length > 16){
                return this.$http.post("/get?id=" + id).then((data) => {
                    this.subpage = {};
                    let name = "";
                    for (let i in data.files) {
                        try {
                            let item = JSON.parse(data.files[i]["content"]);
                            name = item["page"]["name"] ? item["page"]["name"] : i;
                            this.subpage[name] = item;
                        }
                        catch(e) {
                            console.warn("子页面配置错误", i + "：" + data.files[i]["content"]);
                        }
                    }

                    if (typeof this.subpage[this.name] == "undefined") {
                        if (typeof this.subpage["index"] != "undefined") name = "index";
                        console.error("!!! 指定子页面 " + this.name + " 不存在，跳转到默认页面 " + name + " >>>");
                        return this.$forward(this.action, this.id, name);
                    }

                    this.initEditorTemplate(this.subpage[this.name]["page"]["template"]);
                    
                    const {page, component} = this.subpage[this.name];
                    this.pageConfig = page;
                    this.compConfig = component;
                    document.title = this.pageConfig["title"];
                    if (action == "" || action == "view") {
                        this.isPreview = true;
                        this.scale = 100;
                    }
                    else {
                        this.isPreview = false;
                        this.scale = this.fakeMobile ? 100 : 50;
                    }
                    this.loading = false;
                }).catch(() => {
                    this.isPreview = true;
                    this.loading = false;
                    this.$message.error("服务异常，正在重试 ...");
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 3000);
                });
            }
            
            document.title = "页面编辑器 - VUE PAGE MAKER";
            this.pageConfig = this.id == "demo" ? defaultConfig.page : {};
            this.compConfig = this.id == "demo" ? defaultConfig.component : [];
            this.isPreview = false;
            this.loading = false;
        },
        initEditorData(data) {
            // 初始数据
            this.editComponentList = [];
            this.editHeaderComponentList = [];
            this.editFooterComponentList = [];

            // 转换数据
            const dataList = api2VmToolItem(toolList, data);

            // 重新插入数据
            dataList.forEach((toolItemData) => {
                if (!toolItemData.componentPack) {
                    return console.warn('组件存在一条异常数据，请检查：', dataList, toolItemData);
                }
                const editorData = generateEditorItem(toolItemData);
                // 模拟拖入组件插入数据
                this.editComponentList.push(editorData);
                // 新加的元素处理特殊配置信息
                editorData.additional && this.additionalStrategy(editorData);
            });
        },
        initEditorTemplate(name){
            this.templateComponentHeader = [];
            this.templateComponentFooter = [];
            if (typeof name != "string" || !/^\w+$/.test(name)) return;
            if (name == this.name || typeof this.subpage[name] == "undefined") {
                return this.$message.error("页面模板设置错误");
            }
            const data = this.subpage[name]["component"];
            const dataList = api2VmToolItem(toolList, data);
            dataList.forEach((toolItemData) => {
                if (!toolItemData.componentPack) {
                    return console.warn('模板存在一条异常数据，请检查：', dataList, toolItemData);
                }
                const editorData = generateEditorItem(toolItemData);
                if (editorData.additional && editorData.additional.topDisplay){
                    editorData.$$slot = 'header';
                    this.templateComponentHeader.push(editorData);
                }
                else{
                    editorData.$$slot = 'footer';
                    this.templateComponentFooter.push(editorData);
                }
            });
        },
        initTopNav() {
            let obj1 = document.getElementById("nav-top");
            obj1 && obj1.parentElement && obj1.parentElement.id == "page" && document.getElementById("page").removeChild(obj1);
            let obj2 = document.getElementById("nav-tab");
            obj2 && obj2.parentElement && obj2.parentElement.id == "page" && document.getElementById("page").removeChild(obj2);
        },

        // 计算各个组件状态栏按钮状态
        computedComponentToolBarStatus() {
            this.componentListGroup.forEach((componentList) => {
                componentList.forEach((component, componentIndex) => {
                    Object.assign(component.toolBar, {
                        moveUpDisabled: componentIndex === 0, // 是否可上移动
                        moveDownDisabled: componentIndex === componentList.length - 1, // 是否可下移
                        copyDisabled: (this.currentUseComponentNum[component.componentViewName] || 0) >= component.maxNum, // 是否可copy
                        removeDisabled: component.additional && component.additional.unRemove // 是否可移除
                    });
                });
            });
        },

        /**
         * 移动一个模块到两端 顶或者底部
         * @param element
         * @param position  0 移动到顶部/ 1 移动到底部
         */
        moveToBothEnds(element, position) {
            const curIndex = this.editComponentList.indexOf(element);
            if (curIndex >= 0) {
                (position === 0 ? this.editHeaderComponentList : this.editFooterComponentList).push(this.editComponentList.splice(curIndex, 1)[0]);
            }
        },

        /**
         * 需要置顶或置底的需要移入另一个数组 - 同数组元素拖到存在置顶或置底元素会导致异常
         * @param element
         */
        additionalStrategy(element) {
            const Strategy = {
                topDisplay() {
                    element.$$slot = 'header';
                    this.moveToBothEnds(element, 0);
                },
                bottomDisplay() {
                    element.$$slot = 'footer';
                    this.moveToBothEnds(element, 1);
                }
            };

            Object.entries(element.additional).forEach(([key, value]) => {
                if (Strategy[key]) {
                    Strategy[key].apply(this, [].concat(value));
                }
            });
        },



        // 窗口调整
        handleResize(){

            let [w, h] = ['375px', '667px'];
            //let [w, h] = ['414px', '736px'];
            if (this.isPreview) {
                let inMobile = document.documentElement.clientWidth < 1024;
                this.deviceWidth  = (this.fakeMobile && !inMobile) ? w : '100vw';
                this.deviceHeight = (this.fakeMobile && !inMobile) ? h : '100vh';
            }
            else {
                this.deviceWidth  = this.fakeMobile ? w : '100vw';
                this.deviceHeight = this.fakeMobile ? h : `calc(${100 / this.scale} * (100vh - 90px))`;
            }

            setTimeout(() => {
                let o = document.querySelector("#page");
                let w = document.querySelector("#device").clientWidth;
                if (w <= 375){
                    o.style.fontSize = 100 / 1.75 + "%";
                }
                else if (w <= 480){
                    o.style.fontSize = 100 / 1.65 + "%";
                }
                else if (w <= 1024){
                    o.style.fontSize = 100 / 1.4 + "%";
                }
                else {
                    o.style.fontSize = "100%";
                }
            }, 300);
        },

        // 窗口滚动
        handleScroll() {
            let obj = document.querySelector("#device");
            let h = obj.clientHeight;
            let t = obj.getBoundingClientRect().top;
            document.querySelectorAll(".animate *").forEach(function(current) {
                let _t = current.getBoundingClientRect().top;
                let _h = current.getBoundingClientRect().height;
                let _c = current.getAttribute("animate");
                if (!_c) return;
                if (t - _h < _t && _t < t + h - 50) {
                    current.classList.contains("animate__animated") || _c.split(" ").forEach((name) => {
                        current.classList.add(name);
                    });
                }
                else {
                    current.classList.contains("animate__animated") && _c.split(" ").forEach((name) => {
                        current.classList.remove(name);
                    });
                }
            });
        },

        // EditorHeader 动作
        handlePreview(isEnter) {
            this.isPreview = isEnter;
            this.scale = 100;
            document.querySelector('#device').scrollTo(0, 0);
            if (!isEnter && this.action != "edit") this.$forward("edit", this.id, this.name);
        },
        handleMenu(command) {
            if (command == "auth") {
                this.$http.auth(999);
            }
            if (command == "new") {
                this.$forward('new');
            }
            if (command == "page") {
                this.$http.post("get").then((data) => {
                    const instance = componentWithDialog({
                        VueComponent: PageList,
                        dialogProps: {
                            title: '页面列表',
                            width: '90vw',
                            top: '5vh',
                        },
                        componentProps: {
                            list: Object.values(data.page)
                        },
                        componentListeners: {
                            onForward: (action, id) => {
                                instance.close();
                                this.$forward(action, id);
                            },
                            onRemove: (id) => {
                                this.$http.get("set?id=" + id).then(() => {
                                    instance.close();
                                    this.$forward('new');
                                    setTimeout(() => {
                                        this.handleMenu("page");
                                    }, 300)
                                });
                            }
                        }
                    });
                });
            }
            if (command == "media") {
                this.$http.post("get").then((data) => {
                    componentWithDialog({
                        VueComponent: MediaList,
                        dialogProps: {
                            title: '素材列表',
                            width: '90vw',
                            top: '5vh',
                        },
                        componentProps: {
                            media: data.media,
                            canChoose: false,
                        }
                    });
                });
            }
        },
        handleImport() {
            const instance = componentWithDialog({
                VueComponent: SchemaImport,
                dialogProps: {
                    title: '导入配置',
                    width: '80vw'
                },
                componentListeners: {
                    onImport: (code) => {
                        try {
                            instance.close();
                            let {page, component} = JSON.parse(code);
                            this.pageConfig = page;
                            this.pageConfig.name = "";
                            this.pageConfig.title =  this.pageConfig.title + " - 导入页面";
                            this.compConfig = component;
                            this.$message.success('导入成功');
                        } catch (e) {
                            this.$alert(e.message, '导入失败，详细查看控制台');
                            throw e;
                        }
                    }
                }
            });
        },
        handleExport() {
            componentWithDialog({
                VueComponent: SchemaExport,
                dialogProps: {
                    title: '导出配置',
                    width: '80vw'
                },
                componentProps: {
                    code: {page: this.pageConfig, component: this.compConfig}
                }
            });
        },
        handlePublish() {
            console.log("Page:",this.pageConfig, "Component:", this.compConfig);

            let name = this.pageConfig["name"];
            if (!/^[\w]{1,10}$/.test(name)) {
                return this.$alert("长度为1到10的字符或数字组合", "页面名称不合要求");
            }

            let data = {page: this.pageConfig, component: this.compConfig};
            this.$http.post("/set?id=" + this.id + "&name=" + name, {content: JSON.stringify(data)}).then((result) => {
                this.$message({type:"success", message:"发布成功", duration: 2000});
                if (this.action != "edit" || this.name != name) {
                    this.$forward("edit", result.id, name);
                }
            });
        },

        // Form 动作
        handleItemOperate({ item, command }) {

            let list = [];
            for (list of this.componentListGroup) {
                if (list.includes(item)) {
                    if (this.action == "edit" && (list == this.templateComponentHeader || list == this.templateComponentFooter)) {
                        return this.$message.error(`请在模板页面 ${this.pageConfig["template"]} 中操作该组件`);
                    }
                    break;
                } 
            }

            if (command == 'active') {
                this.editComp = item;
                this.showForm = true;
                this.activeTab = 'compTab';
                return;
            }

            const strategyMap = {
                moveUp(target, arrayItem) {
                    return arrayMethods.moveUp(target, arrayItem);
                },
                moveDown(target, arrayItem) {
                    return arrayMethods.moveDown(target, arrayItem);
                },
                copy(target, arrayItem) {
                    // 不copy数据可以使用  emptyPack 代替 arrayItem
                    // const { componentValue, ...emptyPack } = arrayItem;
                    return target.splice(target.indexOf(arrayItem) + 1, 0, {...generateEditorItem(arrayItem)});
                },
                remove(target, arrayItem) {
                    this.handleFormCanel();
                    return arrayMethods.remove(target, arrayItem);
                }
            };
            if (typeof strategyMap[command] == "undefined") {
                this.$message.error(`系统错误 - 未知的操作：[${command}]`);
            }
            strategyMap[command].apply(this, [list, item]);
        },
        handleFormChange() {
            
        },
        handleFormCanel() {
            this.activeTab = 'pageTab';
            this.editComp.isEdit = false;
        },
        handleFormSubmit(data) {
            Object.assign(this.editComp, {
                componentValue: data,
                isEdit: true
            });
            console.log("-=>", JSON.parse(JSON.stringify(data)));
        },

        handlePageChange() {

        },
        handlePageReset() {
            this.pageConfig = Object.create(this.pageConfigDefault);
        },
        handlePageSubmit() {
            console.info("Page config:", this.pageConfig);
            this.initEditorTemplate(this.pageConfig["template"]);
        },

        handleCommand(what) {
            if (what == "+") {
                if (this.action == "new") {
                    return this.$message("请将“新页面”先发布，再来增加子页面");
                }
                this.pageConfig.name = "";
                this.pageConfig.title = "";
                this.compConfig = {};
                return;
            }
            if (what == "-") {
                if (Object.keys(this.subpage).length == 1) {
                    this.$alert("如需删除主页面，请在左上角菜单“我的页面”列表中操作", "每个页面必须保留一个子页面");
                    return;
                }
                this.$http.post("/set?id=" + this.id + "&name=" + this.name).then(() => {
                    this.$forward("edit", this.id);
                });
                return;
            }
            if (what != this.name) {
                this.$forward(this.action, this.id, what);
            }
        },

        // 拖拽动作（新加元素需要做特殊处理）
        handleDragChange(evt) {
            if (evt.added && evt.added.element.additional) {
                // 新加的元素处理特殊配置信息
                this.additionalStrategy(evt.added.element);
            }
        }
    }
};
</script>

<style>
    @media screen and (max-width: 768px) {
        .hiddenInMobile {
            display: none;
        }
        .floatInMobile {
            position: fixed;
            left: 0px;
            bottom: 10px;
            z-index: 8;
            width: 100%;
        }
    }
    body.page-decorate-design{
        overflow: hidden;
    }
</style>
<style module>
    @import './css/variable.css';
    :root {
        --tool-bar-width: 260px;
        --form-box-width: 360px;
    }

    /* 预览模式 同步样式重置 */
    .previewBox {
        .toolBox,.toolSwitch,.formBox {
            display: none;
        }
        .container {
            height: 100vh;
        }
        .device {
            box-shadow: none;
            cursor: auto;
            &::-webkit-scrollbar {
                width: 8px;
                height: auto;
            }
        }

        :global {
            .vueEditor_viewComponentBox {
                box-shadow: none;
                cursor: auto;
                &:after {
                    display: none;
                    content: none;
                }
            }
        }
    }
    .container {
        position: relative;
        box-sizing: border-box;
        width: 100vw;
        height: calc(100vh - var(--site-top-height));
        padding: 0;
        transition: 0.2s ease;
    }

    /* Tools area */
    .toolBox {
        position: absolute;
        left: 0;
        top: 4px;
        bottom: 4px;
        width: var(--tool-bar-width);
        background: var(--color-white);
        overflow: auto;
        box-shadow: 4px 4px 8px 0 color(var(--color-black) a(0.3));
        z-index: 8;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
    .toolSwitch {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: absolute;
        width: 18px;
        height: 50px;
        background: var(--color-white);
        left: var(--tool-bar-width);
        top: 50%;
        margin-top: -25px;
        box-shadow: 4px 0 4px 0 color(var(--color-black) a(0.2));
        border-radius: 0 10px 10px 0;
        z-index: 9;
        &:hover {
            opacity: 1;
        }
        &.hideTool {
            left: 0;
            transform: rotate(180deg);
            border-radius: 10px 0 0 10px ;
            box-shadow: -4px 0 4px 0 color(var(--color-black) a(0.2));
        }
    }

    /* Form area */
    .formBox {
        position: fixed;
        z-index: 9;
        top: calc(var(--site-top-height) + 4px);
        right:0;
        width: var(--form-box-width);
        height: calc(100vh - var(--site-top-height) - 8px);
        padding: 0 14px;
        background: var(--color-white);
        box-shadow: -4px 4px 8px 0 rgba(0,0,0,.3);
        overflow: auto;
    }
    .form {
        max-height: calc(100vh - 200px);
        padding: 10px 0;
        overflow: auto;
        :global {
            .formFooter_item {
                position: fixed;
                bottom: -10px;
                right: 10px;
                border: 0;
            }
            input {
                height: 32px;
                padding-left: 6px;
            }
            textarea {
                height: 34px;
                padding-left: 6px;
            }
            .el-form-item__content {
                line-height: 36px;
            }
            .el-input-number__decrease, .el-input-number__increase {
                height: 28px;
                margin-top: 4px;
                background: #FFF;
                line-height: 28px;
            }
            .el-color-picker__trigger {
                background-color: #FFF;
                border-color: #FFF;
            }
            .el-collapse{
                border: 0;
                .el-collapse-item__header {
                    height: 38px;
                }
                .el-collapse-item__content {
                    padding-bottom: 5px;
                }
                .el-collapse-item__wrap {
                    border-bottom: 0;
                }
                .el-icon-arrow-right {
                    margin: 0;
                }
            }
        }
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }
    .subpage {
        position: fixed;
        z-index: 6;
        bottom: 12px;
        right: 90px;
    }
    .close {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 10px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: #999;
        font-size: 18px;
        box-shadow: 0 0 4px 0 color(var(--color-black) a(0.1));
        transition: all ease 0.3s;
        z-index: 9;
        &:hover {
            color: #F00;
            box-shadow: 0 0 4px 0 color(var(--color-black) a(0.2));
            opacity: 1;
        }
    }

    /* Device area */
    .deviceWrap {
        position: relative;
        width: 100vw;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .device {
        overflow-x: hidden;
        overflow-y: auto;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.3);
        text-align: center;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
        &::-webkit-scrollbar-track {
            background-color: var(--background-color-base);
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: var(--color-text-placeholder);
        }
    }
    .contentHead {
        position: absolute;
        z-index: -9;
        top: 0;
        width: 100%;
        &::after {
            content: '';
            position: absolute;
            z-index: -9;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 0.3) 70%, rgba(255,255,255, 0.7) 100%);
        }
    }
    .contentHeadArc {
        position: absolute;
        z-index: -99;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100px;
        background: transparent;
        overflow: hidden;
        transform: scaleY(2);
        &::before, &::after {
            content: '';
            position: absolute;
            z-index: -99;
            left: -20%;
            width: 140%;
            height: 100%;
            display: none;
        }
        &::before {
            bottom: -50%;
            border-radius: 50% 50% 0 0;
            background: #FFF;
        }
        &::after {
            top: -30%;
            border-radius: 50%;
            box-shadow: 0px 0px 0px 9999px #FFF;
        }
        &.inside::before {
            display: block;
        }
        &.outside::after {
            display: block;
        }
    }
    .contentBody {
        position: static;
        z-index: 6;
        min-height: 100%;
        /* margin-left: 50%;
        transform: translate(-50%, 0); */
        margin: 0 auto;
    }

    .dragArea {
        min-height: 80vh;
        background: transparent;
        :global {
            .draggableToolItem {
                width: 100%;
                max-width: 100%;
                &:local {
                    &.ghost {
                        background-color: color(var(--color-primary) a(0.4)) !important;
                        box-shadow: 0 3px 14px 3px color(var(--color-primary) a(0.6)), 0 10px 10px 1px color(var(--color-primary) a(0.5));
                        height: 120px !important;
                        padding: 20px;
                        &>div {
                            width: 100%;
                            height: 100%;
                            background-color: var(--color-white);
                        }
                        p {
                            font-size: 16px;
                            line-height: 24px;
                        }
                    }
                }
            }
            .emptyBox {
                min-height: 350px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .viewEmpty_IconBox {
                color: color(var(--checkbox-color) a(0.7));
                font-size: 50px;
                text-align: center;
            }
            .el-image {
                vertical-align: top;
            }
        }
    }
    .tipBox{
        pointer-events: none;
        top: 20px;
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
        margin: 30vh 0;
        .icon {
            font-size: 64px;
            transform: rotateX(180deg) rotate(270deg);
        }
        p {
            margin: 20px 0;
            font-size: 16px;
        }
    }
</style>
