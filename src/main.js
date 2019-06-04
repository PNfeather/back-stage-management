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

process.env.MOCK && require('@/mock');

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
