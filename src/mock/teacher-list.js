import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = 821;
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'id': Random.integer(10000, 99999),
    'account': Random.integer(10000, 99999),
    'name': Random.name(true),
    'mobile': '138' + Random.integer(10000000, 99999999),
    'classes': [
      {'schoolName': Random.cname() + '小学'},
      {'schoolName': Random.cname() + '小学'}
    ], // 班级信息
    'status': 0 // 0正常1禁用2删除
  };
  list.push(template);
}

Mock.mock(beseUrl + '/teacher-list', 'post', (options) => {
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
