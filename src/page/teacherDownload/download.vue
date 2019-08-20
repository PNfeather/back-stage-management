<template>
  <div name='download' class="fillcontain">
    <div class="backGroundDiv fillcontain">
      <div class="contentWrapper">
        <div class="title">邀请您加入班级</div>
        <div class="explain">大家好，我在"传而习"app里创建了我们的班级，这个app可以方便地发布作业、交作业、批改作业，请各位家长及时加入本班级。</div>
        <div class="how">
          <p>如何加入班级？</p>
          <p>1、点击页面链接下载传而习app</p>
          <p>2、注册账号时输入班级码即可加入</p>
        </div>
        <div class="classCode">
          <div class="text">班级码：{{classCode}}</div>
          <div class="copyBtn"
               v-clipboard:copy="classCode"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">复制</div>
        </div>
        <div class="downloadBtn" @click="download">下载传而习APP</div>
        <img class="logo" src="~@IMG/logoX4.png" alt="">
        <div class="logoName">传而习</div>
      </div>
    </div>
    <div class="shade" v-show="shadeToggle">
      <img class="leadArrows" :src="leadArrows" alt="">
      <p class="leadText">
        请使用浏览器打开
      </p>
    </div>
  </div>
</template>

<script type='text/babel'>
  import {getAppVersion} from '@/api/file';
  export default {
    name: 'download',
    data () {
      let query = this.$route.query;
      return {
        shadeToggle: false,
        leadArrows: require('@IMG/leadArrows.png'),
        classCode: query.classCode,
        downloadUrl: ''
      };
    },
    created () {
      this.pageInit();
    },
    mounted () {
      this.setRem();
    },
    beforeRouteLeave (to, from, next) {
      document.getElementsByTagName('html')[0].removeAttribute('style');
      next();
    },
    computed: {},
    watch: {},
    methods: {
      pageInit () {
        getAppVersion(0).then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.downloadUrl = reData.url;
          } else {
            this.$message.error(data.message);
          }
        });
      },
      onCopy () { // 复制成功
        this.$message.success('班级码已复制');
      },
      onError () { // 复制失败
        this.$message.error('复制失败');
      },
      setRem () {
        let whdef = 20 / 375;// 表示1450的设计图,使用10PX的默认值
        let bodyWidth = document.body.clientWidth;// 当前窗口的宽度
        let rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
        document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
      },
      download () {
        let u = navigator.userAgent;
        let ua = u.toLowerCase();
        let isWX = ua.indexOf('micromessenger') > -1;
        let isQQ = (ua.match(/QQ/i) == 'qq') && !(u.indexOf('MQQBrowser') > -1);
        if (isWX || isQQ) {
          this.shadeToggle = true;
        } else {
          let myFrame = document.createElement('iframe');
          myFrame.src = this.$CJIMGURL + this.downloadUrl;
          myFrame.style.display = 'none';
          document.body.appendChild(myFrame);
        }
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'download']{
    .shade{
      position: absolute;
      .wh(100%, 100%);
      .allcover();
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
      .leadArrows{
        position: absolute;
        right: 30px;
        top: 0;
        height: 150px;
        width: auto;
      }
      .leadText{
        color: #fff;
        text-align: right;
        font-size: 14px;
        position: absolute;
        top: 155px;
        right: 5px;
      }
    }
    .backGroundDiv{
      background: url("~@IMG/download-bg.png") no-repeat center center;
      background-size: cover;
      overflow: auto;
      .contentWrapper{
        box-sizing: border-box;
        width: 15rem;
        margin: 2rem auto;
        background: rgba(255, 255, 255, 0.45);
        padding: 1.2rem;
        color: #FFFFFF;
        border-radius: 1.2rem;
        .title{
          font-size: 1.2rem;
          line-height: 1.4rem;
          font-weight: bold;
          text-align: center;
        }
        .explain{
          box-sizing: border-box;
          width: 100%;
          margin-top: 1rem;
          font-size: .7rem;
          line-height: 1.2rem;
        }
        .how{
          box-sizing: border-box;
          width: 100%;
          margin-top: 1.2rem;
          padding-left: .8rem;
          p{
            font-size: .7rem;
            line-height: 1.2rem;
          }
        }
        .classCode{
          margin-top: 1.6rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .text{
            font-size: .8rem;
            margin-right: .9rem;
            font-weight: bold;
          }
          .copyBtn{
            width: 2.8rem;
            height: 1.6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .8rem;
            border: 1px solid #FFFFFF;
            border-radius: .5rem;
          }
        }
        .downloadBtn{
          margin: 1.6rem auto 0;
          width: 100%;
          height: 2rem;
          box-sizing: border-box;
          line-height: 2rem;
          text-align: center;
          background: #2D87FA;
          border-radius: .4rem;
          font-size: .7rem;
          cursor: pointer;
        }
        .logo{
          display: block;
          margin: 1rem auto 0;
          width: auto;
          height: 2.9rem;
        }
        .logoName{
          margin-top: .5rem;
          font-size: .7rem;
          text-align: center;
        }
      }
    }
  }
</style>
