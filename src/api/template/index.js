import {Http} from '@/plugins/http';

export const getList = data => Http.post('/template/list', data);
export const deleteResource = data => Http.delete('/template/delete', {data: data});
export const getTemplateDetail = (bookId) => Http.get('/template/' + bookId + '/template-book-detail');
