<template>
    <el-form-item
        :label="getProp('title')"
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0"
    >
        <div :class="$style.row">
            <VueElementForm v-model="image" :schema="imageSchema" :form-footer="{show: false}"></VueElementForm>
            <VueElementForm v-model="text1" :schema="textSchema" :form-footer="{show: false}"></VueElementForm>
            <VueElementForm v-model="text2" :schema="textSchema" :form-footer="{show: false}"></VueElementForm>
            <VueElementForm v-model="text3" :schema="textSchema" :form-footer="{show: false}"></VueElementForm>
            <el-input v-model="link" :class="$style.link" prefix-icon="el-icon-link" clearable placeholder="请输入文字链接或留空" title="文字链接"></el-input>
            <div :class="$style.extend">
                <div>
                    <el-select :class="$style.layout" v-model="direction" title="图文布局">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input-number :class="$style.size" v-model="size" :min="0" :max="120" controls-position="right" :title="sizeTitle"></el-input-number>
                </div>
                <VueElementForm v-model="animate" :schema="animateSchema" :form-footer="{show: false}"></VueElementForm>
                <VueElementForm v-model="style" :schema="styleSchema" :form-footer="{show: false}"></VueElementForm>
            </div>
        </div>
    </el-form-item>
</template>

<script>
import VueElementForm, { fieldProps, vueUtils, formUtils, schemaValidate } from '@lljj/vue-json-schema-form';
import { importComputedFn, importMethodsFn, makeTextItem, makeImageItem, makeAnimateItem, makeStyleItem } from '../utils';

export default {
    components: {
        VueElementForm
    },
    props: {
        ...fieldProps
    },
    data() {
        return {
            activeName: "",
            options: [{
                value: 'column',
                label: '上图下字'
            }, {
                value: 'column-reverse',
                label: '上字下图'
            }, {
                value: 'row',
                label: '左图右字'
            }, {
                value: 'row-reverse',
                label: '左字右图'
            }],
        };
    },
    computed: {
        sizeTitle () {
            return /row/.test(this.direction) ? "图片宽度" : "图片高度";
        },
        imageSchema() {
            let schema = makeImageItem({title: ""});
            schema.properties.image.default ='https://s4.ax1x.com/2021/12/16/T9fouV.png';
            return schema;
        },
        textSchema() {
            return makeTextItem({title: "", required: []});
        },
        animateSchema() {
            return makeAnimateItem({title:"图片动效", fold: true});
        },
        styleSchema() {
            return makeStyleItem({title:"文字样式", fold: true});
        },
        ...importComputedFn(['image', 'text1', 'text2', 'text3', 'link', 'direction', 'size', 'animate', 'style']),
    },
    methods: {
        ...importMethodsFn(),
    }
};
</script>

<style module>
.row {
    width: 100%;
    padding: 5px;
    background: #FFF;
    border: dotted 1px #999;
    border-radius: 5px;
}
.link {
    margin-top: 3px;
}
.extend {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    :global .el-collapse {
        border: 0;
        .el-collapse-item__header {
            width: 100%;
            height: auto;
            border: 0;
            color: #666;
            line-height: 20px;
            text-align: right;
            display: inline-block;
        }
    }
}
.layout {
    :global {
        input {
            width: 95px;
        }
    }
}
.size {
    width: 60px !important;
    :global {
        input {
            width: 60px !important;
            padding: 0 5px !important;
            text-align: left !important;
        }
        .el-input-number__increase, .el-input-number__decrease {
            background: #FFF !important;
            width: 18px !important;
            height: 18px !important;
            border: 0 !important;
            left: 40px !important;
            right: auto !important;
        }
        .el-input-number__increase {
            top: 0px !important;
        }
        .el-input-number__decrease {
            bottom: 4px !important;
        }
    }
}

</style>
