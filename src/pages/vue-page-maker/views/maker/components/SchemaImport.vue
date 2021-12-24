<template>
    <div style="text-align: right;">
        <el-input
            v-model="code"
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="注意：若不了解导入数据格式，请不要修改数据。"
        >
        </el-input>
        <p style="margin-top: 20px;">
            <el-button
                type="primary"
                @click="$emit('onImport', code)"
            >
                导入
            </el-button>
        </p>
    </div>
</template>

<script>
export default {
    name: 'SchemaImport',
    data() {
        return {
            code: ''
        };
    }
};
</script>
