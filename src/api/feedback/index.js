import {Http} from '@/plugins/http';

export const getList = (data) => Http.get('/feedback/list', {params: data});
