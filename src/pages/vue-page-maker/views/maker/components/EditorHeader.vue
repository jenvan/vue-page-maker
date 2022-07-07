<template>
    <BaseHeader @onMenuAuth="$emit('onMenu', 'auth')" @onMenuNew="$emit('onMenu', 'new')" @onMenuPage="$emit('onMenu', 'page')" @onMenuMedia="$emit('onMenu', 'media')" @onMenuProfile="$emit('onMenu', 'profile')">
        <span class="hiddenInMobile">
            <el-switch
                v-model="device"
                active-text="电脑"
                active-value="pc"
                inactive-text="手机"
                inactive-value="mobile"
                style="margin-right:10px; width:120px;"
                @change="emitUpdateScale(device == 'mobile' ? 50 : 100)"
                >
            </el-switch>
            <el-button
                icon="el-icon-minus"
                :disabled="disabledMinus"
                circle
                @click="handleMinus"
            >
            </el-button>
            <el-button
                type="text"
                style="width:36px;text-align:center;"
                @click="emitUpdateScale(value == 100 ? 50 : 100)"
            >
                {{ value }}%
            </el-button>
            <el-button
                icon="el-icon-plus"
                :disabled="disabledPlus"
                circle
                @click="handlePlus"
            ></el-button>
            &nbsp;
        </span>
        <el-button @click="$emit('onImport')">导入</el-button>
        <el-button @click="$emit('onExport')">导出</el-button>
        <el-button
            type="primary"
            plain
            @click="handlePreview"
        >
            预览
        </el-button>
        <el-button
            type="primary"
            @click="$emit('onPublish')"
        >
            发布
        </el-button>
    </BaseHeader>
</template>

<script>
import BaseHeader from './BaseHeader.vue';

export default {
    name: 'EditorHeader',
    components: {
        BaseHeader
    },
    props: {
        isMobile: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Number,
            default: 60
        },
        minScale: {
            type: Number,
            default: 40
        },
        maxScale: {
            type: Number,
            default: 200
        },
        stepNum: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {

        };
    },
    computed: {
        device: {
            get() {
                return this.isMobile ? 'mobile' : 'pc';
            },
            set(value) {
                this.$emit('onUpdateDevice', value == 'mobile');
            }
        },
        disabledMinus() {
            return this.value <= this.minScale;
        },
        disabledPlus() {
            return this.value >= this.maxScale;
        },
    },
    methods: {
        handlePlus() {
            const curScale = this.value + this.stepNum;
            this.emitUpdateScale(curScale);
        },
        handleMinus() {
            const curScale = this.value - this.stepNum;
            this.emitUpdateScale(curScale);
        },
        emitUpdateScale(curScale) {
            this.$emit('input', curScale);
            this.$emit('onUpdateScale', curScale);
        },
        handlePreview() {
            let w = document.querySelector("#device").clientWidth;
            let h = document.querySelector("#device").clientHeight;
            console.log("窗口尺寸：" + w + "px * " + h + "px");
            this.$emit('onPreview');
        }
    }
};
</script>

<style module>

</style>
