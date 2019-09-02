<template>
  <div name='appManage'>
    <head-top></head-top>
    <div class="table_container">
      <header class="search">
        <div class='search_type'>
          <span>产品名称：</span>
          <el-select v-model="searchProductName" clearable placeholder="全部产品" @change="changeSearchType">
            <el-option
              v-for="item in productList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="createBtn">
          <el-button
            size="medium"
            @click="createNew">发布更新</el-button>
        </div>
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
    <el-dialog :title="isCheck ? '查看信息' : '发布更新'" v-model="dialogFormVisible" size="small">
      <el-form :model="selectTable" :rules="rules">
        <el-form-item label="产品名称" label-width="120px" prop="productName">
          <el-select v-model="selectTable.productName" placeholder="请选择产品名称" :disabled="isCheck" @change="checkAppType" >
            <el-option :label="item.label" :value="item.value" v-for="item in typeList" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本名称" label-width="120px" prop="versionString">
          <el-input :disabled="isCheck" v-model="selectTable.versionString" placeholder="请输入版本名称(例如:V1.0)" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本号" label-width="120px" prop="versionCode">
          <el-input :disabled="isCheck" v-model="selectTable.versionCode" placeholder="请输入版本号(例如:1)" auto-complete="off"></el-input>
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
        <el-form-item label="强制更新" label-width="120px" prop="forcedUpgradeStatus">
          <el-radio :disabled="isCheck" v-model="selectTable.forcedUpgradeStatus" label="0">否</el-radio>
          <el-radio :disabled="isCheck" v-model="selectTable.forcedUpgradeStatus" label="1">是</el-radio>
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
        searchProductName: '',
        searchProductType: '',
        fileList: [],
        dialogFormVisible: false,
        selectTable: {},
        rules: {
          productName: [
            { required: true, message: '请选择产品类型', trigger: 'blur' }
          ],
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
        isCheck: false,
        typeList: [
          {
            label: '家长端(手机)',
            value: 0
          }, {
            label: '学生平板端',
            value: 1
          },
          {
            label: '学生手机端',
            value: 2
          },
          {
            label: '教师端',
            value: 3
          },
          {
            label: '教师平板端',
            value: 4
          }
        ]
      };
    },
    beforeRouteLeave (to, from, next) {
      this.dialogFormVisible = false;
      next();
    },
    created () {
      this.limitGetData();
    },
    activated () {
      this.limitGetData();
    },
    computed: {
      submitDisable () {
        return !((typeof this.selectTable.type === 'number' && this.selectTable.type > -1) && this.fileList.length && this.selectTable.versionString && this.selectTable.versionCode && this.selectTable.message);
      },
      productList () {
        let result = [...this.typeList];
        result.unshift({
          label: '全部产品',
          value: ''
        });
        return result;
      }
    },
    watch: {
      dialogFormVisible (val) {
        !val && (this.fileList.splice(0, 1));
      }
    },
    methods: {
      getTypeName (type) {
        let name;
        switch (type) {
          case 0:
            name = '家长端(手机)';
            break;
          case 1:
            name = '学生平板端';
            break;
          case 2:
            name = '学生手机端';
            break;
          case 3:
            name = '教师端';
            break;
          case 4:
            name = '教师平板端';
            break;
        }
        return name;
      },
      changeSearchType (e) {
        this.searchProductType = e;
        this.limitGetData();
      },
      checkAppType (e) {
        this.$set(this.selectTable, 'type', e);
      },
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
        let {message, versionCode, forcedUpgradeStatus, type} = this.selectTable;
        let result = {...params, ...{message, versionCode, forcedUpgradeStatus, type}};

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
        this.selectTable = {
          forcedUpgradeStatus: '0'
        };
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
          limit: this.limit,
          type: this.searchProductType
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.count = data.total;
            this.tableData = data.data.map((item) => {
              // app类型(0: 家长端(手机) 1: 学生平板端 2: 学生手机端 3:教师端 4:教师平板端)
              item.productName = this.getTypeName(item.appType);
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
        item.forcedUpgradeStatus += ''; // 单选数据转字符串格式才能匹配上
        this.selectTable = item;
      }
    }
  };
</script>
<style scoped lang="less">
  @import '../account/css/list';
  .search{
    .search_type{
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .createBtn{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
