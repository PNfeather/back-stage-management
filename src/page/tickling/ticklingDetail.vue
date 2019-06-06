<template>
  <div name='ticklingDetail'>
    <head-top></head-top>
    <el-form  class="tickling" :model="tickling" :label-position="'top'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="反馈用户" label-width="100px">
            <div>{{tickling.account}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户类型" label-width="100px">
            <div>{{tickling.accountType}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="反馈时间" label-width="100px">
            <div>{{tickling.ticklingTime}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 100%">
        <el-form-item label="反馈内容" label-width="100px">
          <el-input
            type="textarea"
            resize="none"
            autosize
            placeholder="请输入内容"
            v-model="tickling.ticklingContent">
          </el-input>
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
        tickling: {
          account: '埃里克时代峻峰',
          accountType: '家长',
          ticklingTime: '2019-01-01',
          ticklingContent: '来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了来得及法律埃里克时代峻峰垃圾收到了房间埃里克时代峻峰拉进来水电费捡垃圾的浪费空间看了'
        }
      };
    },
    activated () {
      let query = this.$route.query;
      console.log(query.id);
    },
    created () {},
    mounted () {},
    computed: {},
    watch: {},
    methods: {},
    components: {}
  };
</script>
<style scoped lang="less">
  [name = 'ticklingDetail']{
    .tickling{
      padding: 40px 80px;
    }
  }
</style>
