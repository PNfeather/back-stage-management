<template>
  <div name='appManage'>
    <head-top></head-top>
    <div class="table_container">
      <header class="search">
        <el-button
          size="medium"
          @click="createNew">发布更新</el-button>
      </header>
      <el-table
        :data="tableData"
        style="width: 100%; flex: 1">
        <el-table-column
          label="产品名称"
          prop="productName">
        </el-table-column>
        <el-table-column
          label="版本名称"
          prop="versionString">
        </el-table-column>
        <el-table-column
          label="更新内容"
          prop="message">
          <template slot-scope="scope">
            <div class="ellipsis">{{scope.row.message}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="updateTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="download(scope.row)">下载安装包</el-button>
            <el-button
              size="mini"
              @click="check(scope.row)">查看</el-button>
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
    <el-dialog title="信息修改" v-model="dialogFormVisible" size="small">
      <el-form :model="selectTable" :rules="rules">
        <el-form-item label="产品名称" label-width="120px">
          <el-select v-model="selectTable.productName" placeholder="请选择活动区域" :disabled="isCheck">
            <el-option label="习之道家长版android端" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本名称" label-width="120px" prop="versionString">
          <el-input :disabled="isCheck" v-model="selectTable.versionString" placeholder="请输入版本名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本号" label-width="120px" prop="versionCode">
          <el-input :disabled="isCheck" v-model="selectTable.versionCode" placeholder="请输入版本号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本更新内容" label-width="120px" prop="message">
          <el-input :disabled="isCheck" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="selectTable.message" placeholder="请输入更新内容"></el-input>
        </el-form-item>
        <el-form-item label="app安装包" label-width="120px" v-if="!isCheck">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :on-remove = "handleRemove"
            :on-change = 'changeFile'
            :before-upload = "beforeUpload"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary" :disabled="!!fileList.length">选取文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-show="!isCheck">
        <el-button @click="closeModel">取 消</el-button>
        <el-button type="primary" @click="submit" :disabled="submitDisable">发 布</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type='text/babel'>
  import {getAndroidList, uploadAndroid} from '@/api/file';
  import format from '@/tools/format';
  export default {
    name: 'appManage',
    data () {
      return {
        fileList: [],
        dialogFormVisible: false,
        selectTable: {},
        rules: {
          versionString: [
            { required: true, message: '请输入版本名称', trigger: 'blur' }
          ],
          versionCode: [
            { required: true, message: '请输入版本号', trigger: 'blur' }
          ],
          message: [
            { required: true, message: '请输入更新内容', trigger: 'blur' }
          ]
        },
        tableData: [],
        currentPage: 1,
        skip: 0,
        limit: 20,
        count: 0,
        getDataTimer: null,
        isCheck: false
      };
    },
    created () {
      this.limitGetData();
    },
    activated () {
      this.limitGetData();
    },
    computed: {
      submitDisable () {
        return !(this.fileList.length && this.selectTable.versionString && this.selectTable.versionCode && this.selectTable.message);
      }
    },
    watch: {
      dialogFormVisible (val) {
        !val && (this.fileList.splice(0, 1));
      }
    },
    methods: {
      beforeUpload () {
        return false;
      },
      handleRemove () {
        this.fileList.splice(0, 1);
      },
      changeFile (file) {
        this.fileList.push(file);
      },
      submit () {
        let file = this.fileList[0];

        let params = {
          file: file.raw,
          version: this.selectTable.versionString
        };
        let {message, versionCode} = this.selectTable;
        let result = {...params, ...{message, versionCode}};

        let formData = new FormData();
        let keys = Object.keys(result);
        for (let i = 0; i < keys.length; i++) {
          formData.append(keys[i], result[keys[i]]);
        }

        uploadAndroid(formData).then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: '发布成功'
            });
            this.limitGetData();
          } else {
            this.$message.error(data.message);
          }
        });
      },
      closeModel () {
        this.dialogFormVisible = false;
      },
      createNew () {
        this.isCheck = false;
        this.dialogFormVisible = true;
        this.selectTable = {};
      },
      limitGetData () {
        if (this.getDataTimer) return;
        this.getData();
        this.getDataTimer = setTimeout(() => {
          this.getDataTimer = null;
        }, 500);
      },
      getData () {
        getAndroidList({
          skip: this.skip,
          limit: this.limit
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data.map((item) => {
              // APP类型(0:学生家长端 1:教师端)
              item.appType == 0 && (item.productName = '习之道家长版android端');
              item.updateTime = format(new Date(item.releaseTime), 'YYYY-MM-DD');
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
      download (item) {
        let myFrame = document.createElement('iframe');
        myFrame.src = this.$CJIMGURL + item.url;
        myFrame.style.display = 'none';
        document.body.appendChild(myFrame);
      },
      check (item) {
        this.isCheck = true;
        this.dialogFormVisible = true;
        this.selectTable = item;
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../account/css/list';
</style>
