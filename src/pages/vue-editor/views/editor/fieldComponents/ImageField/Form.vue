<template>
    <el-form-item
        :label="getProp('title')"
        :prop="curNodePath"
        :rules="[{validator}]"
        :required="schema.required.length > 0"
    >
        <el-row :class="$style.row">
            <el-col :span="6">
                <div :class="$style.image" @click="selectImg" title="设置背景图片">
                    <el-image :src="src" fit="contain">
                        <i slot="error" class="el-icon-picture-outline"></i>
                    </el-image>
                </div>
            </el-col>
            <el-col :span="18">
                <el-input v-model="src" :clearable="true" :placeholder="getProp('placeholder', 'image')" title="设置背景图片"></el-input>
                <el-input v-if="isImage" v-model="link" :placeholder="getProp('placeholder', 'link')" ></el-input>
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

export default {
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
            const imgs = [
                'https://m.360buyimg.com/babel/jfs/t1/136164/18/4633/216335/5f1176b9E0d2e6f59/e41c72e01932fd73.jpg.webp',
                'https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg',
                'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg',
                'https://aecpm.alicdn.com/simba/img/TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg',
                'https://img.alicdn.com/tfs/TB1FrlZPAzoK1RjSZFlXXai4VXa-1000-320.jpg',
                'https://img.alicdn.com/tfs/TB1n5sCMYvpK1RjSZPiXXbmwXXa-900-320.jpg',
                'https://img.alicdn.com/tps/i4/TB1ecCsOCzqK1RjSZPxSuw4tVXa.jpg',
                'https://img.alicdn.com/tps/i4/TB1tVhuNhnaK1RjSZFBSuwW7VXa.jpg',
                'https://img.alicdn.com/tfs/TB1IyonQVXXXXXCXXXXXXXXXXXX-750-200.jpg',
                'https://gw.alicdn.com/tfs/TB1hJ2KX6ihSKJjy0FlXXadEXXa-254-318.png',
                'https://gw.alicdn.com/tfs/TB1UE5RaCWD3KVjSZSgXXcCxVXa-720-400.jpg',
                'https://gw.alicdn.com/tfs/TB11iC2uAzoK1RjSZFlXXai4VXa-254-318.jpg',
                'https://gw.alicdn.com/tfs/TB1xo26qeH2gK0jSZFEXXcqMpXa-330-316.jpg',
                'https://img.alicdn.com/bao/uploaded/i3/2781891994/O1CN01usHqqQ1QbILCMqrJm_!!2781891994.jpg',
                'https://img.alicdn.com/bao/uploaded/i1/TB1M31ANFXXXXaOXpXXwu0bFXXX.png',
                'https://img.alicdn.com/imgextra/i2/143584903/O1CN01qdnUD81m5cPPJlXog_!!143584903.jpg',
                'https://img.alicdn.com/tps/i4/TB1Q2Mnd2zO3e4jSZFxwu1P_FXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1t2dzOvb2gK0jSZK9wu1EgFXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1ZJtFOAL0gK0jSZFAwu3A9pXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1fbhiawoQMeJjy0FnSuv8gFXa.jpg_490x490q100.jpg_.webp',
                'https://gw.alicdn.com/tfs/TB1UzOqoWL7gK0jSZFBXXXZZpXa-468-602.jpg',
                'https://img.alicdn.com/tfs/TB1XjMYnfb2gK0jSZK9XXaEgFXa-468-1236.jpg',
                'https://img.alicdn.com/tps/i4/TB1MesKcWmWQ1JjSZPhwu0CJFXa.png',
                'https://gw.alicdn.com/tfs/TB1xVR9oFP7gK0jSZFjXXc5aXXa-468-602.jpg',
                'https://img.alicdn.com/tps/i4/TB1R8tlXxvbeK8jSZPfSuuriXXa.jpg_490x490q100.jpg_.webp'
            ];
            this.src = imgs[Math.floor(Math.random() * imgs.length)];
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
