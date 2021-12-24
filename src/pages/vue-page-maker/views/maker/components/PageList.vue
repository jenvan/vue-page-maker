<template>
  <el-table
    :data="list"
    :default-sort = "{prop: 'ts', order: 'descending'}"
    stripe
    max-height="500"
    style="width: 100%">
    <el-table-column
      fixed
      sortable
      prop="dt"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      sortable
      prop="ts"
      label="修改日期"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click="$emit('onForward', 'view', scope.row.id)"
          type="text"
          size="small">
          预览
        </el-button>
        <el-button
          @click="$emit('onForward', 'edit', scope.row.id)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click="$emit('onRemove', scope.row.id)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    name: 'PageList',
    props: {
        list: {
            type: [Object, Array],
            default: () => ({})
        }
    },
};
</script>
