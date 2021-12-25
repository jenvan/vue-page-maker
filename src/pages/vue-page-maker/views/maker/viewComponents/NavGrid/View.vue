<template>
    <div :class="[$style.box]">
        <div v-for="(item,index) in formData.list" :key="index" :style="{width: width}">
            <div :style="{padding: formData.gutter + 'px'}">
                <ImageView :data="item.image"></ImageView>
            </div>
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
            let width = this.formData.width || 6;
            return width + "em";
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
