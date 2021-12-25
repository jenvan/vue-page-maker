<template>
    <div :class="$style.box">
        <div id="nav-tab" :class="$style.nav">
            <div v-for="(item,index) in formData.list" :key="index" :style="{width: width, padding: formData.gutter + 'px'}">
                <ImageView :data="item.image"></ImageView>
                <TextView :data="item.text"></TextView>
            </div>
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
            let column = this.formData.list.length || 4;
            return (100 / column) + "%";
        }
    },
    mounted() {
        setInterval(this.handleScroll, 300);
        document.querySelector("#device").addEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            let obj = document.getElementById("nav-tab");
            let obj1 = document.getElementById("device");
            let obj2 = document.getElementById("page");
            let m = obj1.clientHeight + obj1.scrollTop || document.documentElement.clientHeight;
            obj.style.top = (m - obj.clientHeight) + "px";
            obj.style.left = (obj1.clientWidth - obj2.clientWidth) / -2 + "px";
            obj.style.width = obj1.clientWidth + "px";
        }
    }
};
</script>

<style module>
.box {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    display: block;
}
.nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 7;
    background: #FFF;
    border-top: solid 1px #EEE;
    box-shadow: 0 -2px 8px 0px #EEE;
    clear: both;
    overflow: hidden;
    :global {
        i {
            font-size: 3em;
        }
        img {
            width: 3em !important;
            height: 3em !important;
        }
    }
}
</style>
