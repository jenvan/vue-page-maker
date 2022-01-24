<template>
    <div :id="id" :class="{[$style.box] : true, animate : animate.length > 0}" :style="style">
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
    data() {
        return {
            id: "text_" + Math.random().toString(36).substr(3),
        }
    },
    mounted() {
        this.scroll();
        window.addEventListener("resize", this.scroll, true);
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
    },
    methods: {
        scroll() {
            setTimeout(() => {
                if (this.$router.currentRoute.query["tag"] && this.$router.currentRoute.query["tag"] == this.formData.tag) {
                    document.querySelector('#device').scrollTo(0, document.querySelector("#" + this.id).getBoundingClientRect().top - 50);
                }
            }, 300);
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
