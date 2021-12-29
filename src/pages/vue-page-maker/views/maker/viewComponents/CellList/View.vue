<template>
    <el-row :class="[$style.box]" type="flex">
        <el-col v-for="(item,index) in formData.list" :key="index" :span="formData.column"  :style="{padding:formData.gutter / 16 + 'em'}">
            <CellView :data="item"></CellView>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
};
</script>

<style module>
.box {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50px;
    clear: both;
    overflow: hidden;
}
</style>
