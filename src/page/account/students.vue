<template>
  <div name='students'>
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="searchForm" :inline="true" class="search">
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
          label="父母手机号"
          prop="mobile">
        </el-table-column>
        <el-table-column
          label="学校"
          prop="schoolName">
        </el-table-column>
        <el-table-column
          label="班级"
          prop="gradeName">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              :type="btnStyle(scope.row.status)"
              @click="handleDisplay(scope.$index, scope.row)">{{(scope.row.status == 0) ? '禁用' : '启用'}}</el-button>
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
        <el-form :model="selectTable" :rules="rules" ref="updateForm">
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="selectTable.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="父母手机号" label-width="100px" prop="mobile">
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
  import {getStudengList} from '@/api/user';
  import {mixins} from './js/mixins';
  export default {
    name: 'students',
    mixins: [mixins],
    data () {
      return {
        searchForm: {
          name: '',
          mobile: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ]
        },
        userType: 0
      };
    },
    beforeRouteLeave (to, from, next) {
      this.dialogFormVisible = false;
      next();
    },
    methods: {
      getData () {
        getStudengList({
          skip: this.skip,
          limit: this.limit,
          name: this.searchForm.name,
          mobile: this.searchForm.mobile
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data.map((item) => {
              let schoolArr = [];
              let gradeArr = [];
              item.classes.forEach((c) => {
                !schoolArr.includes(c.schoolName) && schoolArr.push(c.schoolName);
                !gradeArr.includes(c.name) && gradeArr.push(c.name);
              });
              item.schoolName = schoolArr.join(',');
              item.gradeName = gradeArr.join(',');
              return item;
            });
          } else {
            this.$message.error(data.message);
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
  @import './css/list';
</style>
