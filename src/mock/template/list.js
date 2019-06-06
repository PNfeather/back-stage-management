import Mock from 'mockjs'; // 引入mockjs

let baseUrl = process.env.BASE_URL;

// console.log(process.env.BASE_URL);

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = 333;
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'createdAt': '2019-06-05T11:37:37.911Z',
    'creatorId': Random.integer(10000, 99999),
    'creatorMobile': '138' + Random.integer(10000000, 99999999),
    'creatorName': Random.name(true),
    'id': Random.integer(10000, 99999),
    'name': Random.name(true),
    'pageNum': Random.integer(10, 99),
    'status': 0,
    'templates': [
      {
        'height': 0,
        'id': 0,
        'questionSigns': [
          {
            'height': 0,
            'left': 0,
            'result': 0,
            'rightCount': 0,
            'status': 0,
            'top': 0,
            'width': 0
          }
        ],
        'status': 0,
        'studentUrl': 'string',
        'url': 'string',
        'width': 0
      }
    ],
    'updatedAt': '2019-06-05T11:37:37.911Z'
  };
  list.push(template);
}

Mock.mock(baseUrl + '/template/list', 'post', (options) => {
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
