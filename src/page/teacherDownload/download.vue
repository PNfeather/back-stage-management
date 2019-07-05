<template>
  <div name='download' class="fillcontain">
    <div class="backGroundDiv fillcontain">
      <div class="bg"><img src="~@IMG/download-bg.png" alt=""></div>
      <div class="contentWrapper">
        <div class="title">邀请您加入班级</div>
        <div class="explain">大家好，我在“习之道作业”app里创建了我们的班级，这个app可以方便地发布作业、交作业、批改作业，请各位家长及时加入本班级。</div>
        <div class="how">
          <p>如何加入班级？</p>
          <p>1、点击页面链接下载闪批作业app</p>
          <p>2、注册账号时输入班级码即可加入</p>
        </div>
        <div class="classCode">
          <div class="text">班级码：{{classCode}}</div>
          <div class="copyBtn"
               v-clipboard:copy="classCode"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">复制</div>
        </div>
        <div class="downloadBtn" @click="download">下载习之道作业APP</div>
        <img class="logo" src="~@IMG/logo.png" alt="">
        <div class="logoName">习之道</div>
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
        let whdef = 100 / 1024;// 表示1450的设计图,使用10PX的默认值
        let bodyWidth = document.body.clientWidth;// 当前窗口的宽度
        let rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
        document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
      },
      download () {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
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
      background-size: 100% 100%;
      padding-top: 1.47rem;
      position: relative;
      .bg{
        position: absolute;
        .wh(100%, 100%);
        .allcover;
        img{
          .wh(100%, 100%);
        }
      }
      .contentWrapper{
        position: relative;
        z-index: 3;
        width: 7.68rem;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.45);
        padding: .99rem 0 .47rem;
        color: #FFFFFF;
        border-radius: .24rem;
        .title{
          font-size: .4rem;
          line-height: .36rem;
          text-align: center;
        }
        .explain{
          box-sizing: border-box;
          width: 100%;
          padding: 0 1.34rem;
          margin-top: .54rem;
          font-size: .18rem;
          line-height: .36rem;
        }
        .how{
          box-sizing: border-box;
          width: 100%;
          margin-top: .48rem;
          padding: 0 2.27rem;
          p{
            font-size: .18rem;
            line-height: .36rem;
          }
        }
        .classCode{
          margin-top: .85rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .text{
            font-size: .3rem;
            margin-right: .61rem;
          }
          .copyBtn{
            width: .8rem;
            height: .3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .2rem;
            border: 1px solid #FFFFFF;
            border-radius: .09rem;
          }
        }
        .downloadBtn{
          margin: .96rem auto 0;
          width: 2.72rem;
          height: .44rem;
          box-sizing: border-box;
          line-height: .44rem;
          text-align: center;
          background: #2D87FA;
          border-radius: .09rem;
          font-size: .2rem;
        }
        .logo{
          display: block;
          margin: 1.12rem auto 0;
          width: .61rem;
          height: auto;
        }
        .logoName{
          margin-top: .1rem;
          font-size: .24rem;
          text-align: center;
        }
      }
    }
  }
</style>
