<template>
    <el-image :src="image" :style="style" :class="className" :fit="fit" :lazy="lazy" scroll-container="#page" @click="handleClick" @load="handleLoad">
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
            return !this.animate ? "" : Object.keys(this.animate).reduce((arr, key) => {
                arr.push(this.animate[key]);
                return arr;
            }, ["animate__animated"]).join(" ");
        },
        className() {
            return this.$style.image + " " + (this.hasLink ? this.$style.link : "") + " " + (this.loaded ? this.animateClass : "");
        },
        hasLink() {
            return this.data.link && this.data.link.length > 0;
        },
    },
    methods: {
        handleLoad() {
            this.loaded = true;
        },
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
.image {
    width: 100%;
    height: 100%;
    min-height: 10px;
    img {
        width: 100%;
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
