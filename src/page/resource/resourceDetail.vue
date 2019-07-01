<template>
  <div name='resourceDetail'>
    <head-top></head-top>
    <section class="title"><i class="el-icon-arrow-left" @click="back"></i>{{templateName}}</section>
    <section class="templateContent">
      <div class="templateItem" v-for="(item, index) in templatePages" :key="item.id">
        <div class="img"  @click="openImg(index)">
          <img crossOrigin="anonymous" v-lazy='`${$CJIMGURL + item.url + $OSSIMGADJUSTMINI}`' alt="">
        </div>
        <p><span v-show="item.serialNumber">第{{item.serialNumber}}页</span></p>
      </div>
    </section>
    <el-dialog :title="'预览' + (current - 0 + 1) + '/' + total" v-model="dialogFormVisible" size="full" custom-class="dialog">
      <div class="dialog-wrapper" :style="{width: templateWidth + 'px'}">
        <el-carousel v-if="dialogFormVisible" :initial-index="defaultIndex" :autoplay="false" trigger="click" :height="templateHeight + 'px'" @change="change">
          <el-carousel-item v-for="item in templatePages" :key="item.id">
            <div class="templateBody">
              <div class="question"
                   v-for="(child, childIndex) in item.questionSigns"
                   :key="childIndex"
                   :style="{top: child.topPoint / imgScale + 'px', left: child.leftPoint / imgScale + 'px', height: child.height / imgScale + 'px', width: child.width / imgScale + 'px'}"></div>
              <img class="selectImg" :src='`${$CJIMGURL + item.url + $OSSIMGADJUST}`' alt="">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
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
        defaultIndex: -1,
        current: 1,
        total: 0
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
            this.total = this.templatePages.length;
          } else {
            this.$message.error(data.message);
          }
        });
      }
    },
    computed: {
      templateHeight () {
        return this.$store.getters.templateHeight;
      },
      templateWidth () {
        return this.$store.getters.templateWidth;
      },
      imgScale () {
        return this.$store.getters.imgScale;
      }
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      openImg (index) {
        this.dialogFormVisible = true;
        this.current = index;
        this.defaultIndex = index;
      },
      change (val) {
        this.current = val;
      }
    }
  };
</script>
<style lang="less">
  [name = 'resourceDetail'] {
    .el-dialog__body{
      padding: 0!important;
    }
  }
</style>
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
        margin:0 18px 20px 0;
        flex: 190px 0 0;
        height: 274px;
        display: flex;
        flex-direction: column;
        border: 1px solid #E3EBF1;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        .img{
          height: 224px;
          width: 100%;
          img{
            .wh(100%, 100%);
          }
        }
        p{
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          color: #333333;
        }
      }
    }
    .dialog-wrapper{
      margin: 0 auto;
      .templateBody{
        .wh(100%, 100%);
        .question{
          position: absolute;
          border: 1px solid #1690FF;
        }
        .selectImg{
          .wh(100%, 100%);
        }
      }
    }
  }
</style>
