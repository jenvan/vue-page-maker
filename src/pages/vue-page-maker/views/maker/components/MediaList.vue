<template>
  <div :class="$style.box">

    <div :class="[$style.header, $style.toolbar]">
      <el-input placeholder="请填写网络图片地址" v-model="url" clearable></el-input>
      &nbsp;
      <el-button type="primary" plain @click="handleAdd">添加</el-button>
      &nbsp;
      <el-upload name="file" accept="image/png, image/jpeg, image/gif" :action="server.url" :data="server.data" :show-file-list="false" :on-change="handleUpload">  
        <el-button type="primary" :disabled="server.data == null" plain>上传本地图片</el-button>
      </el-upload>
    </div>

    <div :class="$style.list">
      <div :class="$style.tags" v-show="tag_name.length > 0">
        <el-tag v-for="tag in tag_name" type="info" size="small" :class="{tag: true, tag_active: tag_display.indexOf(tag) > -1}" :key="tag" @click="handleTag(tag)">{{tag}}</el-tag>
      </div>
      <div :class="{item: true, item_choose: media_selected.indexOf(item.id) > -1}" v-for="(item,index) in media_all" :key="index" @click="handleItem(item.id)">
        <el-image class="image" :src="item.url" fit="contain" lazy></el-image>
        <div class="title">{{item.id}}</div>
        <i class="el-icon-delete" v-show="media_selected.indexOf(item.id) > -1" @click.stop="handleRemove(item.id)"></i>
      </div>
    </div>

    <div :class="[$style.footer, $style.toolbar]">
      <el-button v-if="canChoose" type="primary" :disabled="media_selected.length == 0" @click="handleChoose">选好了</el-button>
      <div v-else>
        <el-select v-model="tag_choose" placeholder="为选中的图片选择标签" title="直接输入可以新建标签" filterable default-first-option allow-create clearable>
          <el-option v-for="(v,k) in tag_name" :key="k" :value="v"></el-option>
        </el-select>
        &nbsp;
        <el-button type="primary" :disabled="media_selected.length == 0" @click="handleModify">打标签</el-button>
      </div>
    </div>

  </div>
</template>

<style module>
@import '../css/variable.css';
.box {
  width: 100%;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  &.footer {
    flex-flow: row wrap;
    justify-content: flex-end;
  }
  :global .el-select input {
    width: 200px;
  }
}
.tags {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0 5px;
  padding-top: 5px;
  overflow: auto;
  :global {
    .tag {
      margin: 3px;
      cursor: pointer;
    }
    .tag_active {
      background-color: var(--color-primary);
      color: #FFF;
    }
  }
}
.list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: top;
  width: 100%;
  max-height: 65vh;
  margin-bottom: 10px;
  border:solid 1px #DDD;
  border-radius: 5px;
  overflow: auto;
  :global {
    .item {
      position: relative;
      margin: 8px;
      padding: 5px;
      border:solid 1px #F3F3F3;
      border-radius: 2px;
    }
    .item_choose {
      box-shadow: 0 0 8px 3px var(--color-primary) inset;
    }
    .image {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    .title {
      text-align: center;
    }
    .el-icon-delete {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255,255,0,0.5);
      color: #F00;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>

<script>
export default {
    name: 'MediaList',
    props: {
      media: {
        type: [Object, Array],
        default: () => ({})
      },
      mediaTag: {
        type: [Object, Array],
        default: () => ({})
      },
      headers: {
        type: Object,
        default: () => ({})
      },
      canChoose: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        url: "",
        media_all: {},
        media_selected: [],
        tag_all: {},
        tag_name: [],
        tag_display: [],
        tag_choose: [],
        server: {
          url: "",
          data: null
        },
      }
    },

    created() {
      this.media_all = {...this.media} || {};
      this.tag_all = {...this.mediaTag} || {};
      this.tag_name = Object.keys(this.tag_all);
      this.$http.get("/upauth").then((obj) => {
        let {url, ...data} = obj;
        this.server.url = url;
        this.server.data = data;
      });
    },

    methods: {
      handleAdd() {
        let obj = {name: "", url: this.url};
        this.$http.post('media', obj).then((data) => {
          obj["id"] = data.id;
          this.media_all[data.id] = obj;
          this.url = "";
        });
      },
      handleUpload(data) {
        if (data.status == "success") {
          this.url = "//img.fuchijihua.com" + data.response.url;
          this.handleAdd();
        }
      },
      handleTag(tag) {
          let index = this.tag_display.indexOf(tag);
          if (index > -1)
            this.tag_display.splice(index, 1);
          else
            this.tag_display.push(tag);
      },
      handleItem(id) {
        if (this.canChoose)
          this.media_selected = [id];
        else {
          let index = this.media_selected.indexOf(id);
          if (index > -1)
            this.media_selected.splice(index, 1);
          else
            this.media_selected.push(id);
        }
      },
      handleRemove(id) {
        let index = this.media_selected.indexOf(id);
        this.$http.get('media?id=' + id).then(() => {
          this.media_selected.splice(index, 1);
          delete this.media_all[id];
        });
      },
      handleChoose() {
        let id = this.media_selected.pop();
        this.$emit("onChoose", this.media_all[id]["url"]);
      },
      handleModify() {
        this.$message("暂不支持");
      }
    }
};
</script>
