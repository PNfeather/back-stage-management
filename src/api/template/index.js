import {Http} from '@/plugins/http';

export const getList = data => Http.post('/book/list', data);
export const deleteResource = bookId => Http.delete('/book/' + bookId);
export const getTemplateDetail = (bookId) => Http.get('/book/' + bookId);
