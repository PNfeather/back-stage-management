import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

Mock.mock(beseUrl + '/deleteTeacher', 'get', (options) => {
  let params = JSON.parse(options.body);
  let userId = params.userId;
  return {
    'resultCode': '000000',
    'resultData': userId,
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据
