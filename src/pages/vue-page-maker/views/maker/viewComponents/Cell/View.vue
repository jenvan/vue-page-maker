<template>
    <div :class="$style.box">
        <div :class="$style.bg" :style="{backgroundColor: formData.bgcolor}"></div>
        <TextView :data="formData.title"></TextView>
        <CellView :data="formData.cell"></CellView>
    </div>
</template>

<script>
export default {
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style module>
.box {
    width: 100%;
    margin: 5px 0;
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
    background: transparent;
    display: block;
}
</style>
