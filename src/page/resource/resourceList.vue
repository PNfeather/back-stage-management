<template>
  <div name='resourceList'>
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="searchForm" :inline="true" class="search">
        <el-form-item label="创建客服" label-width="90px">
          <el-input v-model="searchForm.creator" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源名称" label-width="90px">
          <el-input v-model="searchForm.templateName" auto-complete="off"></el-input>
        </el-form-item>
        <el-button
          size="medium"
          @click="search">查询</el-button>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%; flex: 1">
        <el-table-column
          label="资源名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="总页数"
          prop="pageNum">
        </el-table-column>
        <el-table-column
          label="创建客服"
          prop="creatorName">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createdAt">
        </el-table-column>
        <el-table-column
          label="修改时间"
          prop="updatedAt">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkResource(scope.row)">查看</el-button>
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
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getList, deleteResource} from '@/api/template';
  export default {
    name: 'resourceList',
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
        count: 0
      };
    },
    created () {
      this.getData();
    },
    methods: {
      search () {
        this.getData();
      },
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
            this.tableData = data.data;
          }
        });
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.skip = (val - 1) * this.limit;
        this.getData();
      },
      checkResource (row) {
        this.$router.push({'path': '/resourceDetail', query: {id: row.id}});
      },
      handleDelete (index, row) {
        console.log(row);
        this.$confirm('确定删除当前资源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteResource({id: row.id}).then((res) => {
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
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../account/css/list';
</style>
