<template>
    <div :class="[$style.box]">
        <div :class="[$style.bg]" :style="{backgroundColor: formData.bgcolor}"></div>
        <TextView v-show="formData.title && formData.title.text.length > 0" :data="formData.title"></TextView>
        <div :class="[$style.list]">
            <CellView v-for="(item,index) in formData.list" :key="index" :style="style" :data="item"></CellView>
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
    computed: {
        style() {
            let column = this.formData.column || 2;
            let gutter = this.formData.gutter / 16 + 'em';
            return {width: 'calc( (100% - 2 * ' + column + '*' + gutter + ') / ' + column + ')', minWidth: this.formData.width / 16 + 'em', minHeight: this.formData.height / 16 + 'em', margin: gutter};
        }
    }
};
</script>

<style module>
.box {
    width: 100%;
    clear: both;
    overflow: hidden;
}
.bg {
    position: absolute;
    z-index: -1;
    left: -50%;
    top: 0;
    width: 200%;
    height: 100%;
    display: block;
}
.list {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    min-height: 50px;
    clear: both;
}
</style>
