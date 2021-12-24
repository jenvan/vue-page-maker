<template>
    <CellView :data="formData.cell"></CellView>
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
