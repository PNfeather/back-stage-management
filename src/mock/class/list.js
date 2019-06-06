import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = 225;
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'classCode': Random.integer(10000, 99999),
    'creatorId': Random.integer(10000, 99999),
    'creatorMobile': 134 + Random.integer(10000000, 99999999),
    'creatorName': Random.cname(),
    'gradeId': Random.integer(10000, 99999),
    'gradeName': '五年级',
    'id': Random.integer(10000, 99999),
    'name': '历史班',
    'schoolId': Random.integer(10000, 99999),
    'schoolName': Random.cword(2, 4) + '小学',
    'status': 0,
    'studentCount': Random.integer(30, 50),
    'teacherCount': Random.integer(3, 5),
    'type': 0
  };
  list.push(template);
}

Mock.mock(baseUrl + '/class/list', 'post', (options) => {
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
