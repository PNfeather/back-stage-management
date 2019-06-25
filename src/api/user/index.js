import {Http} from '@/plugins/http';

// 登录
export const login = data => Http.post('/user/login', data);
// 登出
export const logout = () => Http.get('/user/logout');
// 教师列表
export const getTeachersList = data => Http.post('/user/teacher-list', data);
// 家长列表
export const getGuardianList = data => Http.post('/user/guardian-list', data);
// 学生列表
export const getStudengList = data => Http.post('/user/student-list', data);
// 客服列表
export const getServiceList = data => Http.post('/user/customer-service-list', data);
// 新增客服
export const createService = data => Http.post('/user/customer-service-create', data);
// 用户删除
export const deleteAccount = userId => Http.delete('/user/' + userId + '/delete');
// 用户禁用
export const disableAccount = userId => Http.post('/user/' + userId + '/disable');
// 用户启用
export const enableAccount = userId => Http.post('/user/' + userId + '/enable');
// 用户修改(用户类型: 0学生1家长2客服3教师4管理员)
export const updateAccount = data => Http.post('/user/update', data);
