<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>传而习后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="account">
            <el-input v-model="loginForm.account" placeholder="账号" @keyup.native="accountKeyDown($event)"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password" ref="pwd" @keyup.native="pwdKeyDown($event)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
    <superviseFooter></superviseFooter>
  </div>
</template>

<script type='text/babel'>
  import {login} from '@/api/user';
  import superviseFooter from '@C/superviseFooter.vue';
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        showLogin: false
      };
    },
    mounted () {
      this.showLogin = true;
    },
    components: {
      superviseFooter
    },
    methods: {
      accountKeyDown (e) {
        if (e.keyCode == 13) { // 账号回车跳密码
          this.$refs.pwd.$el.firstElementChild.focus();
        }
      },
      pwdKeyDown (e) {
        if (e.keyCode == 13) { // 密码回车登录
          this.submitForm();
        }
      },
      submitForm () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            login({account: this.loginForm.account, password: this.loginForm.password}).then((res) => {
              let data = res.data;
              if (data.code == '0') {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                });
                if (this.$route.query.autoBack) {
                  this.$router.go(-1);
                } else {
                  this.$router.push('manage');
                }
              } else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  .login_page{
    background-color: #324057;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
      font-size: 34px;
      color: #fff;
    }
  }
  .form_contianer{
    .wh(370px, 220px);
    .ctp(370px, 220px);
    box-sizing: border-box;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .tip{
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
