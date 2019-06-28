import {Http} from '@/plugins/http';

// 获取app版本
export const getAppVersion = type => Http.get('/file/app-version/' + type); // 暂定type  0:android 1:ios
