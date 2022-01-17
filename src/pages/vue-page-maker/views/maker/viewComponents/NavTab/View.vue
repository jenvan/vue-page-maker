<template>
    <div id="nav-tab-wrap" :class="$style.box">
        <div id="nav-tab" :class="$style.nav" :style="{height: formData.height / 16 + 'em'}">
            <div v-for="(item,index) in formData.list" :key="index" :style="{width: width}">
                <ImageView :data="item.image" :lazy="false" :style="{paddingBottom: formData.gutter + 'px'}"></ImageView>
                <TextView :data="item.text"></TextView>
            </div>
        </div>
    </div>
</template>

<script>
import {debounce, throttle} from '../../common/utils/noRepeat';
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
        setTimeout(this.handleScroll, 300);
        document.querySelector("#device").addEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            let obj = document.getElementById("nav-tab");
            let device = document.getElementById("device");

            obj.style.width = device.clientWidth + "px";

            if (device.scrollTop + device.clientHeight < device.scrollHeight - obj.clientHeight){
                obj.parentElement.id != "page" && document.getElementById("page").appendChild(obj);
                obj.style.left = device.getBoundingClientRect().left + "px";
                obj.style.top = (device.getBoundingClientRect().top + device.clientHeight - obj.clientHeight) + "px";
            }
            else {
                document.getElementById("nav-tab-wrap").appendChild(obj);
                obj.style.left = 0;
                obj.style.top = (device.scrollHeight - obj.clientHeight) + "px";
            }
        }
    }
};
</script>

<style module>
.box {
    position: static;
    z-index: 9;
    width: 100%;
    min-height: 40px;
    margin-top: 20px;
    display: block;
}
.nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 8;
    width: 100%;
    background: #FFF;
    border-top: solid 1px #EEE;
    text-align: center;
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
