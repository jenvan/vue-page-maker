<template>
    <div
        v-loading="loading"
        :class="{
            [$style.previewBox]: isPreview
        }"
    >
        <transition name="el-zoom-in-top">
            <EditorHeader
                v-if="!isPreview"
                v-model="scale"
                :is-mobile="isMobile"
                @onUpdateDevice="(v) => {pageConfig.device = v}"
                @onUpdateScale="fixComponentFormPosition"
                @onPreview="(scale = 100) && (isPreview = true)"
                @onImport="handleImport"
                @onExport="handleExport"
                @onPublish="handlePublish"
            ></EditorHeader>
            <el-button
                v-else
                type="primary"
                style="position: fixed;right: 20px;top: 20px;z-index: 10;"
                @click="isPreview = false"
            >
                结束预览
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
                    </el-tab-pane>
                </el-tabs>
            </div>

            <div :class="$style.contentWrap">
                <div
                    ref="domScrollWrap"
                    id="page"
                    :class="$style.content"
                    :style="{
                        width: deviceWidth,
                        height: deviceHeight,
                        transform: `scale(${scale/100})`,
                    }"
                >

                    <div :class="$style.contentHead" :style="{height: pageConfig['hheight'] + 'px', ...pageConfig['hstyle']}">
                        <div :class="[$style.contentHeadArc, $style[pageConfig['heffect']]]"></div>
                    </div>

                    <div :class="$style.contentBody" :style="{
                        width: pageConfig['width'],
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
                                    >
                                    </component>
                                </ViewComponentWrap>
                            </div>
                        </draggable>
                        <div
                            v-if="trueComponentList.length === 0"
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

import * as arrayMethods from 'demo-common/utils/array';
import componentWithDialog from 'demo-common/components/component-with-dialog';

import EditorHeader from './components/EditorHeader.vue';
import EditorToolBar from './components/EditorToolBar.vue';
import ViewComponentWrap from './components/ViewComponentWrap.vue';
import ImportSchema from './components/ImportSchema.vue';
import ExportSchema from './components/ExportSchema.vue';


import toolList from './config/tools';
import pageSchema from './config/pageSchema.js';
import configDefaultItems from './config/defaultItems';

