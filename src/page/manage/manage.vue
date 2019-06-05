<template>
  <div name='manage' class="fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4"  style="min-height: 100%; background-color: #324057;overflow: hidden">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>管理后台</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="iconfont iconAccountManagement"></i>账号管理</template>
            <el-menu-item index="teachers">教师用户</el-menu-item>
            <el-menu-item index="patriarch">家长用户</el-menu-item>
            <el-menu-item index="students">学生用户</el-menu-item>
            <el-menu-item index="service">客户用户</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="iconfont iconClassManagement"></i>班级管理</template>
            <el-menu-item index="classList">班级列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="iconfont iconResourceManagement"></i>资源管理</template>
             <el-menu-item index="resourceList">资源列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="iconfont iconSchoolDictionary"></i>字典管理</template>
            <el-menu-item index="schoolDictionary">学校字典</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="iconfont iconTickling"></i>反馈信息</template>
            <el-menu-item index="tickling">反馈列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script type='text/babel'>
  export default {
    computed: {
      defaultActive () {
        return this.$route.path.replace('/', '');
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'manage']{
    .iconfont {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      display: inline-block;
    }
  }
</style>
