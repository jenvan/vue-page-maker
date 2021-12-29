<template>
    <div :class="$style.box" :style="{...formData.style}">
        <GoodsView :data="formData.item" :vertical="vertical" :width="width"></GoodsView>
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
        vertical() {
            return typeof this.formData["vertical"] == "boolean" ? this.formData["vertical"] : true;
        },
        width() {
            return typeof this.formData["width"] == "number" ? this.formData["width"] / 16 : 0;
        },
    }
};
</script>

<style module>
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 10em;
    margin: 0.5em 0;
    clear: both;
    overflow: hidden;
}
</style>