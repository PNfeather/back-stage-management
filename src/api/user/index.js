import {Http} from '@/plugins/http';

export const login = data => Http.post('/user/login', data);
export const logout = () => Http.get('/user/logout');
export const getTeachersList = data => Http.post('/user/teacher-list', data);
export const getGuardianList = data => Http.post('/user/guardian-list', data);
export const getStudengList = data => Http.post('/user/student-list', data);
export const getServiceList = data => Http.post('/user/customer-service-list', data);
export const deleteAccount = data => Http.delete('/user/delete', {data: data});
export const disableAccount = data => Http.patch('/user/disable', data);
export const updateAccount = data => Http.patch('/user/update', data);
