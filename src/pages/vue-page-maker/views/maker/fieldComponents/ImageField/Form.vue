<template>
    <el-form-item
        :label="getProp('title')"
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0"
    >
        <el-row :class="$style.row">
            <el-col :span="6">
                <div :class="$style.image" @click="selectImg" title="点击选择图片">
                    <el-image :src="src" fit="contain">
                        <i slot="error" class="el-icon-upload"></i>
                    </el-image>
                </div>
            </el-col>
            <el-col :span="18">
                <el-input v-model="src" prefix-icon="el-icon-picture-outline" clearable :placeholder="getProp('placeholder', 'image')" title="设置背景图片"></el-input>
                <el-input v-if="isImage" v-model="link" prefix-icon="el-icon-link" clearable :placeholder="getProp('placeholder', 'link')" ></el-input>
                <div v-else :class="$style.background">
                    <el-input v-model="backgroundPosition" :class="$style.bgposition" :placeholder="getProp('placeholder', 'backgroundPosition')" title="设置背景位置"></el-input>
                    <el-select v-model="backgroundRepeat" title="设置背景重复">
                        <el-option v-for="item in bgRepeat" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="backgroundAttachment" title="设置背景滚动">
                        <el-option v-for="item in bgAttachment" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-color-picker v-model="backgroundColor" show-alpha :class="$style.color" size="small" title="设置背景颜色"></el-color-picker>
                </div>
            </el-col>
        </el-row>
    </el-form-item>
</template>

<script>
import { fieldProps, vueUtils, formUtils, schemaValidate } from '@lljj/vue-json-schema-form';
import { importComputedFn, importMethodsFn } from '../utils';
import MediaList from '../../components/MediaList.vue';
import componentWithDialog from '../../common/componentWithDialog';

export default {
    components: {
        MediaList
    },
    props: {
        ...fieldProps
    },
    data() {
        return {
            bgAttachment: [{
                label: '滚动',
                value: 'scroll'
            }, {
                label: '固定',
                value: 'fixed'
            }],

            bgRepeat: [{
                label: '平铺',
                value: 'repeat'
            }, {
                label: '不平铺',
                value: 'no-repeat '
            }, {
                label: '横向平铺',
                value: 'repeat-x'
            }, {
                label: '纵向平铺',
                value: 'repeat-y'
            }],
        };
    },
    computed: {
        isImage() {
            return this.getProp('hidden', 'backgroundColor');
        },
        src: {
            get() {
                if (this.isImage){
                    return this.get("image");
                }
                return this.get("backgroundImage").replace("url(", "").replace(")", "");
            },
            set(value) {
                if (this.isImage) {
                    this.set("image", value);
                }
                else {
                    this.set("backgroundImage", "url(" + value + ")");
                }
            }
        },
        ...importComputedFn(['link', 'backgroundColor', 'backgroundPosition', 'backgroundAttachment', 'backgroundRepeat']),
    },
    methods: {
        selectImg() {
            this.$http.post("get").then((data) => {
                const instance = componentWithDialog({
                    VueComponent: MediaList,
                    dialogProps: {
                        title: '素材选择',
                        width: '80vw',
                        top: '5vh',
                    },
                    componentProps: {
                        media: data.media
                    },
                    componentListeners: {
                        onChoose: (url) => {
                            instance.close();
                            this.src = url;
                        }
                    }
                });
            });
        },
        ...importMethodsFn(),
    }
};
</script>

<style module>
.row {
    width: 100%;
}
.image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    margin-right: 3px;
    border: solid 1px #CCC;
    border-radius: 5px;
    cursor: pointer;
    :global {
        .el-image {
            display: flex;
            justify-content: center;
            align-items: center;
            width:100%;
            height:100%;
        }
        i {
            color: #EEE;
            font-size: 48px;
        }
    }
}
.background {
    display: flex;
    justify-content: center;
    align-items: center;
    .bgposition {
        max-width: 70px;
    }
    :global {
        input {
            padding: 0 5px;
            font-size: 12px;
        }
        .el-input {
            margin-bottom: 0;
        }
        .el-select {
            width: 30%;
        }
    }
}
</style>
