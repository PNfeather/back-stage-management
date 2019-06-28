<template>
  <div name='android'>
    <div class="bg"></div>
    <div class="content">
      <div class="app-icon">
        <!--<img src="./resources/cjhms-app.png" />-->
      </div>
      <div class="app-name">
        <div class="name">e采课业</div>
        <div class="info">
          <span>版本 V1.3.1</span>
          <span>大小 15.13M</span>
        </div>
      </div>
      <div class="download-btn">
        <a href="http://cj-public.oss-cn-shenzhen.aliyuncs.com/app/cjhms.apk">
          <span class="iconfont icondownload-o"></span>
          <span>下载安装</span>
        </a>
      </div>
      <div class="apply-tip">
        <span>适用于安卓系统</span>
      </div>
    </div>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'android',
    data () {
      return {
      };
    },
    created () {},
    mounted () {},
    computed: {},
    watch: {},
    methods: {},
    components: {}
  };
</script>
<style scoped lang="less">
  [name = 'android']{
    html, body {
      padding: 0;
      margin: 0;
    }

    @media (min-width: 1200px) {
      .content {
        width: 1200px;
        padding-left: 0;
        padding-right: 0;
      }
    }

    @media (min-width: 768px) {
      .content {
        width: 750px;
        padding-left: 15px;
        padding-right: 15px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .wx-tip {
      background: rgba(0,0,0,0.8);
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .wx-tip-img {
      position: fixed;
      margin-top: 15px;
      right: 15px;
      width: 213px;
      height: 182px;
    }

    #android {
      margin: 0 auto;
    }


    .bg {
      background: linear-gradient(-43deg, #00B589 0%, #58DAAE 50%, #00B589 100%);
      height: 130px;
    }

    .content {
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
      margin-top: -85px;
    }

    .app-icon {
      background-color: #fff;
      width: 180px;
      height: 180px;
      border-radius: 25px;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
      display: flex;
      align-items: center;
      margin: 0 auto;
    }

    .app-icon img {
      width: 120px;
      height: 120px;
      border-radius: 30px;
      border: 1px solid #e5e5e5;
      margin: 0 auto;
    }

    .app-name {
      color: #333;
      text-align: center;
      font-size: 14px;
    }

    .app-name .name {
      font-size: 28px;
      margin-top: 15px;
      margin-bottom: 10px;
    }

    .app-name .info span {
      color: #666;
      margin-right: 10px;
    }

    .download-btn {
      text-align: center;
    }

    .download-btn > a {
      color: #fff;
      background: #00b589;
      height: 50px;
      padding: 0 30px;
      line-height: 48px;
      font-size: 18px;
      margin: 35px auto 15px;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      border: 0;
      outline: none;
      text-decoration: none;
    }

    .download-btn > a > span {
      display: inline-block;
      vertical-align: middle;
    }

    .download-btn .icondownload-o {
      font-size: 20px;
    }

    .apply-tip {
      text-align: center;
      color: #666;
      font-size: 14px;
    }

  }
</style>
