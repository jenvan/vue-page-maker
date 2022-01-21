<template>
    <div :class="$style.box">
        <el-carousel :class="[$style.carousel, formData.isCard ? $style.card : '']" :height="formData.height / 16 + 'em'" :type="formData.isCard ? 'card' : ''" :interval="5000" indicator-position="outside" trigger="click" @change="change">
            <el-carousel-item v-for="(item,index) in formData.list" :key="index" :class="$style.item" :label="getLabel(item.label)">
                <div v-show="showText && !formData.isCard" :class="{[$style.summary]: true}">
                    <div class="title">{{item.label}}</div>
                    <TextView :data="text"></TextView>
                </div>
                <ImageView :class="$style.image" :data="item.image" :fit="formData.isCard ? 'contain' : 'fill'" :lazy="false"></ImageView>
            </el-carousel-item>
        </el-carousel>
        <TextView v-show="showText && formData.isCard" :class="[$style.text]" :data="text"></TextView>
        <div :class="$style.bg" :style="{backgroundColor: formData.bgcolor}"></div>
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
        getLabel(v) {
            return this.formData.isCard ? (v || '标题未填写') : " ";
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
    margin-bottom: 10px;
}
.carousel {
    width: 100%;
    text-align: center;
    clear: both;
    overflow: hidden;
    &.card {
        display: flex;
        flex-flow: column-reverse nowrap;
        .image {
            box-shadow: 0 0 8px #999;
        }
        :global {
            .el-carousel__indicators {
                position: relative;
                top: 0;
                margin: 10px 0;
            }
            .el-carousel__button {
                min-width: 80px;
                padding: 10px;
                box-shadow: 0 0 8px #999;
                background: #FFF;
                border-radius: 5px;
                color: #000;
                font-size: 1em;
            }
        }
    }
}
.item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.summary {
    position: static;
    min-width: 40%;
    max-width: 60%;
    margin: 0 auto;
    padding: 2em;
    background: transparent;
    overflow: auto;
    :global .title {
        margin-bottom: 0.5em;
        color: #FFF;
        text-shadow: 0 2px 4px #000;
        font-size: 2em;
        font-weight: 800;
        text-align: left;
    }
}
.text {
    width: 100%;
    min-height: 10em;
    margin: 0 auto;
    padding: 1em;
    overflow: auto;
}
.bg {
    position: absolute;
    z-index: 0;
    left: -50%;
    top: 0;
    width: 200%;
    height: 100%;
    background: transparent;
    display: block;
}
</style>
