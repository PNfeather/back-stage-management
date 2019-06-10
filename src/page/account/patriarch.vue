<template>
  <div name='patriarch'>
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="searchForm" :inline="true" class="search">
        <el-form-item label="昵称" label-width="60px">
          <el-input v-model="searchForm.nickName" auto-complete="off"></el-input>
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
          label="昵称"
          prop="nickName">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile">
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
        <el-form :model="selectTable">
          <el-form-item label="昵称" label-width="100px">
            <el-input v-model="selectTable.nickName" auto-complete="off"></el-input>
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
  import {getGuardianList} from '@/api/user';
  import {mixins} from './js/mixins';
  export default {
    name: 'patriarch',
    mixins: [mixins],
    data () {
      return {
        searchForm: {
          nickName: '',
          mobile: ''
        },
        userType: 1
      };
    },
    methods: {
      getData () {
        if (this.cache[this.skip]) {
          this.tableData = this.cache[this.skip];
        } else {
          getGuardianList({param: {
              skip: this.skip,
              limit: this.limit,
              nickName: this.searchForm.nickName,
              mobile: this.searchForm.mobile
            }}).then((res) => {
            let data = res.data;
            if (data.code == 0) {
              this.count = data.total;
              this.tableData = data.data;
              this.cache[this.skip] = this.tableData;
            }
          });
        }
      }
    }
  };
</script>
<style scoped lang="less">
  @import './css/list';
</style>
