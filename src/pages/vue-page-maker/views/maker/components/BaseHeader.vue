<template>
    <div :class="$style.box">
        <div :class="$style.header">
            <h1>
                <a
                    :class="$style.menuLink"
                    href="https://github.com/jenvan/vue-page-maker"
                >
                    Vue Page Maker
                </a>
            </h1>
            <el-button type="danger" v-if="!logined" @click="handleCommand('Auth')" plain>扫码登录</el-button>
            <el-dropdown split-button v-else @click="handleCommand('New')" @command="handleCommand">
                新建页面
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="Page">我的页面</el-dropdown-item>
                    <el-dropdown-item command="Media">我的素材</el-dropdown-item>
                    <el-dropdown-item command="Auth">退出 / 重新登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
        <div :class="[$style.btns, 'floatInMobile']">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseHeader',
    computed: {
        logined() {
            return localStorage.getItem("profile") != null;
        }
    },
    methods: {
        handleCommand(cmd) {
            this.$emit("onMenu" + cmd);
        }
    },
};
</script>

<style module>
    @import "../css/variable.css";
    .box {
        position: relative;
        padding: 0 15px;
        width: 100vw;
        height: var(--site-top-height);
        background: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 8px 1px rgba(0,0,0,.3);
        z-index: 3;
    }
    .header {
        min-width: 350px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            margin: 0;
            min-width: 200px;
            font-size: 26px;
            text-shadow: 0 0 40px #409EFF;
            /* text-transform: uppercase; */
            z-index: 10;
        }
        .logo {
            display: block;
            height: 30px;
        }
    }
    .btns {
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>
