<template>
    <div :class="$style.box">
        <el-carousel :class="[$style.carousel, formData.isCard ? $style.card : '']" :height="formData.height + 'em'" :type="formData.isCard ? 'card' : ''" :interval="5000" indicator-position="outside" trigger="click" @change="change">
            <el-carousel-item v-for="(item,index) in formData.list" :key="index" :label="getLabel(item.label)">
                <ImageView :data="item.image" :lazy="false" fit="fill"></ImageView>
            </el-carousel-item>
        </el-carousel>
        <div :class="[$style.text, formData.isCard ? $style.card : '']" v-show="showText">
            <TextView :data="text"></TextView>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            text: {},
        };
    },
    computed: {
        showText() {
            return this.text && this.text.text && this.text.text.length > 0;
        },
    },
    methods: {
        getLabel(label) {
            return this.formData.isCard ? (label || '标题未填写') : '';
        },
        change(index) {
            this.text = this.formData.list[index].text;
        }
    }
};
</script>

<style module>
.box {
    width: 100%;
    background: transparent;
}
.carousel {
    width: 100%;
    text-align: center;
    clear: both;
    overflow: hidden;
    &.card {
        display: flex;
        flex-flow: column-reverse nowrap;
        :global {
            .el-carousel__indicators {
                position: relative;
                top: 0;
                margin: 10px 0;
            }
            .el-carousel__button {
                min-width: 80px;
                height: 30px;
                background: #666;
                border-radius: 5px;
                color: #FFF;
            }
        }
    }
}
.text {
    position: absolute;
    z-index: 99;
    bottom: 25px;
    width: 100%;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #FFF;
    font-size: 12px;
    text-align: left;
    &.card {
        position: static;
        max-width: 800px;
        min-height: 100px;
        margin: 0 auto;
        padding: 10px;
        background: transparent;
        color: #000;
        font-size: 14px;
        line-height: 180%;
        text-align: center;
        overflow: auto;
    }
}
</style>
