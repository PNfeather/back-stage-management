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
require('es6-promise').polyfill();

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@IMG/loading.jpg'),
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
});

(process.env.BASE_URL == '/api') && process.env.MOCK && require('@/mock');

Vue.prototype.$CJIMGURL = process.env.CJIMGURL;
Vue.prototype.$XZDKF_ENTRANCE = process.env.XZDKF_ENTRANCE;
Vue.prototype.$XZDHT_ENTRANCE = process.env.XZDHT_ENTRANCE;

Vue.use(http.install);

Vue.use(ElementUI);

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
