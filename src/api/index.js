import {Http} from '@/plugins/http';

export const login = data => Http.post('/login', data);
export const logout = () => Http.get('/logout');
export const getTeachersList = data => Http.post('/teacher-list', data);
export const getGuardianList = data => Http.post('/guardian-list', data);
export const getStudengList = data => Http.post('/student-list', data);
export const getServiceList = data => Http.post('/customer-service-list', data);
export const deleteAccount = data => Http.delete('/delete', {data: data});
export const disableAccount = data => Http.patch('/disable', data);
export const updateAccount = data => Http.patch('/update', data);
