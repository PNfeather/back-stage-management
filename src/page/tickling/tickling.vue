<template>
  <div name='tickling'>
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%; flex: 1">
        <el-table-column
          label="反馈用户"
          prop="userName">
        </el-table-column>
        <el-table-column
          label="用户类型"
          prop="userTypeName">
        </el-table-column>
        <el-table-column
          label="反馈内容"
          prop="content">
          <template slot-scope="scope">
           <div class="ellipsis">{{scope.row.content}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="反馈时间"
          prop="feedbackTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkTickling(scope.row)">查看</el-button>
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
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getList} from '@/api/feedback';
  import format from '@/tools/format';
  export default {
    name: 'tickling',
    data () {
      return {
        searchForm: {
          creator: '',
          templateName: ''
        },
        tableData: [],
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
    methods: {
      getData () {
        getList({
          skip: this.skip,
          limit: this.limit,
          creator: this.searchForm.creator,
          templateName: this.searchForm.templateName
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            let userTypeName = {
              0: '学生',
              1: '家长',
              2: '客服',
              3: '教师'
            };
            this.tableData = data.data.map((item) => {
              item.feedbackTime = format(new Date(item.feedbackTime), 'YYYY-MM-DD');
              item.userTypeName = userTypeName[item.userType];
              return item;
            });
          } else {
            this.$message.error(data.message);
          }
        });
      },
      limitGetData () {
        if (this.getDataTimer) return;
        this.getData();
        this.getDataTimer = setTimeout(() => {
          this.getDataTimer = null;
        }, 500);
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.skip = (val - 1) * this.limit;
        this.limitGetData();
      },
      checkTickling (row) {
        this.$router.push({'path': '/ticklingDetail', query: {id: row.id}});
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../account/css/list';
</style>
