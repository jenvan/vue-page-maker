<template>
    <el-image :src="image" :class="className" :animate="animateClass" :fit="fit" :lazy="lazy" scroll-container="#device" @click="handleClick">
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
        return {};
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
            return typeof this.data.link == "string" && /\S+/.test(this.data.link);
        },
    },
    methods: {
        handleClick() {
            if (this.hasLink) 
                return this.$redirect(this.data.link);

            if (this.$router.currentRoute.params["action"] && this.$router.currentRoute.params["action"] != "")
                return;
            
            this.$alert('<img src=' + this.image+ ' style="max-width:80vw;max-height:80vh;">', '', {
                dangerouslyUseHTMLString: true,
                showConfirmButton: false,
                closeOnClickModal: true,
                center: true,
                customClass: "popup_image",
            });            
        },
    }
};
</script>

<style>
.popup_image {
    width: auto !important;
}
</style>
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
