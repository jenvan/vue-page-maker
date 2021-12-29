<template>
    <el-form-item
        :label="getProp('title')"
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0"
    >
        <div :class="$style.row">
            <VueElementForm v-model="image" :schema="imageSchema" :form-footer="{show: false}"></VueElementForm>
            <el-input v-model="title"  :class="$style.text" prefix-icon="el-icon-goods" clearable placeholder="请输入商品标题" title="商品标题"></el-input>
            <el-input v-model="label" :class="$style.text" prefix-icon="el-icon-star-off" clearable placeholder="请输入商品卖点" title="商品卖点"></el-input>
            <el-input-number v-model="price" :min="0" :max="99999" title="商品价格"></el-input-number>
            <VueElementForm v-model="extra" :schema="textSchema" :form-footer="{show: false}"></VueElementForm>
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
        };
    },
    computed: {
        imageSchema() {
            let schema = makeImageItem({title: ""});
            schema.properties.image.default ='https://s4.ax1x.com/2021/12/27/Tre6Ve.jpg';
            return schema;
        },
        textSchema() {
            return makeTextItem({title: "", required: []});
        },
        ...importComputedFn(['image', 'title', 'label', 'price', 'extra']),
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
.text {
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
