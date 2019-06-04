import {Http} from '@/plugins/http';

export const login = data => Http.get('/login', {data: data});
