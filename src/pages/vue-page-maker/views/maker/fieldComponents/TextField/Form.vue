<template>
    <el-form-item
        :label="getProp('title')"
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0"
    >

        <div :class="$style.row">
            <el-input v-model="text" type="textarea" autosize :placeholder="getProp('placeholder', 'text')"></el-input>
            <el-input-number :class="$style.number" v-model="fontSize" :min="1" :max="128" controls-position="right" size="mini" title="设置字体大小"></el-input-number>
            <el-color-picker :class="$style.picker" v-model="color" size="mini" title="设置字体颜色"></el-color-picker>
            <el-button :class="[$style.more, show ? 'el-icon-caret-top' : 'el-icon-caret-bottom']" size="mini" title="展开/收缩更多设置" @click="show = !show"></el-button>
            <el-select :class="show ? $style.select_show : $style.select" v-model="fontWeight" title="设置字体粗细">
                <el-option v-for="item in fontWeightOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-select :class="show ? $style.select_show : $style.select" v-model="lineHeight" title="设置文本行距">
                <el-option v-for="item in lineHeightOptions" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
            <el-select :class="show ? $style.select_show : $style.select" v-model="textAlign" title="设置文本位置">
                <el-option v-for="item in textAlignOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <el-input v-show="hasLink" v-model="link" :class="$style.link" suffix-icon="el-icon-link" clearable placeholder="请输入文字链接" title="文字链接"></el-input>

    </el-form-item>
</template>

<script>
import { fieldProps, vueUtils, formUtils, schemaValidate } from '@lljj/vue-json-schema-form';
import { importComputedFn, importMethodsFn } from '../utils';

export default {
    props: {
        ...fieldProps
    },
    data() {
        return {
            show: false,
            fontWeightOptions: [{
                label: '正常',
                value: '400'
            }, {
                label: '加粗',
                value: '600'
            }, {
                label: '更粗',
                value: '800'
            }],
            lineHeightOptions: [{
                value: '50%'
            },{
                value: '80%'
            },{
                value: '100%'
            }, {
                value: '120%'
            }, {
                value: '150%'
            }, {
                value: '200%'
            }, {
                value: '300%'
            },{
                value: '500%'
            }],
            textAlignOptions: [{
                label: '两端',
                value: 'justify'
            },{
                label: '居左',
                value: 'left'
            },{
                label: '居中',
                value: 'center'
            },{
                label: '居右',
                value: 'right'
            }],
        };
    },
    computed: {
        fontSize: {
            get() {
                return parseInt(this.get("fontSize").replace("em", "") * 16);
            },
            set(value) {
                return this.set("fontSize", value / 16 + "em");
            }
        },
        hasLink() {
            return !this.getProp('hidden', 'link');
        },
        ...importComputedFn(['text', 'color', 'fontWeight', 'lineHeight', 'textAlign', 'link']),
    },
    methods: {
        ...importMethodsFn(),
    }
};
</script>

<style module>
.row {
    position: relative;
    width: 100%;
}
.picker, .number, .more {
    position: absolute;
    bottom: 2px;
    overflow: hidden;
}
.picker {
    right: 27px;
}
.number {
    right: 55px;
    width: 50px !important;
    :global {
        input {
            width: 50px !important;
            padding: 0 5px !important;
            text-align: left !important;
        }
        .el-input-number__decrease, .el-input-number__increase {
            margin-top: 0px;
            border: 0 !important;
            left: 20px !important;
            right: auto !important;
        }
    }
}
.more {
    right: 2px;
    width: 25px;
    padding: 5px 3px;
    border: 0;
    font-size: 18px;
    overflow: hidden;
}
.select, .select_show {
    float: left;
    width: 33%;
    margin-top: 2px;
    margin-right: 1px;
    height: 0;
    overflow: hidden;
    transition-property: height;
	transition-duration: 0.5s;
}
.select_show {
    height: 38px;
}
.link {
    width: 100%;
    margin-top: 2px;
}
</style>
