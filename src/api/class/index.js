import {Http} from '@/plugins/http';

export const getList = data => Http.post('/class/list', data);
export const getStudents = classId => Http.get('/class/' + classId + '/students');
export const getTeachers = classId => Http.get('/class/' + classId + '/teachers');
export const disableClass = classId => Http.get('/class/' + classId + '/disable');
export const enableClass = classId => Http.get('/class/' + classId + '/enable');
