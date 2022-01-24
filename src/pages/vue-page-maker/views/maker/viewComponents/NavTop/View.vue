<template>
    <div id="nav-top-wrap" :class="$style.box" :style="{height: formData.height / 16 + 'em'}">
        <div id="nav-top" :class="$style.nav" :style="{background: bgColor, color: fgColor, height: formData.height / 16 + 'em'}">
            <div :class="[$style.wrap, 'wrap']">

                <ImageView :class="$style.logo" :data="formData.logo" :lazy="false"></ImageView>

                <div :class="$style.bar">

                    <div :class="[$style.more , 'el-icon-menu']" :style="{display: moreDisplay}" @click="handleMore"></div>

                    <el-menu ref="nav" :class="{[$style.menu]: true, [$style.mobile]: inMobile}" :style="{display: menuDisplay}" :background-color="bgColor" :text-color="fgColor" :active-text-color="fgColor" @select="handleSelect" @open="handleOpen">
                        <span v-for="(item, index) in formData.list" :key="index">
                            <el-menu-item v-if="item.children.length == 0" :index="index.toString()">
                                {{item.self.text}}
                            </el-menu-item>
                            <el-submenu v-else :index="index.toString()">
                                <template slot="title">{{item.self.text}}</template>
                                <el-menu-item v-for="(v,k) in item.children" :key="k" :index="index + '-' + k">{{v.text}}</el-menu-item>
                            </el-submenu>
                        </span>
                    </el-menu>

                </div>

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
        },
        zoom: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            inMobile: false,
            bgColor: "transparent",
            fgColor: "#FFF",
            popupMenu: false,
            moreDisplay: "none",
            menuDisplay: "none",
        }
    },
    mounted() {
        setTimeout(this.handleScroll, 300);
        document.querySelector("#device").addEventListener("scroll", () => {
            if (document.getElementById("nav-top")){
                //document.getElementById("nav-top").style.opacity = 0;
                debounce(this.handleScroll, 500)();
            }
        });
        document.querySelector("#nav-top .el-submenu .el-submenu__title").addEventListener("mouseover", function() {
            this.nextElementSibling.style.display = "";
        });
        document.querySelector("#nav-top .el-submenu").addEventListener("mouseleave", function() {
            this.querySelector(".el-menu").style.display = "none";
        });
    },
    watch: {
        zoom () {
            this.handleScroll();
        }
    },
    methods: {
        handleMenu(value) {
            this.popupMenu = value;
            this.moreDisplay = this.inMobile ? "flex" : "none";
            this.menuDisplay = !this.inMobile || this.popupMenu ? "flex" : "none";
        },
        handleScroll() {
            if (!document.getElementById("nav-top")) return;

            let obj = document.getElementById("nav-top");
            let device = document.getElementById("device");
            let m = device.scrollTop || 0;

            if (m > obj.clientHeight){
                obj.parentElement.id != "page" && document.getElementById("page").appendChild(obj);
                obj.style.zoom = this.zoom;
                obj.style.top = device.getBoundingClientRect().top / this.zoom + "px";
                obj.style.left = device.getBoundingClientRect().left / this.zoom + "px";
                obj.style.left = "auto";
                obj.style.right = "auto";
            }
            else {
                document.getElementById("nav-top-wrap").appendChild(obj);
                obj.style.zoom = 1;
                obj.style.top = 0;
                obj.style.left = 0;
            }
            obj.style.width = device.clientWidth + "px";
            obj.querySelector(".wrap").style.width = device.querySelector(".content").clientWidth + "px";

            this.inMobile = device.clientWidth < 1024;

            if (this.formData.bgcolor) {
                this.bgColor = this.formData.bgcolor;
                this.fgColor = this.formData.fgcolor;
            }
            else {
                this.bgColor = m > 50 ? "#FFF" : "transparent";
                this.fgColor = m > 50 ? "#000" : this.formData.fgcolor;
            }

            this.handleMenu(!this.inMobile);

            //document.getElementById("nav-top").style.opacity = 1;
        },
        handleMore() {
            this.handleMenu(!this.popupMenu);
        },
        handleSelect(index) {
            this.handleMenu(false);
            let link = "";
            let arr = index.split("-");
            if (arr.length == 1) {
                link = this.formData.list[arr[0]].self.link;
            }
            if (arr.length == 2) {
                link = this.formData.list[arr[0]].children[arr[1]].link;
            }
            this.$redirect(link);
        },
        handleOpen(index) {
            this.index = index;
        },
        handleClose() {
            this.$refs.nav.close(this.index);
        },
    }
};
</script>

<style module>
.box {
    width: 100%;
    display: block;
}
.nav {
    position: fixed;
    z-index: 6;
    width: 100%;
    min-height: 30px;
    max-height: 200px;
    box-shadow: 0 2px 8px 0px #EEE;
    transition: opacity .5s ease;
    clear: both;
    .wrap {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        max-width: 100%;
        height: 100%;
        margin: 0 auto;
        background: transparent;
    }
}
.logo {
    position: relative;
    z-index: 0;
    float: left;
    max-height: 90%;
    :global {
        .el-image__inner {
            width: auto;
            height: 100%;
        }
    }
}
.bar {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: none;
    .mobile {
        width: 150px;
    }
}
.menu {
    display: none;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: flex-start;
    position: static;
    height: 40px;
    background: transparent !important;
    border: 0;
    :global {
        .el-menu-item, .el-submenu__title {
            height: 40px;
            line-height: 40px;
        }
        li {
            width: 150px;
            text-align: center;
            display: inline-block;
        }
        ul[role='menu'] li {
            min-width: auto;
            padding: 0 !important;
        }
        div, li, ul {
            font-size: 1em !important;
        }
        ul[role='menu'], ul[role='menu'] li {
            background: #FFF !important;
            color: #000 !important;
        }
        .el-submenu .el-menu-item {
            background: #F6F6F6 !important;
        }
    }
    &.mobile {
        :global span {
            background: #000 !important;
            color: #FFF !important;
        }
    }
}

.more {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    clear: both;
    min-width: 100%;
    height: 100%;
    font-size: 2.5em;
    cursor: pointer;
}
</style>
