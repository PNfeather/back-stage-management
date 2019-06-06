import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = 125;
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'city': Random.city(),
    'district': Random.cword(2, 3) + '区',
    'id': Random.integer(10000, 99999),
    'name': Random.cword(2, 5) + '小学',
    'province': Random.province(),
    'simpleName': Random.cword(1, 2) + '小',
    'status': 0
  };
  list.push(template);
}

Mock.mock(baseUrl + '/school/list', 'post', (options) => {
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
