import {Http} from '@/plugins/http';
import qs from 'qs';

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
export const deleteAccount = data => Http.delete('/user/delete', {params: data});
// 用户禁用
export const disableAccount = data => Http.patch('/user/disable', qs.stringify(data));
// 用户修改(用户类型: 0学生1家长2客服3教师4管理员)
export const updateAccount = data => Http.patch('/user/update', data);
