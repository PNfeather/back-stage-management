<template>
  <div name='android'>
    <header class="header">
      <div class="headerContent">
        <div class="logo">
          <img class="logoImg" :src="logoImg" alt="">
        </div>
        <div class="name">习之道</div>
        <div class="version">
          版本 {{info.versionString}}
        </div>
      </div>
    </header>
    <div class="download-button-area">
      <div class="btn" @click="download">下载安装({{info.size}})</div>
      <div class="shadow"></div>
    </div>
    <div class="tips">
      适用于Android系统
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
    methods: {
      pageInit () {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.shadeToggle = true;
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
        let myFrame = document.createElement('iframe');
        myFrame.src = this.$CJIMGURL + this.info.url;
        myFrame.style.display = 'none';
        document.body.appendChild(myFrame);
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
        right: 5px;
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
    .header{
      .wh(100%, 222px);
      position: relative;
      background-image: linear-gradient(-135deg, #07D3F5 0%, #0DB2EF 100%);
      &:before{
        content: '';
        position: absolute;
        top: 0;
        right: 5px;
        left: 5px;
        bottom: -10px;
        z-index: 2;
        opacity: 0.3;
        background-image: linear-gradient(-135deg, #07D3F5 0%, #0DB2EF 100%);
      }
      &:after{
        content: '';
        position: absolute;
        top: 0;
        right: 11px;
        left: 11px;
        bottom: -20px;
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
          .wh(72px, 72px);
          margin: 65px auto 0;
          .logoImg{
            .wh(100%, 100%)
          }
        }
        .name{
          .ft(18px, 25px);
          margin-top: 13px;
        }
        .version{
          .ft(12px, 17px);
          margin-top: 4px;
        }
      }
    }
    .download-button-area{
      margin: 80px auto 0;
      .wh(90%, 48px);
      position: relative;
      .btn{
        position: absolute;
        .wh(100%, 100%);
        .allcover();
        z-index: 2;
        background: #0DB2EF;
        border-radius: 8px;
        color: #fff;
        text-align: center;
        .ft(16px, 48px);
      }
      .shadow{
        position: absolute;
        z-index: 1;
        .wh(100%, 100%);
        left: 0;
        bottom: -6px;
        opacity: 0.05;
        background: #0DB2EF;
        border-radius: 8px;
      }
    }
    .tips{
      margin-top: 17px;
      .ft(14px, 20px);
      color: #999;
      text-align: center;
    }
  }
</style>
