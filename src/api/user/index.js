import {Http} from '@/plugins/http';

// 登录
export const login = data => Http.post('/admin/user/login', data);
// 登出
export const logout = () => Http.delete('/admin/user');
// 教师列表
export const getTeachersList = data => Http.post('/admin/user/teacher-list', data);
// 家长列表
export const getGuardianList = data => Http.post('/admin/user/guardian-list', data);
// 学生列表
export const getStudengList = data => Http.post('/admin/user/student-list', data);
// 客服列表
export const getServiceList = data => Http.post('/admin/user/customer-service-list', data);
// 查询所有客服
export const getAllService = () => Http.get('/admin/user/all-service');
// 新增客服
export const createService = data => Http.post('/admin/user/customer-service-create', data);
// 用户删除
export const deleteAccount = userId => Http.delete('/admin/user/' + userId + '/delete');
// 用户禁用
export const disableAccount = userId => Http.post('/admin/user/' + userId + '/disable');
// 用户启用
export const enableAccount = userId => Http.post('/admin/user/' + userId + '/enable');
// 用户修改(用户类型: 0学生1家长2客服3教师4管理员)
export const updateAccount = data => Http.post('/admin/user/update', data);
