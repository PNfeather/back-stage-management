// require('@/mock/example');
require('@/mock/login');
require('@/mock/logout');
// require('@/mock/customer-service-list');
require('@/mock/guardian-list');
// require('@/mock/student-list');
require('@/mock/teacher-list');
require('@/mock/delete');
require('@/mock/disable');
require('@/mock/update');

const Mock = require('mockjs');

Mock.setup({
  timeout: '200-600'
});
