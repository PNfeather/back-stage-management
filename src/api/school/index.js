import {Http} from '@/plugins/http';

export const getList = data => Http.post('/school/list', data);
export const createSchool = data => Http.post('/school/create', data);
export const deleteSchool = data => Http.delete('/school/delete', {data: data});
export const updateSchool = data => Http.patch('/school/update', data);
