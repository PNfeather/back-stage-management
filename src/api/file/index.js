import {Http} from '@/plugins/http';

// 获取app版本
export const getAppVersion = type => Http.get('/file/app-version/' + type); // 暂定type  0:android 1:ios
// 获取android版本列表
export const getAndroidList = data => Http.post('/android-app/list', data);
// android上传app
export const uploadAndroid = data => Http.post('/android-app/upload', data, {headers: {'Content-Type': 'multipart/form-data'}});
