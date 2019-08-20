<template>
  <div name='index' class="fillcontain">
    <header class="header">
      <div class="logo">
        <img src="~@IMG/logo.png" alt="">
        <span>传而习</span>
      </div>
      <nav class="nav">
        <div class="nav-item"><a href="#" @click="jump($XZDKF_ENTRANCE)">客服系统</a></div>
      </nav>
    </header>
    <div class="indexContent fillcontain">
      <div class="bg fillcontain">
        <img src="~@IMG/indexBgImg.png" alt="">
      </div>
      <div class="wrapper">
        <div class="title">
          <div class="firstLine">学而时习之</div>
          <div class="secondLine">不亦说乎</div>
        </div>
        <div class="download">
          <div class="download-item">
            <div class="QR_code">
              <img :src="downloadImg" alt="">
            </div>
            <div class="text">传而习app家长版(Android)</div>
          </div>
          <!--<div class="download-item">-->
            <!--<div class="QR_code">-->
              <!--<img src="~@IMG/ios-download.png" alt="">-->
            <!--</div>-->
            <!--<div class="text">传而习app教师版(ios)</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <superviseFooter></superviseFooter>
  </div>
</template>

<script type='text/babel'>
  import superviseFooter from '@C/superviseFooter.vue';
  export default {
    name: 'index',
    data () {
      return {
        downloadImg: require('@IMG/' + (this.$ENVCONFIGNAME ? this.$ENVCONFIGNAME : 'cs') + '/android-download.png')
      };
    },
    methods: {
      jump (url) {
        window.location.href = url;
      }
    },
    components: {
      superviseFooter
    },
    mounted () {
      console.log('@IMG/' + (this.$ENVCONFIGNAME ? this.$ENVCONFIGNAME : 'cs') + '/android-download.png');
    }
  };
</script>
<style scoped lang="less">
  @import '~@/style/mixin';
  [name = 'index']{
    color: #fff;
    .header{
      position: absolute;
      z-index: 99;
      top: 0;right: 0;left: 0;
      background: rgba(0,0,0,0.6);
      height: 72px;
      line-height: 72px;
      display: flex;
      justify-content: space-between;
      .logo{
        flex: 33% 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        img{
          height: 45px;
          width: auto;
          margin-right: 8px;
        }
      }
      .nav{
        flex: 33% 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .nav-item{
          margin-right: 30px;
          font-size: 14px;
          a{
            color: #fff;
            &:hover{
              color: #00A8E2;
            }
          }
        }
      }
    }
    .indexContent{
      padding-top: -72px;
      .bg{
        position: absolute;
        z-index: 1;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .wrapper{
        position: absolute;
        top: 72px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title{
          .firstLine{
            font-size: 64px;
            line-height: 90px;
            text-align: center;
          }
          .secondLine{
            font-size: 32px;
            line-height: 45px;
            text-align: center;
          }
        }
      }
      .download{
        display: flex;
        justify-content: center;
        margin-top: 118px;
        .download-item{
          display: flex;
          flex-direction: column;
          margin: 0 50px;
          .QR_code{
            .wh(188px, 188px);
            display: flex;
            justify-content: center;
            align-items: center;
            background: #D8D8D8;
            border-radius: 23px;
            img{
              .wh(160px, 160px);
            }
          }
          .text{
            text-align: center;
            font-size: 14px;
            line-height: 20px;
            margin-top: 16px;
          }
        }
      }
    }
  }
</style>
