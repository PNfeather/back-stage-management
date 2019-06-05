<template>
  <div name='teachers'>
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%">
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
            <el-input v-model="selectTable.mobile"></el-input>
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
  import {getTeachersList, deleteAccount, disableAccount, updateAccount} from '@/api';
  export default {
    name: 'teachers',
    data () {
      return {
        tableData: [],
        currentPage: 1,
        skip: 0,
        limit: 20,
        count: 0,
        schoolName: '',
        name: '',
        mobile: '',
        selectTable: {},
        selectIndex: 0,
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
          return ((val == 0) ? 'success' : 'disUse');
        };
      }
    },
    watch: {},
    methods: {
      getData () {
        getTeachersList({
          skip: this.skip,
          limit: this.limit,
          schoolName: this.schoolName,
          name: this.name,
          mobile: this.mobile
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data.map((item) => {
              let schoolArr = [];
              item.classes.forEach((c) => {
                schoolArr.push(c.schoolName);
              });
              item.schoolName = schoolArr.join(',');
              return item;
            });
          }
        });
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.skip = (val - 1) * this.limit;
        this.getData();
      },
      handleEdit (index, row) {
        this.selectIndex = index;
        this.selectTable = {...row};
        this.dialogFormVisible = true;
      },
      handleDelete (index, row) {
        this.$confirm('确定删除当前教师用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAccount({id: row.id}).then((res) => {
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
      handleDisplay (row) {
        let keyText = (row.status == 0) ? '禁用' : '启用';
        this.$confirm('确定' + keyText + '当前教师用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disableAccount({id: row.id}).then((res) => {
            if (res.data.data) {
              this.$message({
                type: 'success',
                message: '成功' + keyText
              });
              (row.status == 0) ? (row.status = 1) : (row.status = 0);
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
        updateAccount(this.selectTable).then((res) => {
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
