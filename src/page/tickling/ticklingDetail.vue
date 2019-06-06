<template>
  <div name='ticklingDetail'>
    <head-top></head-top>
    <section class="title"><i class="el-icon-arrow-left" @click="back"></i>反馈信息详情</section>
    <el-form  class="tickling" :model="tickling" :label-position="'top'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="反馈用户" label-width="100px">
            <div>{{tickling.userName}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户类型" label-width="100px">
            <div>{{tickling.userType}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="反馈时间" label-width="100px">
            <div>{{tickling.feedbackTime}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 100%">
        <el-form-item label="反馈内容" label-width="100px">
          <div class="ticklingContent">
            {{tickling.content}}
          </div>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'ticklingDetail',
    data () {
      return {
        tickling: {}
      };
    },
    activated () {
      this.tickling = {...this.$route.query};
    },
    methods: {
      back () {
        this.$router.go(-1);
      }
    }
  };
</script>
<style scoped lang="less">
  [name = 'ticklingDetail']{
    .title{
      font-size: 34px;
      padding: 20px 50px 0;
      i{
        margin-right: 20px;
      }
    }
    .tickling{
      padding: 40px 80px;
      .ticklingContent{
        text-indent: 2em;
        padding: 5px 7px;
        line-height: 1.5;
        width: 100%;
        color: #1f2d3d;
        background-color: #fff;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
      }
    }
  }
</style>
