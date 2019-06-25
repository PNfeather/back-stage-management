import {Http} from '@/plugins/http';

export const getList = data => Http.post('/school/list', data);
export const createSchool = data => Http.post('/school/create', data);
export const deleteSchool = schoolId => Http.delete('/school/' + schoolId);
export const updateSchool = data => Http.patch('/school/update', data);
