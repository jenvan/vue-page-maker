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
            <el-dropdown split-button @click="handleClick" @command="handleCommand">
                新建页面
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="list">页面列表</el-dropdown-item>
                    <el-dropdown-item command="media">素材库管理</el-dropdown-item>
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
    name: 'EditorHeader',
    methods: {
        handleClick() {
            
        },
        handleCommand(cmd) {
            console.log(cmd)
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
