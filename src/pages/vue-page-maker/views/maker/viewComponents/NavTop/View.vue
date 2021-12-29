<template>
    <div :class="$style.box" :style="{height: formData.height / 16 + 'em'}">
        <div id="nav-top" :class="$style.nav" :style="{background: bgColor, color: fgColor, height: formData.height / 16 + 'em'}">
            
            <ImageView :class="$style.logo" :data="formData.logo" :lazy="false"></ImageView>

            <div :class="$style.bar">

                <div :class="[$style.more , 'el-icon-menu']" :style="{display: moreDisplay}" @click="handleMore"></div>

                <el-menu ref="nav" :class="{[$style.menu]: true, [$style.popup]: popup}" :style="{display: menuDisplay}" :default-active="active" :background-color="bgColor" :text-color="fgColor" :active-text-color="fgColor" @select="handleSelect" @open="handleOpen">
                    <span v-for="(item, index) in formData.list" :key="index">
                        <el-menu-item v-if="item.children.length == 0" :index="index.toString()">
                            {{item.self.text}}
                        </el-menu-item>
                        <el-submenu v-else :index="index.toString()">
                            <template slot="title">{{item.self.text}}</template>
                            <el-menu-item v-for="(v,k) in item.children" :key="k" :index="index + '-' + k">-&nbsp;&nbsp;{{v.text}}&nbsp;&nbsp;-</el-menu-item>
                        </el-submenu>
                    </span>
                </el-menu>

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
    data() {
        return {
            active: "0",
            popup: false,
            moreDisplay: "none",
            menuDisplay: "none",
            bgColor: "transparent",
            fgColor: "#FFF",
        }
    },
    computed: {
    },
    mounted() {
        setTimeout(this.handleScroll, 300);
        document.querySelector("#device").addEventListener("scroll", () => {
            document.getElementById("nav-top").style.opacity = 0;
            debounce(this.handleScroll, 500)();
        });
        window.addEventListener("resize", () => {
            setTimeout(() => {
                if (this.moreDisplay == "flex")
                    this.menuDisplay = "none";
            }, 200);
        }, true);
    },
    methods: {
        handleScroll() {
            let obj = document.getElementById("nav-top");
            let obj1 = document.getElementById("device");
            let obj2 = document.getElementById("page");
            let m = obj1.scrollTop || 0;
            obj.style.top = m + "px";
            obj.style.left = (obj1.clientWidth - obj2.clientWidth) / -2 + "px";
            obj.style.width = obj1.clientWidth + "px";

            if (this.formData.bgcolor) {
                this.bgColor = this.formData.bgcolor;
                this.fgColor = this.formData.fgcolor;
            }
            else {
                this.bgColor = m > 50 ? "#FFF" : "transparent";
                this.fgColor = m > 50 ? "#000" : this.formData.fgcolor;
            }

            let inMobile = obj1.clientWidth < 1024;
            this.popup = inMobile ? true : false;
            this.moreDisplay = inMobile ? "flex" : "none";
            if (this.moreDisplay == "none"){
                this.menuDisplay = inMobile ? "none" : "flex";
            }

            document.getElementById("nav-top").style.opacity = 1;
        },
        handleMore() {
            this.menuDisplay = this.menuDisplay == "none" ? "flex" : "none";
        },
        handleSelect() {
            if (this.moreDisplay == "flex")
                this.menuDisplay = "none";
            console.log(arguments)
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
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 9; 
    width: 100%;
    min-height: 30px;
    max-height: 200px;
    padding: 0 1em;
    box-shadow: 0 2px 8px 0px #EEE;
    transition: opacity .5s ease;
    clear: both;
}
.logo {
    float: left;
    max-height: 80%;
}
.bar {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    width: 60%;
    max-width: 800px;
    height: 100%;
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
    }
}
.popup {
    :global {
        li[role='menuitem'] {
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
