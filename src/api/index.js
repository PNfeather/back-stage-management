import {Http} from '@/plugins/http';

export const login = data => Http.post('/login', data);
export const logout = () => Http.get('/logout');
export const getTeachersList = data => Http.post('/teacher-list', data);
export const deleteAccount = data => Http.delete('/delete', {data: data});
export const disableAccount = data => Http.patch('/disable', data);
export const updateAccount = data => Http.patch('/update', data);
