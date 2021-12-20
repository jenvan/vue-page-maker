<template>
    <div style="text-align: right;">
        <JsonPrettyPrint :json-string="code"></JsonPrettyPrint>
        <div style="margin-top: 20px;">
            <el-button
                type="primary"
                @click="copy"
            >
                复制代码
            </el-button>
        </div>
    </div>
</template>

<script>
import JsonPrettyPrint from 'demo-common/components/JsonPerttyPrint.vue';

export default {
    name: 'ExportSchema',
    components: {
        JsonPrettyPrint
    },
    props: {
        code: {
            type: [Object, Array],
            default: () => ({})
        }
    },
    data() {
        return {
            copied: false
        };
    },
    methods: {
        copy() {
            if (this.copied) {
                return;
            }
            const pre = this.$el.querySelectorAll('pre')[0];
            pre.setAttribute('contenteditable', 'true');
            pre.focus();
            document.execCommand('selectAll', false, null);
            this.copied = document.execCommand('copy');
            pre.removeAttribute('contenteditable');
            setTimeout(() => {
                this.copied = false;
                this.$message.success('复制成功');
            }, 300);
        }
    }
};
</script>
