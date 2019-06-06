// require('@/mock/example');
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

require('./template/list');
require('./template/delete');
require('./template/template-book-detail');

const Mock = require('mockjs');

Mock.setup({
  timeout: '200-600'
});
