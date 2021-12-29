<template>
    <div :class="{[$style.box] : true, animate : animate.length > 0}" :style="style">
        <TextView :data="formData.title" :animate="animate"></TextView>
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
            if (!this.formData.animate || !this.formData.animate.animateName || this.formData.animate.animateName == "") return "";
            return Object.values(this.formData.animate).reduce((arr, v) => {
                v.length > 0 && arr.push(v);
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
