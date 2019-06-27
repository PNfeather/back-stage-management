<template>
  <div name='service'>
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
        <el-button
          size="medium"
          @click="createService">新增</el-button>
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
          <el-form-item label="手机号" label-width="100px" prop="mobile">
            <el-input v-model="selectTable.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateCancel">取 消</el-button>
          <el-button type="primary" @click="updateSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增客服" v-model="createServiceModel">
        <el-form :model="createServiceInfo" :rules="createRules" ref="createForm">
          <el-form-item label="账号" label-width="100px" prop="account">
            <el-input v-model="createServiceInfo.account" placeholder="请输入账号" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="createServiceInfo.name" placeholder="请输入姓名" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" label-width="100px" prop="mobile">
            <el-input v-model="createServiceInfo.mobile" placeholder="请输入手机号" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createCancel">取 消</el-button>
          <el-button type="primary" @click="createSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getServiceList, createService} from '@/api/user';
  import {mixins} from './js/mixins';
  export default {
    name: 'service',
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
        createServiceInfo: {
          account: '',
          name: '',
          mobile: ''
        },
        createRules: {
          account: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ]
        },
        createServiceModel: false,
        userType: 2
      };
    },
    methods: {
      getData () {
        getServiceList({param: {
          skip: this.skip,
          limit: this.limit,
          name: this.searchForm.name,
          mobile: this.searchForm.mobile
        }}).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data;
          } else {
            this.$message.error(data.message);
          }
        });
      },
      createService () {
        this.createServiceModel = true;
      },
      createCancel () {
        this.createServiceModel = false;
        this.$message({
          type: 'info',
          message: '取消'
        });
      },
      createSubmit () {
        this.$refs.createForm.validate((valid) => {
          if (valid) {
            this.createServiceModel = false;
            createService(this.createServiceInfo).then((res) => {
              let data = res.data;
              if (data.code == 0) {
                this.$message({
                  type: 'success',
                  message: '创建成功'
                });
                this.limitGetData();
              } else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            });
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
  @import './css/list';
</style>
