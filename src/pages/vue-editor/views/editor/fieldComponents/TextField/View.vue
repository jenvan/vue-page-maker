<template>
    <span :class="$style.text" :style="style">{{text}}</span>
</template>

<script>
export default {
    name: 'TextView',
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
    },
    computed: {
        text() {
            const {text, ...style} = this.data;
            return text;
        },
        style() {
            const {text, ...style} = this.data;
            return style;
        },
    }
};
</script>

<style module>
.text {
    line-height: 200%;
}
</style>