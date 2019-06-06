<template>
  <div name='resourceDetail'>
    <head-top></head-top>
    <section class="title"><i class="el-icon-arrow-left" @click="back"></i>{{templateName}}</section>
    <section class="templateContent">
      <div class="templateItem" v-for="(item, index) in templatePages" :key="index">
        <img v-lazy="item.url" alt="" @click="openImg(item.url)">
        <div style="text-align: center;margin-top: 5px">第{{index + 1}}页</div>
      </div>
    </section>
    <el-dialog title="预览" v-model="dialogFormVisible" size="full" custom-class="dialog">
      <img class="selectImg" :src="selectUrl" alt="">
    </el-dialog>
  </div>
</template>

<script type='text/babel'>
  import {getTemplateDetail} from '@/api/template';
  export default {
    name: 'resourceDetail',
    data () {
      return {
        templateName: '',
        id: '',
        templatePages: [],
        dialogFormVisible: false,
        selectUrl: ''
      };
    },
    activated () {
      let query = this.$route.query;
      this.templateName = query.templateName;
      this.id = query.id;
    },
    watch: {
      id (val) {
        getTemplateDetail(val).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.templatePages = data.data.templatePages;
          }
        });
      }
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      openImg (url) {
        this.dialogFormVisible = true;
        this.selectUrl = url;
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'resourceDetail']{
    .title{
      font-size: 34px;
      padding: 20px 50px 0;
      i{
        margin-right: 20px;
      }
    }
    .templateContent{
      .fj(flex-start);
      flex-wrap: wrap;
      width: 100%;
      box-sizing: border-box;
      padding: 20px 50px;
      .templateItem{
        flex: 26% 0 0;
        margin:0 50px 68px 0;
        img{
          .wh(100%, 100%);
        }
      }
    }
    .selectImg{
      .wh(auto, 88vh);
      display: block;
      margin: 0 auto;
    }
  }
</style>
