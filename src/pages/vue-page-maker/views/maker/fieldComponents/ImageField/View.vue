<template>
    <el-image :src="image" :class="className" :animate="animateClass" :fit="fit" :lazy="lazy" scroll-container="#page" @click="handleClick">
        <i slot="error" class="el-icon-picture-outline"></i>
    </el-image>
</template>

<script>
export default {
    name: 'ImageView',
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        animate: {
            type: Object,
            default: () => ({})
        },
        fit: {
            type: String,
            default: "contain"
        },
        lazy: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {loaded: false};
    },
    computed: {
        image() {
            const {image, ...style} = this.data;
            return image;
        },
        style() {
            const {image, ...style} = this.data;
            return style;
        },
        animateClass() {
            return !this.animate || !this.animate.animateName || this.animate.animateName == "" ? "" : Object.values(this.animate).reduce((arr, v) => {
                v.length > 0 && arr.push(v);
                return arr;
            }, ["animate__animated"]).join(" ");
        },
        className() {
            return this.$style.image + " " + (this.hasLink ? this.$style.link : "") + (this.animateClass.length > 0 ? "animate" : "");
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
    }
};
</script>

<style module>
.image {
    max-width: 100%;
    min-height: 10px;
    height: 100%;
    img {
        max-width: 100%;
        max-height: 100%;
    }
    i {
        color: #EEE;
        font-size: 64px;
    }
}
.link {
    cursor: pointer;
}
</style>
