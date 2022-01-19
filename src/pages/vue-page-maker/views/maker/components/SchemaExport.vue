<template>
    <div style="text-align: right;" @click="copy">
        <div style="padding: 0 5px 5px 0;">* 点击下方代码区域将页面配置信息复制到剪贴板 *</div>
        <JsonPrettyPrint :json-string="code"></JsonPrettyPrint>
    </div>
</template>

<script>
import JsonPrettyPrint from './JsonPerttyPrint.vue';

export default {
    name: 'SchemaExport',
    components: {
        JsonPrettyPrint
    },
    props: {
        code: {
            type: [Object, Array],
            default: () => ({})
        }
    },
    methods: {
        copy() {
            const pre = this.$el.querySelectorAll('pre')[0];
            pre.setAttribute('contenteditable', 'true');
            pre.focus();
            document.execCommand('selectAll', false, null);
            document.execCommand('copy');
            pre.removeAttribute('contenteditable');
            setTimeout(() => {
                this.$message.success('已复制到剪贴板');
            }, 300);
        }
    }
};
</script>
