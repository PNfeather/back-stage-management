import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const index = r => require.ensure([], () => r(require('@/page/index/index')), 'index');
const ios = r => require.ensure([], () => r(require('@/page/download/ios')), 'ios');
const android = r => require.ensure([], () => r(require('@/page/download/android')), 'android');
const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home');
const teachers = r => require.ensure([], () => r(require('@/page/account/teachers')), 'teachers');
const patriarch = r => require.ensure([], () => r(require('@/page/account/patriarch')), 'patriarch');
const students = r => require.ensure([], () => r(require('@/page/account/students')), 'students');
const service = r => require.ensure([], () => r(require('@/page/account/service')), 'service');
const classList = r => require.ensure([], () => r(require('@/page/schoolClass/classList')), 'classList');
const resourceList = r => require.ensure([], () => r(require('@/page/resource/resourceList')), 'resourceList');
const resourceDetail = r => require.ensure([], () => r(require('@/page/resource/resourceDetail')), 'resourceDetail');
const schoolDictionary = r => require.ensure([], () => r(require('@/page/dictionary/schoolDictionary')), 'schoolDictionary');
const tickling = r => require.ensure([], () => r(require('@/page/tickling/tickling')), 'tickling');
const ticklingDetail = r => require.ensure([], () => r(require('@/page/tickling/ticklingDetail')), 'ticklingDetail');

const routes = [
  {
    path: '*',
    redirect: 'index'
  },
  {
    path: '/',
    component: index
  },
  {
    path: '/ios-download',
    component: ios
  },
  {
    path: '/android-download',
    component: android
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/manage',
    component: manage,
    name: '',
    children: [
      {
        path: '',
        component: home,
        meta: []
      }, {
        path: '/teachers',
        component: teachers,
        meta: ['账号管理', '教师用户']
      }, {
        path: '/patriarch',
        component: patriarch,
        meta: ['账号管理', '家长用户']
      }, {
        path: '/students',
        component: students,
        meta: ['账号管理', '学生用户']
      }, {
        path: '/service',
        component: service,
        meta: ['账号管理', '客户用户']
      }, {
        path: '/classList',
        component: classList,
        meta: ['班级管理', '班级列表']
      }, {
        path: '/resourceList',
        component: resourceList,
        meta: ['资源管理', '资源列表']
      }, {
        path: '/resourceDetail',
        component: resourceDetail,
        meta: ['资源管理', '资源列表', '资源详情']
      }, {
        path: '/schoolDictionary',
        component: schoolDictionary,
        meta: ['字典管理', '学校字典']
      }, {
        path: '/tickling',
        component: tickling,
        meta: ['反馈信息', '反馈列表']
      }, {
        path: '/ticklingDetail',
        component: ticklingDetail,
        meta: ['反馈信息', '反馈列表', '反馈详情']
      }
    ]
  }
];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});
