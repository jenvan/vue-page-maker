<template>
    <div :class="[$style.box, animate]" :style="style">
        <TextView :data="formData.title"></TextView>
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
            const {title, animate, style, ...obj} = this.formData;
            return {...style};
        },
        animate() {
            const {animate} = this.formData;
            return Object.keys(animate).reduce((arr, key) => {
                arr.push(animate[key]);
                return arr;
            }, ["animate__animated"]).join(" ");
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
