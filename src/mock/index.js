require('@/mock/example');
require('@/mock/login');
require('@/mock/logout');
require('@/mock/getTeachersList');
require('@/mock/deleteTeacher');
require('@/mock/displayTeacher');
require('@/mock/updateTeacher');

const Mock = require('mockjs');

Mock.setup({
  timeout: '200-600'
});
