import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

Mock.mock(baseUrl + '/user/disable', 'patch', (options) => {
  let params = JSON.parse(options.body);
  let id = params.id;
  return {
    'code': 0,
    'data': id,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
