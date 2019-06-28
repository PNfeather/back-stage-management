import {Http} from '@/plugins/http';

export const getList = data => Http.post('/admin/class/list', data);
export const getStudents = classId => Http.get('/admin/class/' + classId + '/students');
export const getTeachers = classId => Http.get('/admin/class/' + classId + '/teachers');
export const disableClass = classId => Http.get('/admin/class/' + classId + '/disable');
export const enableClass = classId => Http.get('/admin/class/' + classId + '/enable');
