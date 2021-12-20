<template>
    <el-form-item
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0"
    >
        <el-collapse v-model="activeName">
            <el-collapse-item :title="getProp('title')" :name="getProp('fold') ? 'fold' : 'unfold'">
                
                <el-row :class="$style.row">

                    <el-col :span="4" :class="$style.label">背景</el-col>
                    <el-col :span="20">
                        <VueElementForm v-model="background" :schema="imgSchema" :form-footer="{show: false}"></VueElementForm>
                    </el-col>

                    <el-col :span="4" :class="$style.label">边框</el-col>
                    <el-col :span="20" :class="$style.field">
                        <el-input v-model="borderWidth" title="边框粗细" placeholder="n 或 n n n n">
                            <el-color-picker slot="prepend" v-model="borderColor" title="边框颜色" size="small"></el-color-picker>
                            <el-input-number slot="append"  v-model="borderRadius" :min="0" :max="999" controls-position="right" title="边框圆角大小"></el-input-number>
                        </el-input>
                    </el-col>

                    <el-col :span="4" :class="$style.label">边距</el-col>
                    <el-col :span="10" :class="$style.field">
                        <el-input v-model="margin">
                            <template slot="append">&nbsp;&nbsp;外&nbsp;</template>
                        </el-input>
                    </el-col>
                    <el-col :span="10" :class="$style.field">
                        <el-input v-model="padding">
                            <template slot="prepend">|&nbsp;内&nbsp;&nbsp;</template>
                        </el-input>
                    </el-col>

                    <el-col :span="4" :class="$style.label">位置</el-col>
                    <el-col :span="20" :class="$style.field">
                        <el-radio-group v-model="textAlign">
                            <el-radio label="left">靠左</el-radio>
                            <el-radio label="center">居中</el-radio>
                            <el-radio label="right">靠右</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>

            </el-collapse-item>
        </el-collapse>
    </el-form-item>
</template>

<script>
import VueElementForm, { fieldProps, vueUtils, formUtils, schemaValidate } from '@lljj/vue-json-schema-form';
import { importComputedFn, importMethodsFn, makeImageItem } from '../utils';

export default {
    components: {
        VueElementForm
    },
    props: {
        ...fieldProps
    },
    data() {
        return {
            activeName: "unfold",
        };
    },
    computed: {
        imgSchema() {
            return makeImageItem({title: "", isBackground: true});
        },
        background: {
            get() {
                return {
                    backgroundColor : this.get("backgroundColor"),
                    backgroundImage : this.get("backgroundImage"),
                    backgroundPosition : this.get("backgroundPosition"),
                    backgroundAttachment : this.get("backgroundAttachment"),
                    backgroundRepeat : this.get("backgroundRepeat")
                };
            },
            set(value) {
                const {backgroundColor, backgroundImage, backgroundPosition, backgroundAttachment, backgroundRepeat} = value;
                this.set("backgroundColor", backgroundColor);
                this.set("backgroundImage", backgroundImage);
                this.set("backgroundPosition", backgroundPosition);
                this.set("backgroundAttachment", backgroundAttachment);
                this.set("backgroundRepeat", backgroundRepeat);
            }
        },
        borderRadius: {
            get() {
                return parseInt(this.get("borderRadius"));
            },
            set(value) {
                return this.set("borderRadius", value + "px");
            }
        },
        ...importComputedFn(['borderWidth', 'borderColor', 'margin', 'padding', 'textAlign']),
    },
    methods: {
        ...importMethodsFn(),
    }
};
</script>

<style module>
.row {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    :global {
        .el-input-group__prepend {
            padding: 0;
            border: 0;
        }
        .el-input-group__append {
            padding: 0;
            border: 0;
        }
        .el-input-number__decrease, .el-input-number__increase {
            margin: 0;
            height: 14px !important;
            line-height: 16px !important;
        }
        .el-input-number {
            width: 100px;
            line-height: 30px !important;
        }
        .el-input__inner {
            padding: 0 3px;
            text-align: center;
        }
        .el-radio-group {
        }
    }
}

.label {
    margin-top: 2px;
    padding-left: 8px;
    border-left: solid 5px #EEE;
}
.field {
    min-height: 35px;
    margin-top: 2px;
    display: flex;
    align-items: center;
}

</style>
