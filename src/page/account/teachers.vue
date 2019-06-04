<template>
  <div name='teachers'>
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="账号"
          prop="userId">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="cellphone">
        </el-table-column>
        <el-table-column
          label="学校"
          prop="school">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              :type="btnStyle(scope.row.using)"
              @click="handleDisplay(scope.row)">{{scope.row.using ? '禁用' : '启用'}}</el-button>
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
          :current-page="pageNum"
          :page-size="pageSize"
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
            <el-input v-model="selectTable.cellphone"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateShop">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getTeachersList, deleteTeacher, displayTeacher, updateTeacher} from '@/api';
  export default {
    name: 'teachers',
    data () {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 20,
        count: 0,
        school: '',
        name: '',
        cellphone: '',
        selectTable: {},
        dialogFormVisible: false
      };
    },
    created () {
      this.getData();
    },
    mounted () {
    },
    computed: {
      btnStyle () {
        return (val) => {
          return (val ? 'success' : 'disUse');
        };
      }
    },
    watch: {},
    methods: {
      getData () {
        getTeachersList({
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          school: this.school,
          name: this.name,
          cellphone: this.cellphone
        }).then((res) => {
          let data = res.data;
          if (data.resultCode === '000000') {
            let result = data.resultData;
            !this.count && (this.count = result.count);
            this.tableData = [...result.list];
          }
        });
      },
      handleCurrentChange (val) {
        this.pageNum = val;
        this.getData();
      },
      handleEdit (index, row) {
        this.selectTable = row;
        this.dialogFormVisible = true;
      },
      handleDelete (index, row) {
        this.$confirm('确定删除当前教师用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTeacher({userId: row.userId}).then((res) => {
            if (res.data.resultData) {
              this.$message({
                type: 'success',
                message: '成功删除' + res.data.resultData
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
      handleDisplay (row) {
        let keyText = row.using ? '禁用' : '启用';
        this.$confirm('确定' + keyText + '当前教师用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          displayTeacher({userId: row.userId}).then((res) => {
            if (res.data.resultData) {
              this.$message({
                type: 'success',
                message: '成功' + keyText + res.data.resultData
              });
              row.using = !row.using;
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        });
      },
      updateShop () {
        this.dialogFormVisible = false;
        console.log('修改成功');
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  .table_container{
    padding: 20px;
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
