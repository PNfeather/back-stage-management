<template>
  <div name='android'>
    <header class="header">
      <div class="headerContent">
        <div class="logo">
          <img class="logoImg" :src="logoImg" alt="">
        </div>
        <div class="name">传而习</div>
        <div class="version">
          版本 {{info.versionString}}
        </div>
      </div>
    </header>
    <div class="download-button-area">
      <div class="btn" @click="download">下载安装({{info.size}})</div>
      <div class="shadow"></div>
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
  import WEB from '@/tools/navigatorDetection';
  export default {
    name: 'android',
    data () {
      return {
        info: {},
        logoImg: require('@IMG/ic_launcher.png'),
        leadArrows: require('@IMG/leadArrows.png'),
        shadeToggle: false
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
    methods: {
      pageInit () {
        const isIos = WEB.isIos;
        const isWeixin = WEB.isWeixin;
        if (!isIos && isWeixin) { // 安卓端在微信直接弹遮罩
          this.shadeToggle = true;
        }
        if (isIos) {
          this.goAppStore();
        }
        getAppVersion(0).then(res => {
          let data = res.data;
          if (data.code == 0) {
            let reData = data.data;
            this.info = reData;
            this.info.size = this.getSize(this.info.size);
          } else {
            this.$message.error(data.message);
          }
        });
      },
      setRem () {
        let whdef = 20 / 375;// 表示1450的设计图,使用10PX的默认值
        let bodyWidth = document.body.clientWidth;// 当前窗口的宽度
        let rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
        document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
      },
      getSize (size) {
        let KB = size / 1024;
        let M = KB / 1024;
        if (KB < 0.01) {
          return (size.toFixed(2) + 'B');
        } else if (M < 0.01) {
          return (KB.toFixed(2) + 'KB');
        } else {
          return (M.toFixed(2) + 'M');
        }
      },
      download () {
        const isIos = WEB.isIos;
        if (!isIos) {
          let myFrame = document.createElement('iframe');
          myFrame.src = this.$CJIMGURL + this.info.url;
          myFrame.style.display = 'none';
          document.body.appendChild(myFrame);
        } else {
          this.goAppStore();
        }
      },
      goAppStore () {
        window.location.href = 'https://apps.apple.com/cn/app/%E4%BC%A0%E8%80%8C%E4%B9%A0/id1477921230';
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'android']{
    .shade{
      position: absolute;
      .wh(100%, 100%);
      .allcover();
      background: rgba(0, 0, 0, 0.5);
      z-index: 99;
      .leadArrows{
        position: absolute;
        right: 1.5rem;
        top: 0;
        height: 7.5rem;
        width: auto;
      }
      .leadText{
        color: #fff;
        text-align: right;
        font-size: .7rem;
        position: absolute;
        top: 7.8rem;
        right: .25rem;
      }
    }
    .header{
      .wh(100%, 11.1rem);
      position: relative;
      background-image: linear-gradient(-135deg, #07D3F5 0%, #0DB2EF 100%);
      &:before{
        content: '';
        position: absolute;
        top: 0;
        right: .25rem;
        left: .25rem;
        bottom: -.5rem;
        z-index: 2;
        opacity: 0.3;
        background-image: linear-gradient(-135deg, #07D3F5 0%, #0DB2EF 100%);
      }
      &:after{
        content: '';
        position: absolute;
        top: 0;
        right: .55rem;
        left: .55rem;
        bottom: -1rem;
        z-index: 2;
        opacity: 0.3;
        background-image: linear-gradient(-135deg, #07D3F5 0%, #0DB2EF 100%);
      }
      .headerContent{
        .wh(100%, 100%);
        .allcover();
        text-align: center;
        color: #fff;
        z-index: 3;
        .logo{
          .wh(3.6rem, 3.6rem);
          margin: 3.25rem auto 0;
          .logoImg{
            .wh(100%, 100%)
          }
        }
        .name{
          .ft(.9rem, 1.25rem);
          margin-top: .65rem;
        }
        .version{
          .ft(.6rem, .85rem);
          margin-top: .2rem;
        }
      }
    }
    .download-button-area{
      margin: 4rem auto 0;
      .wh(90%, 2.4rem);
      position: relative;
      .btn{
        position: absolute;
        .wh(100%, 100%);
        .allcover();
        z-index: 2;
        background: #0DB2EF;
        border-radius: .4rem;
        color: #fff;
        text-align: center;
        .ft(.8rem, 2.4rem);
      }
      .shadow{
        position: absolute;
        z-index: 1;
        .wh(100%, 100%);
        left: 0;
        bottom: -.3rem;
        opacity: 0.05;
        background: #0DB2EF;
        border-radius: .4rem;
      }
    }
    .tips{
      margin-top: .85rem;
      .ft(.7rem, 1rem);
      color: #999;
      text-align: center;
    }
  }
</style>
