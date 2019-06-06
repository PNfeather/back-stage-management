import {Http} from '@/plugins/http';

export const getList = data => Http.post('/class/list', data);
export const getStudents = classId => Http.get('/class/' + classId + '/students');
export const getTeachers = classId => Http.get('/class/' + classId + '/teachers');
