<template>
    <div :class="$style.row" :style="{flexDirection: data.direction, ...style[1]}">
        <div :class="$style.item" :style="{padding: '1em', ...size[0]}">
            <ImageView v-if="hasImage" :data="data.image" :animate="data.animate"></ImageView>
        </div>
        <div v-if="hasText" :class="{[$style.item]: true, [$style.link]: hasLink}" :style="{padding: style[0], ...size[1]}" @click="handleClick">
            <TextView :data="data.text1"></TextView>
            <TextView :data="data.text2"></TextView>
            <TextView :data="data.text3"></TextView>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CellView',
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
    },
    computed: {
        size() {
            let s = this.data.size / 16 || 0;
            if (!this.data.direction || /column/.test(this.data.direction))
                return [{width: "100%", height: s + "em"}, {width: "100%"}];
            return [{width: s + "em", maxWidth: "40%"}, {width: "calc(100% - " + s + "em)", minWidth: "60%"}];
        },
        style() {
            let {padding, ...other} = this.data.style;
            return [padding, other];
        },
        hasImage() {
            return this.data.image && this.data.image.image && this.data.image.image.length > 0;
        },
        hasText() {
            let t1 = this.data.text1 && this.data.text1.text && this.data.text1.text.length > 0;
            let t2 = this.data.text2 && this.data.text2.text && this.data.text2.text.length > 0;
            let t3 = this.data.text3 && this.data.text3.text && this.data.text3.text.length > 0;
            return t1 || t2 || t3;
        },
        hasLink() {
            return this.data.link && this.data.link.length > 0;
        },
    },
    methods: {
        handleClick() {
            if (!this.hasLink) return;
            this.$redirect(this.data.link);
        },
    },
};
</script>

<style module>
.row {
    min-height: 30px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin: 5px 0;
}
.item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    overflow: hidden;
    :global span {
        margin: 0 5px;
    }
}
.link {
    cursor: pointer;
}
</style>
