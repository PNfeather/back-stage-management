<template>
  <div name='resourceList'>
    <head-top></head-top>
    <div class="table_container">
      <el-form :model="searchForm" :inline="true" class="search">
        <el-form-item label="创建客服" label-width="90px">
          <el-select v-model="searchForm.creatorId" clearable placeholder="请选择">
            <el-option
              v-for="item in serviceList"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源名称" label-width="90px">
          <el-input v-model="searchForm.templateBookName" auto-complete="off"></el-input>
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
          prop="countPage">
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
  import {getAllService} from '@/api/user';
  import format from '@/tools/format';
  export default {
    name: 'resourceList',
    data () {
      return {
        searchForm: {
          creatorId: '',
          templateBookName: ''
        },
        tableData: [],
        currentPage: 1,
        skip: 0,
        limit: 20,
        count: 0,
        getDataTimer: null,
        serviceList: []
      };
    },
    created () {
      this.limitGetData();
      getAllService().then(res => {
        let data = res.data;
        if (data.code == 0) {
          let reData = data.data;
          this.serviceList = [{label: '全部', value: ''}, ...reData.map((item) => {
            let cell = {
              label: item.name,
              value: item.id
            };
            return cell;
          })];
        } else {
          this.$message.error(data.message);
        }
      });
    },
    activated () {
      this.limitGetData();
    },
    methods: {
      search () {
        this.skip = 0;
        this.currentPage = 1;
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
          bookStatus: '1', // 0草稿1已发布
          skip: this.skip,
          limit: this.limit,
          creatorId: this.searchForm.creatorId,
          templateBookName: this.searchForm.templateBookName
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data.map((item) => {
              item.createdAt = format(new Date(item.createdAt), 'YYYY-MM-DD');
              item.updatedAt = format(new Date(item.updatedAt), 'YYYY-MM-DD');
              return item;
            });
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
      checkResource (row) {
        this.$router.push({'path': '/resourceDetail', query: {id: row.id, templateName: row.name}});
      },
      handleDelete (index, row) {
        this.$confirm('确定删除当前资源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteResource(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '成功删除'
              });
              this.tableData.splice(index, 1);
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
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../account/css/list';
</style>
