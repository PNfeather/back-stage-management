import {Http} from '@/plugins/http';

export const getList = data => Http.post('/admin/school/list', data);
export const createSchool = data => Http.post('/admin/school/create', data);
export const deleteSchool = schoolId => Http.delete('/admin/school/' + schoolId);
export const updateSchool = data => Http.patch('/admin/school/update', data);
