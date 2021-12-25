<template>
    <span :class="{[$style.text]: true, [$style.link]: hasLink}" :style="style" @click="handleClick">{{text}}</span>
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
        hasLink() {
            return this.data.link && this.data.link.length > 0;
        },
    },
    methods: {
        handleClick() {
            if (!this.hasLink) return;
            if (this.data.link.substring(0, 4) == "http")
                return window.open(this.data.link, "_blank");
            return this.$router.push(this.data.link);
        },
    }
};
</script>

<style module>
.text {
    line-height: 200%;
}
.link {
    cursor: pointer;
}
</style>