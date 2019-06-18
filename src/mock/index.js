// require('@/mock/example');

// 用户模块
require('./user/login');
require('./user/logout');
require('./user/customer-service-list');
require('./user/customer-service-create');
require('./user/guardian-list');
require('./user/student-list');
require('./user/teacher-list');
require('./user/delete');
require('./user/disable');
require('./user/update');

// 班级模块
require('./class/list');
require('./class/students');
require('./class/teachers');

// 资源模块
require('./template/list');
require('./template/delete');
require('./template/template-book-detail');

// 学校模块
require('./school/list');
require('./school/delete');
require('./school/update');
require('./school/create');

// 反馈
require('./feedback/list');

const Mock = require('mockjs');

Mock.setup({
  timeout: '200-600'
});
