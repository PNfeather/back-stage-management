import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = 211;
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'content': Random.csentence(100, 1000),
    'feedbackTime': '2019-06-06T11:49:51.026Z',
    'id': Random.integer(10000, 99999),
    'status': 0,
    'userId': Random.integer(10000, 99999),
    'userName': Random.cname(true),
    'userType': '教师'
  };
  list.push(template);
}

Mock.mock(baseUrl + '/feedback/list', 'get', (options) => {
  let params = JSON.parse(options.body);
  let skip = params.skip;
  let limit = params.limit;
  let start = skip;
  let end = skip + limit;
  let result = [];
  (start < 0) && (start = 0);
  (end > list.length - 1) && (end = list.length);
  for (let i = start; i < end; i++) {
    result.push(list[i]);
  }
  return {
    'code': 0,
    'data': result,
    'message': 'success',
    'page': 0,
    'pageCount': 0,
    'pageSize': 0,
    'total': total
  };
}); // 根据数据模板生成模拟数据
