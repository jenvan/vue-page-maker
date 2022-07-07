<template>
  <el-table
    :data="list"
    :default-sort = "{prop: 'ts', order: 'descending'}"
    stripe
    max-height="500"
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="#"
      width="240">
    </el-table-column>
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
      width="180">
      <template slot-scope="scope">
        <el-button
          @click="$emit('onForward', 'view', scope.row.id)"
          type="text"
          size="small">
          查看
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
        <el-button
          @click="handleShare(scope.row.id)"
          type="text"
          size="small">
          共享
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

    data() {
      return {

      };
    },

    methods: {
      handleShare(aid) {
        this.$prompt('请填入用户编号', '共享页面 ' + aid, {
          confirmButtonText: '共享',
          cancelButtonText: '取消',
          inputPattern: /^\w{8,}$/,
          inputErrorMessage: '用户编号格式不正确'
        }).then(({value}) => {
          this.$http.post('share', {aid, uid: value});
        });
      },
    }
};
</script>
