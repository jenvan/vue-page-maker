<template>
    <el-row :class="[$style.box, animate]" :style="formData.style" type="flex">
        <el-col v-for="(item,index) in formData.list" :key="index" :span="getSpan(index)" :style="{padding:formData.gutter / 16 + 'em'}">
            <ImageView :data="item" :style="{width:'100%',height:'100%'}"></ImageView>
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
    computed: {
        animate() {
            const {animate} = this.formData;
            return !animate ? "" : Object.keys(animate).reduce((arr, key) => {
                arr.push(animate[key]);
                return arr;
            }, ["animate__animated"]).join(" ");
        },
    },
    methods: {
        getSpan(index) {
            const arr = this.formData.layout.split(",");
            return arr[index] ? parseInt(arr[index]) : 24;
        },
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
    min-height: 100px;
    margin: 5px 0;
    clear: both;
    overflow: hidden;
}
</style>
