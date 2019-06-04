import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage/manage')), 'manage');

const routes = [
  {
    path: '/',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    children: []
  }
];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});
