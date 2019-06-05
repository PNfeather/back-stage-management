import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

Mock.mock(beseUrl + '/logout', 'get', () => {
  return {
    'code': 0,
    'data': '1',
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
