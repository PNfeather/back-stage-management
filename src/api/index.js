import {Http} from '@/plugins/http';

export const login = data => Http.get('/login', {data: data});
export const logout = () => Http.get('/logout');
export const getTeachersList = data => Http.get('/getTeachersList', {data: data});
export const deleteTeacher = data => Http.get('/deleteTeacher', {data: data});
export const displayTeacher = data => Http.get('/displayTeacher', {data: data});
export const updateTeacher = data => Http.post('/getTeachersList', data);
