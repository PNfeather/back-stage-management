import {deleteAccount, disableAccount, updateAccount} from '@/api/user';
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
      cache: {} // 数据缓存
    };
  },
  created () {
    this.getData();
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
      this.getData();
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
      this.$confirm('确定删除当前用户?', '提示', {
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
            this.cache = {}; // 清空缓存
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
      this.$confirm('确定' + keyText + '当前用户?', '提示', {
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
      updateAccount({param: Object.assign(this.selectTable, {userType: this.userType})}).then((res) => {
        let data = res.data;
        if (data.code == 0) {
          this.tableData.splice(this.selectIndex, 1, this.selectTable);
          this.$message({
            type: 'success',
            message: '修改改成功'
          });
        } else {
          this.$message({
            type: 'error',
            message: data.message
          });
        }
      });
    }
  }
};

export {mixins};
