// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import http from '@/plugins/http';
import store from './store/';
import ElementUI from 'element-ui';
import HeadTop from '@C/headTop';
import 'element-ui/lib/theme-default/index.css';
import VueLazyload from 'vue-lazyload';
import VueClipboard from 'vue-clipboard2';
import Vconsole from 'vconsole';
require('es6-promise').polyfill();

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@IMG/loading.jpg'),
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
});

(process.env.BASE_URL == '/api') && process.env.MOCK && require('@/mock');

if (process.env.VCONSOLE) {
  /* eslint-disable no-new */
  const vConsole = new Vconsole();
  Vue.use(vConsole);
}

Vue.prototype.$CJIMGURL = process.env.CJIMGURL;
Vue.prototype.$OSSIMGADJUST = '?x-oss-process=image/auto-orient,1'; // oss图片自动旋正
Vue.prototype.$OSSIMGADJUSTMINI = '?x-oss-process=image/resize,w_200,auto-orient,1'; // oss图片自动旋正并缩略200比例
Vue.prototype.$XZDKF_ENTRANCE = process.env.XZDKF_ENTRANCE;
Vue.prototype.$ENVCONFIGNAME = process.env.CONFIG_NAME;

ElementUI.Dialog.props.closeOnClickModal.default = false; // element-ui点击遮罩默认不关闭弹框

Vue.use(http.install);

Vue.use(ElementUI);

Vue.use(VueClipboard);

Vue.component(HeadTop.name, HeadTop);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
