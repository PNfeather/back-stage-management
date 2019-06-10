<template>
  <div name='teachers'>
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="searchForm" :inline="true" class="search">
        <el-form-item label="学校" label-width="60px">
          <el-input v-model="searchForm.schoolName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="60px">
          <el-input v-model="searchForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="60px">
          <el-input v-model="searchForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-button
          size="medium"
          @click="search">查询</el-button>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%; flex: 1">
        <el-table-column
          label="账号"
          prop="account">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile">
        </el-table-column>
        <el-table-column
          label="学校"
          prop="schoolName">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              :type="btnStyle(scope.row.status)"
              @click="handleDisplay(scope.row)">{{(scope.row.status == 0) ? '禁用' : '启用'}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
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
      <el-dialog title="信息修改" v-model="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="姓名" label-width="100px">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="100px">
            <el-input v-model="selectTable.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateCancel">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getTeachersList} from '@/api/user';
  import {mixins} from './js/mixins';
  export default {
    name: 'teachers',
    mixins: [mixins],
    data () {
      return {
        searchForm: {
          schoolName: '',
          name: '',
          mobile: ''
        }
      };
    },
    methods: {
      getData () {
        getTeachersList({param: {
          skip: this.skip,
          limit: this.limit,
          schoolName: this.searchForm.schoolName,
          name: this.searchForm.name,
          mobile: this.searchForm.mobile
        }}).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data.map((item) => {
              let schoolArr = [];
              item.classes && item.classes.length && item.classes.forEach((c) => {
                !schoolArr.includes(c.schoolName) && schoolArr.push(c.schoolName);
              });
              item.schoolName = schoolArr.join(',');
              return item;
            });
          }
        });
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
