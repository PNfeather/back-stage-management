<template>
  <div name='schoolDictionary'>
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="searchForm" :inline="true" class="search">
        <div style="flex: 1;display: flex;justify-content: flex-start">
          <el-form-item label="区域查询" label-width="90px">
            <linkage v-model="searchForm" :originalAddress="searchForm" :autoChoose="false"></linkage>
          </el-form-item>
          <el-button
            size="medium"
            @click="search">查询</el-button>
          <el-button
            size="medium"
            @click="reset">重置</el-button>
        </div>
        <div style="flex: 200px 0 0; display: flex;justify-content: flex-end">
          <el-button
            size="medium"
            @click="lead">导入</el-button>
          <el-button
            size="medium"
            @click="addNew">新增</el-button>
        </div>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%; flex: 1">
        <el-table-column
          label="学校名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="简称"
          prop="simpleName">
        </el-table-column>
        <el-table-column
          label="省份"
          prop="province">
        </el-table-column>
        <el-table-column
          label="市"
          prop="city">
        </el-table-column>
        <el-table-column
          label="县/区/乡镇"
          prop="district">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
      <el-dialog title="信息修改" v-model="dialogFormVisible" size="middle">
        <el-form :model="selectTable">
          <el-form-item label="学校名称" label-width="100px">
            <el-input v-model="selectTable.name" placeholder="请输入学校名称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="简称" label-width="100px">
            <el-input v-model="selectTable.simpleName" placeholder="请输入学校简称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="区域" label-width="100px">
            <linkage v-model="currentAddress" :originalAddress="originalAddress"></linkage>
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
  import linkage from '@C/linkage';
  import {getList, deleteSchool, updateSchool, createSchool} from '@/api/school';
  export default {
    name: 'schoolDictionary',
    data () {
      return {
        searchForm: {
          city: '',
          district: '',
          province: ''
        },
        tableData: [],
        currentPage: 1,
        skip: 0,
        limit: 20,
        count: 0,
        selectTable: {},
        selectIndex: 0,
        dialogFormVisible: false,
        addressOptions: [],
        currentAddress: {},
        originalAddress: {},
        getDataTimer: null,
        modalType: 'add' // add添加 //edit编辑
      };
    },
    watch: {
      currentAddress: {
        handler (val) {
          Object.assign(this.selectTable, val);
        },
        deep: true
      }
    },
    components: {
      linkage
    },
    created () {
      this.limitGetData();
    },
    activated () {
      this.limitGetData();
    },
    methods: {
      search () {
        this.currentPage = 1;
        this.skip = 0;
        this.limitGetData();
      },
      limitGetData () {
        if (this.getDataTimer) return;
        this.getData();
        this.getDataTimer = setTimeout(() => {
          this.getDataTimer = null;
        }, 500);
      },
      reset () {
        this.searchForm = {
          city: '',
          district: '',
          province: ''
        };
      },
      lead () {
        console.log('导入');
      },
      addNew () {
        this.originalAddress = {
          province: '',
          city: '',
          district: ''
        };
        this.selectTable = {
          name: '',
          simpleName: ''
        };
        this.modalType = 'add';
        this.dialogFormVisible = true;
      },
      getData () {
        getList({
          skip: this.skip,
          limit: this.limit,
          city: this.searchForm.city,
          province: this.searchForm.province,
          district: this.searchForm.district
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
        this.limitGetData();
      },
      handleEdit (index, row) {
        this.selectIndex = index;
        this.originalAddress = {
          province: row.province,
          city: row.city,
          district: row.district
        };
        this.selectTable = {...row};
        this.modalType = 'edit';
        this.dialogFormVisible = true;
      },
      handleDelete (index, row) {
        this.$confirm('确定删除当前学校?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSchool({id: row.id}).then((res) => {
            if (res.data.data) {
              this.$message({
                type: 'success',
                message: '成功删除'
              });
              this.tableData.splice(index, 1);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        });
      },
      updateCancel () {
        this.dialogFormVisible = false;
        this.$message({
          type: 'info',
          message: '取消'
        });
      },
      updateSubmit () {
        this.dialogFormVisible = false;
        if (this.modalType == 'edit') {
          let noChange = true;
          let os = {...this.tableData[this.selectIndex]};
          let sKeys = Object.keys(this.selectTable);
          let oKeys = Object.keys(os);
          (sKeys.length != oKeys.length) && (noChange = false);
          for (let i = 0; i < sKeys.length; i++) {
            (this.selectTable[sKeys[i]] != os[oKeys[i]]) && (noChange = false);
          }
          if (noChange) { // 判断数据是否变更，无变更点提交不调接口
            return this.$message({
              type: 'info',
              message: '无变更'
            });
          }
          updateSchool(this.selectTable).then((res) => {
            let data = res.data;
            if (data.code == 0) {
              this.tableData.splice(this.selectIndex, 1, this.selectTable);
              this.$message({
                type: 'success',
                message: '修改改成功'
              });
            }
          });
        }
        if (this.modalType == 'add') {
          createSchool({...this.currentAddress, ...this.selectTable}).then((res) => {
            let data = res.data;
            if (data.code == 0) {
              this.$message({
                type: 'success',
                message: '新增成功'
              });
            }
          });
        }
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../account/css/list';
  .table_container .search .el-form-item{
    max-width: 500px!important;
  }
</style>
