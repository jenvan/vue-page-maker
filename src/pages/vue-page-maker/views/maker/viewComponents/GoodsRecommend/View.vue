<template>
    <div :class="$style.box">
        <div :class="{[$style.list]: true, [$style.row]: vertical}">
            <GoodsView v-for="(v, k) in formData.list" :key="k" :data="v" :vertical="vertical" :width="width" :class="$style.item"></GoodsView>
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
    width: 100%;
    min-height: 10em;
    margin: 0.5em 0;
    clear: both;
    overflow: hidden;
}
.list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    &.row {
        justify-content: space-around;
    }
}
.item {
    margin: 0.5em 0;
}
</style>