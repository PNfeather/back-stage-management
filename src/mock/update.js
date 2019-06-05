import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

Mock.mock(beseUrl + '/update', 'patch', (options) => {
  let params = JSON.parse(options.body);
  return {
    'code': 0,
    'data': params,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
