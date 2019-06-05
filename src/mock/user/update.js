import Mock from 'mockjs'; // 引入mockjs

let baseUrl = window.location.origin + '/apis';

Mock.mock(baseUrl + '/user/update', 'patch', (options) => {
  let params = JSON.parse(options.body);
  return {
    'code': 0,
    'data': params,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
