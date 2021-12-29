<template>
    <div :class="{[$style.text]: true, [$style.link]: hasLink}" :style="style" @click="handleClick" v-html="text"></div>
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
            const {text} = this.data;
            let html = text && text.length > 0 ? text : "";
            html = html.replace(/&/g, "&amp;");
            html = html.replace(/\</g, "&lt;");
            html = html.replace(/\>/g, "&gt;");
            html = html.replace(/\"/g, "&quot;");
            html = html.replace(/\'/g, "&apos;");
            html = html.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;&nbsp;");
            return html;
        },
        style() {
            const {text, link, ...style} = this.data;
            return style;
        },
        hasLink() {
            return typeof this.data.link == "string" && this.data.link.length > 0;
        },
    },
    methods: {
        handleClick() {
            if (!this.hasLink) return;
            this.$redirect(this.data.link);
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