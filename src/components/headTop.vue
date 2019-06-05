<template>
  <div name='headTop'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/manage' }">管理后台</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown @command="handleCommand" menu-align='start'>
        <img :src="defaultImg" class="avator">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="signout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script type='text/babel'>
  import {logout} from '@/api/user';
  export default {
    name: 'headTop',
    data () {
      return {
        defaultImg: require('@IMG/default.jpg')
      };
    },
    methods: {
      handleCommand (command) {
        if (command === 'home') {
          this.$router.push('/manage');
        } else if (command === 'signout') {
          logout().then((res) => {
            let data = res.data;
            if (data.data === '1') {
              this.$message({
                type: 'success',
                message: '退出成功'
              });
              this.$router.push('/');
            } else {
              this.$message({
                type: 'error',
                message: data.message
              });
            }
          });
        }
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'headTop']{
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    .avator{
      .wh(36px, 36px);
      border-radius: 50%;
      margin-right: 37px;
    }
    .el-dropdown-menu__item{
      text-align: center;
    }
  }
</style>
