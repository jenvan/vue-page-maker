<template>
    <el-form-item
        :label="getProp('title')"
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0"
    >

        <div :class="$style.row">
            <el-input v-model="text" type="textarea" autosize :placeholder="getProp('placeholder', 'text')"></el-input>
            <el-color-picker :class="$style.picker" v-model="color" size="mini" title="字体颜色"></el-color-picker>
            <el-input-number :class="$style.number" v-model="fontSize" :min="1" :max="128" controls-position="right" size="mini" title="字体大小"></el-input-number>
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
        ...importComputedFn(['text', 'color', 'link']),
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
.picker, .number {
    position: absolute;
    bottom: 2px;
    right: 2px;
    overflow: hidden;
}
.picker {
    right: 54px;
}
.number {
    width: 50px !important;
    :global {
        input {
            width: 50px !important;
            padding: 0 5px !important;
            text-align: left !important;
        }
        .el-input-number__decrease, .el-input-number__increase {
            background: #FFF !important;
            border: 0 !important;
            left: 20px !important;
            right: auto !important;
        }
    }
}
.link {
    width: 100%;
    margin-top: 2px;
}
</style>
