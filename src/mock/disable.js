import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

Mock.mock(beseUrl + '/disable', 'patch', (options) => {
  let params = JSON.parse(options.body);
  let id = params.id;
  return {
    'code': 0,
    'data': id,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
