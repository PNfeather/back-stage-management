import {Http} from '@/plugins/http';
import qs from 'qs';

export const getList = data => Http.post('/school/list', data);
export const createSchool = data => Http.post('/school/create', data);
export const deleteSchool = data => Http.delete('/school/delete', {params: data});
export const updateSchool = data => Http.patch('/school/update', data);