import { vm2Api, api2VmToolItem } from './common/dataConvert';
import { getComponentsAndInitToolsConfig } from './common/utils';
import { generateEditorItem } from './common/editorData';
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
    data() {
        return {
            loading: false,
            isPreview: false,
            scale: 100,

            showTool: true,
            showForm: true,

            toolList,

            editComponentList: [],
            editHeaderComponentList: [],
            editFooterComponentList: [],
            editComp: {},

            pageSchema,
            pageConfigDefault: null, // 原始值
            pageConfigDynamic: {}, // 设置值

            tabName: 'pageTab',
        };
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
                return JSON.parse(JSON.stringify(vm2Api(this.trueComponentList)));
            },
            set(value) {
                this.initEditorData(value);
            }
        },
        pageConfig: {
            get() {
                return this.pageConfigDynamic;
            },
            set(value) {
                this.pageConfigDynamic = value;
                if (this.pageConfigDefault == null) {
                    this.pageConfigDefault = Object.create(value);
                }
            }
        },

        isMobile() {
            return typeof this.pageConfig.device !== 'boolean' || this.pageConfig.device;
        },
        deviceWidth() {
            return this.isMobile ? '375px' : '100vw';
        },
        deviceHeight() {
            return this.isMobile ? '812px' : (this.isPreview ? '100vh' : `calc(${100 / this.scale} * (100vh - 90px))`);
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
            return [this.editHeaderComponentList, this.editComponentList, this.editFooterComponentList];
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
        trueComponentList() {
            this.fixComponentFormPosition();
            this.computedComponentToolBarStatus();
        }
    },
    created() {
        //this.compConfig = {};
        this.pageConfig = {};
        this.compConfig = configDefaultItems;
    },
    mounted() {
        window.document.body.classList.add('page-decorate-design');
    },
    destroyed() {
        window.document.body.classList.remove('page-decorate-design');
    },
    methods: {
        initEditorData(data) {
            const dataList = api2VmToolItem(toolList, data);

            // 初始数据
            this.editComponentList = [];
            this.editHeaderComponentList = [];
            this.editFooterComponentList = [];

            // 重新插入数据
            dataList.forEach((toolItemData) => {
                if (!toolItemData.componentPack) {
                    console.warn('存在一条异常数据，请检查：');
                    console.log(dataList);
                    return;
                }
                const editorData = generateEditorItem(toolItemData);
                // 模拟拖入组件插入数据
                this.editComponentList.push(editorData);
                if (editorData.additional) {
                    // 新加的元素处理特殊配置信息
                    this.additionalStrategy(editorData.additional, editorData);
                }
            });
        },

        // 修复form 弹窗位置
        fixComponentFormPosition() {
            // Popper 通过、父滚动容器 scroll 和window resize 来触发重新计算位置
            // https://github.com/ElemeFE/element/blob/dev/src/utils/popper.js#L464
            setTimeout(() => {
                const evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('scroll', true, false, window, 0);
                // this.$refs.domScrollWrap.dispatchEvent(evt);
            }, 10);
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

        // 计算当前item 位于哪个list
        getCurrentListByItem(item) {
            for (const value of this.componentListGroup) {
                if (value.includes(item)) return value;
            }

            return [];
        },

        /**
         * 移动一个模块到两端 顶或者底部
         * @param element
         * @param position  0 移动到顶部/ 1 移动到底部
         */
        moveToBothEnds(element, position) {
            const curIndex = this.editComponentList.indexOf(element);
            if (curIndex >= 0) {
                // 移除放入到不同的list
                (position === 0 ? this.editHeaderComponentList : this.editFooterComponentList)
                    .push(this.editComponentList.splice(curIndex, 1)[0]);
            }
        },

        /**
         * 需要置顶或置底的需要移入另一个数组 - 同数组元素拖到存在置顶或置底元素会导致异常
         * @param additional
         * @param element
         */
        additionalStrategy(additional, element) {
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

            Object.entries(additional).forEach(([key, value]) => {
                if (Strategy[key]) {
                    Strategy[key].apply(this, [].concat(value));
                }
            });
        },


        // EditorHeader 动作
        handleImport() {
            const instance = componentWithDialog({
                VueComponent: ImportSchema,
                dialogProps: {
                    title: '导入配置',
                    width: '80vw'
                },
                componentListeners: {
                    onImport: (code) => {
                        try {
                            instance.close();
                            this.compConfig = JSON.parse(code);
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
                VueComponent: ExportSchema,
                dialogProps: {
                    title: '导出配置',
                    width: '80vw'
                },
                componentProps: {
                    code: this.compConfig
                }
            });
        },
        handlePublish() {
            this.$message('请查看 console');
            console.log(this.compConfig, this.pageConfig);
        },

        // Form 动作
        handleFormChange() {
            this.fixComponentFormPosition();
        },
        handleItemOperate({ item, command }) {
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
                    return target.splice(target.indexOf(arrayItem) + 1, 0, generateEditorItem(arrayItem));
                },
                remove(target, arrayItem) {
                    this.handleFormCanel();
                    return arrayMethods.remove(target, arrayItem);
                }
            };

            if (command == 'active') {
                this.editComp = item;
                this.showForm = true;
                this.activeTab = 'compTab';
                return;
            }

            const curStrategy = strategyMap[command];
            if (curStrategy) {
                curStrategy.apply(this, [this.getCurrentListByItem(item), item]);
            } else {
                this.$message.error(`系统错误 - 未知的操作：[${command}]`);
            }
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
            if (this.pageConfigDefault.device != this.pageConfigDynamic.device) {
                this.scale = this.pageConfigDynamic.device ? 100 : 50;
            }
        },
        handlePageReset() {
            this.pageConfig = Object.create(this.pageConfigDefault);
        },
        handlePageSubmit() {
            console.info(this.pageConfig);
        },

        // 拖拽动作（新加元素需要做特殊处理）
        handleDragChange(evt) {
            if (evt.added && evt.added.element.additional) {
                // 新加的元素处理特殊配置信息
                this.additionalStrategy(evt.added.element.additional, evt.added.element);
            }
        }
    }
};
</script>

<style>
    body.page-decorate-design{
        overflow: hidden;
    }
    .flip-list-move {
        transition: transform 0.3s;
    }
    .no-move {
        transition: transform 0s;
    }

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
</style>
<style module>
    @import 'demo-common/css/variable.css';
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
        .content {
            box-shadow: none;
            cursor: auto;
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
                padding-left: 6px;
            }
            .el-form-item__content {
                line-height: 36px;
            }
            .el-input-number__decrease, .el-input-number__increase {
                height: 28px;
                margin-top: 4px;
                line-height: 28px;
            }
            .el-collapse{
                border: 0;
                .el-collapse-item__header {
                    height: 38px;
                }
                .el-collapse-item__content {
                    padding-bottom: 5px;
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

    /* Content area */
    .contentWrap {
        position: relative;
        width: 100vw;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content {
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
        position: relative;
        z-index: 0;
        top: 0;
        width: 100%;
        &::after {
            content: attr(data);
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            background: linear-gradient(to bottom, rgba(255,255,255, 0), rgba(255,255,255, 0.3));
        }
    }
    .contentHeadArc {
        position: absolute;
        z-index: 1;
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
            z-index: -1;
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
        position: absolute;
        z-index: 6;
        top: 0;
        margin-left: 50%;
        transform: translate(-50%, 0);
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
