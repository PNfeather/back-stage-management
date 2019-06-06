import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

Mock.mock(baseUrl + '/user/customer-service-create', 'post', (options) => {
  let params = JSON.parse(options.body);
  return {
    'code': 0,
    'data': params,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
