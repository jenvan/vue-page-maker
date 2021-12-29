<template>
    <div :class="[$style.box]">
        <div v-for="(item,index) in formData.list" :key="index" :style="{width: width}">
            <ImageView :data="item.image" :style="{padding: formData.gutter * 0.1 + 'em'}"></ImageView>
            <TextView :data="item.text"></TextView>
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
        width() {
            let width = this.formData.width || 100;
            return width / 16 + "em";
        }
    }
};
</script>

<style module>
.box {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 5px 0;
    min-height: 50px;
    clear: both;
    overflow: hidden;
}
</style>
