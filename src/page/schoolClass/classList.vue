<template>
  <div name='classList'>
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="searchForm" :inline="true" class="search">
        <el-form-item label="学校名称" label-width="90px">
          <el-input v-model="searchForm.schoolName" auto-complete="off"></el-input>
        </el-form-item>
        <el-button
          size="medium"
          @click="search">查询</el-button>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%; flex: 1">
        <el-table-column
          label="学校名称"
          prop="schoolName">
        </el-table-column>
        <el-table-column
          label="年级"
          prop="grade">
        </el-table-column>
        <el-table-column
          label="班级名称"
          prop="className">
        </el-table-column>
        <el-table-column
          label="班级码"
          prop="className">
        </el-table-column>
        <el-table-column
          label="创建老师"
          prop="className">
        </el-table-column>
        <el-table-column
          label="教师"
          prop="className">
        </el-table-column>
        <el-table-column
          label="学生"
          prop="className">
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getGuardianList} from '@/api';
  export default {
    name: 'classList',
    data () {
      return {
        searchForm: {
          schoolName: ''
        },
        tableData: [],
        currentPage: 1,
        skip: 0,
        limit: 20,
        count: 0
      };
    },
    created () {
      this.getData();
    },
    computed: {
      btnStyle () {
        return (val) => {
          return ((val == 0) ? 'success' : 'disUse');
        };
      }
    },
    methods: {
      search () {
        this.getData();
      },
      getData () {
        getGuardianList({
          skip: this.skip,
          limit: this.limit,
          nickName: this.searchForm.nickName,
          mobile: this.searchForm.mobile
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data;
          }
        });
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.skip = (val - 1) * this.limit;
        this.getData();
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  .table_container{
    padding: 20px;
    display: flex;
    flex-direction: column;
    .search{
      display: flex;
      align-items: center;
      padding-bottom: 22px;
      .el-form-item{
        margin-bottom: 0!important;
        flex: 260px 0 0;
        display: flex;
      }
    }
  }
  .Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
  .el-button--disUse{
    background-color: #909399;
    color: #fff;
    border-color: #909399;
  }
</style>
