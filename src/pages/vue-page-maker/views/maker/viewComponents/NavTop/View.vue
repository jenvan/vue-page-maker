<template>
    <div :class="$style.box" :style="{height: formData.height + 'em'}">
        <div id="nav-top" :class="$style.nav" :style="{background: formData.bgcolor, color: formData.fgcolor, height: formData.height + 'em'}">
            <div :class="$style.logo">
                <ImageView :data="formData.logo" :lazy="false"></ImageView>
            </div>
            <div :class="$style.bar">

                <div :class="[$style.more , 'el-icon-menu']" :style="{display: moreDisplay}" @click="handleMore"></div>

                <el-menu ref="nav" :class="[$style.menu]" :style="{display: menuDisplay}" :default-active="active" :background-color="formData.bgcolor" :text-color="formData.fgcolor" :active-text-color="formData.fgcolor" @select="handleSelect" @open="handleOpen">
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
            moreDisplay: "none",
            menuDisplay: "none",
            index: "0",
        }
    },
    computed: {
    },
    mounted() {
        setInterval(this.handleScroll, 200);
        document.querySelector("#device").addEventListener("scroll", this.handleScroll);
        //document.addEventListener("click", this.handleClose);
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

            let inMobile = obj1.clientWidth < 1024;
            this.moreDisplay = inMobile ? "flex" : "none";
            if (this.moreDisplay == "none")
                this.menuDisplay = inMobile ? "none" : "flex";
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
    min-height: 40px;
    max-height: 200px;
    padding: 0 1em;
    box-shadow: 0 2px 8px 0px #EEE;
    clear: both;
}
.logo {
    float: left;
    height: 80%;
}
.bar {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
    width: 60%;
    max-width: 600px;
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
        ul[role='menu'] {
            background: #FFF !important;
        }
        ul[role='menu'] li {
            min-width: auto;
            padding: 0 !important;
        }
        div, li, ul {
            font-size: 1em !important;
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
