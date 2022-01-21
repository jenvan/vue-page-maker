<template>
    <CellView :data="formData.cell">
        <div slot="extra" :class="$style.bg" :style="{backgroundColor: formData.bgcolor}"></div>
    </CellView>
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
.bg {
    position: absolute;
    z-index: -1;
    left: -50%;
    width: 200%;
    height: 100%;
    background: transparent;
    display: block;
}
</style>
