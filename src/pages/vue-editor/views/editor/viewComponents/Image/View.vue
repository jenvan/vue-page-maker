<template>
    <div :class="$style.box" :style="style">
        <ImageView :data="formData.image" :animate="formData.animate"></ImageView>
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
            const {image, animate, style, ...obj} = this.formData;
            return {...style};
        },
    }
};
</script>

<style module>
.box {
    width: 100%;
    clear: both;
    overflow: hidden;
}
</style>
