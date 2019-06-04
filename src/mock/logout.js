import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

Mock.mock(beseUrl + '/logout', 'get', () => {
  return {
    'resultCode': '000000',
    'resultData': '1',
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据
