import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home');
const teachers = r => require.ensure([], () => r(require('@/page/account/teachers')), 'teachers');
const patriarch = r => require.ensure([], () => r(require('@/page/account/patriarch')), 'patriarch');
const students = r => require.ensure([], () => r(require('@/page/account/students')), 'students');
const service = r => require.ensure([], () => r(require('@/page/account/service')), 'service');
const classList = r => require.ensure([], () => r(require('@/page/schoolClass/classList')), 'classList');
const taskList = r => require.ensure([], () => r(require('@/page/task/taskList')), 'taskList');
const resourceList = r => require.ensure([], () => r(require('@/page/resource/resourceList')), 'resourceList');
const schoolDictionary = r => require.ensure([], () => r(require('@/page/dictionary/schoolDictionary')), 'schoolDictionary');
const tickling = r => require.ensure([], () => r(require('@/page/tickling/tickling')), 'tickling');

const routes = [
  {
    path: '/',
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
        path: '/taskList',
        component: taskList,
        meta: ['作业管理', '作业列表']
      }, {
        path: '/resourceList',
        component: resourceList,
        meta: ['资源管理', '查看资源']
      }, {
        path: '/schoolDictionary',
        component: schoolDictionary,
        meta: ['字典管理', '学校字典']
      }, {
        path: '/tickling',
        component: tickling,
        meta: ['反馈信息', '反馈信息详情']
      }
    ]
  }
];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});
