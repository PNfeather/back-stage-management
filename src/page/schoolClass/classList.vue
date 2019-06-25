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
          prop="gradeName">
        </el-table-column>
        <el-table-column
          label="班级名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="班级码"
          prop="classCode">
        </el-table-column>
        <el-table-column
          label="创建老师"
          prop="creatorName">
        </el-table-column>
        <el-table-column
          label="教师"
          prop="teacherCount">
          <template slot-scope="scope">
            <div class="amplify" @click="checkTeachers(scope.row.id)">{{scope.row.teacherCount}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="学生"
          prop="studentCount">
          <template slot-scope="scope">
            <div @click="checkStudents(scope.row.id)">{{scope.row.studentCount}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="btnStyle(scope.row.status)"
              @click="handleDisplay(scope.$index, scope.row)">{{(scope.row.status == 0) ? '禁用' : '启用'}}</el-button>
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
      <el-dialog title="教师信息" v-model="showTeachers">
        <el-table
          :data="selectTeachers"
          style="width: 100%; flex: 1">
          <el-table-column
            label="教师姓名"
            prop="userName">
          </el-table-column>
          <el-table-column
            label="手机号"
            prop="mobile">
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="学生信息" v-model="showStudents">
        <el-table
          :data="selectStudents"
          style="width: 100%; flex: 1">
          <el-table-column
            label="学生姓名"
            prop="userName">
          </el-table-column>
          <el-table-column
            label="账号"
            prop="account">
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getList, getStudents, getTeachers, disableClass, enableClass} from '@/api/class';
  export default {
    name: 'classList',
    data () {
      return {
        searchForm: {
          schoolName: ''
        },
        tableData: [],
        selectTeachers: [],
        showTeachers: false,
        selectStudents: [],
        showStudents: false,
        currentPage: 1,
        skip: 0,
        limit: 20,
        count: 0,
        getDataTimer: null
      };
    },
    created () {
      this.limitGetData();
    },
    activated () {
      this.limitGetData();
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
        this.limitGetData();
      },
      limitGetData () {
        if (this.getDataTimer) return;
        this.getData();
        this.getDataTimer = setTimeout(() => {
          this.getDataTimer = null;
        }, 500);
      },
      getData () {
        getList({
          skip: this.skip,
          limit: this.limit,
          schoolName: this.searchForm.schoolName
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data;
          } else {
            this.$message.error(data.message);
          }
        });
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.skip = (val - 1) * this.limit;
        this.limitGetData();
      },
      checkTeachers (id) {
        this.showTeachers = true;
        getTeachers(id).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.selectTeachers = data.data;
          } else {
            this.$message.error(data.message);
          }
        });
      },
      handleDisplay (index, row) {
        let keyText = (row.status == 0) ? '禁用' : '启用';
        this.$confirm('确定' + keyText + '当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.status != 0 && enableClass(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '成功' + keyText
              });
              this.$set(this.tableData[index], 'status', 0);
            } else {
              this.$message.error(res.data.message);
            }
          });
          row.status == 0 && disableClass(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '成功' + keyText
              });
              this.$set(this.tableData[index], 'status', 1);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        });
      },
      checkStudents (id) {
        this.showStudents = true;
        getStudents(id).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.selectStudents = data.data;
          } else {
            this.$message.error(data.message);
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../account/css/list';
  .amplify{
    position: relative;
    &:after{
      .posAb(-10px, -10px, -10px, -10px);
      content: '';
    }
  }
</style>
