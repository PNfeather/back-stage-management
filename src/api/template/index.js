import {Http} from '@/plugins/http';

export const getList = data => Http.post('/admin/book/list', data);
export const deleteResource = bookId => Http.delete('/admin/book/' + bookId);
export const getTemplateDetail = (bookId) => Http.get('/admin/book/' + bookId);
