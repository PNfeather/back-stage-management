import {deleteAccount, disableAccount, enableAccount, updateAccount} from '@/api/user';
const mixins = {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      skip: 0,
      limit: 20,
      count: 0,
      selectTable: {},
      selectIndex: 0,
      dialogFormVisible: false,
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
    limitGetData () {
      if (this.getDataTimer) return;
      this.getData();
      this.getDataTimer = setTimeout(() => {
        this.getDataTimer = null;
      }, 500);
    },
    search () {
      this.skip = 0;
      this.currentPage = 1;
      this.limitGetData();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.skip = (val - 1) * this.limit;
      this.limitGetData();
    },
    handleEdit (index, row) {
      this.selectIndex = index;
      this.selectTable = {...row};
      this.dialogFormVisible = true;
    },
    handleDelete (index, row) {
      this.$confirm('确定删除当前用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAccount(row.id).then((res) => {
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
    },
    handleDisplay (index, row) {
      let keyText = (row.status == 0) ? '禁用' : '启用';
      this.$confirm('确定' + keyText + '当前用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.status != 0 && enableAccount(row.id).then((res) => {
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
        row.status == 0 && disableAccount(row.id).then((res) => {
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
    updateCancel () {
      this.dialogFormVisible = false;
      this.$message({
        type: 'info',
        message: '取消'
      });
    },
    updateSubmit () {
      this.$refs.updateForm.validate((valid) => {
        if (valid) {
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
          updateAccount({
            id: this.selectTable.id,
            mobile: this.selectTable.mobile,
            name: this.userType == 1 ? this.selectTable.nickName : this.selectTable.name, // 家长用户传昵称
            userType: this.userType
          }).then((res) => {
            let data = res.data;
            if (data.code == 0) {
              this.tableData.splice(this.selectIndex, 1, this.selectTable);
              this.$message({
                type: 'success',
                message: '修改成功'
              });
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

export {mixins};
