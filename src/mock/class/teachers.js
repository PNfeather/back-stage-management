import Mock from 'mockjs'; // 引入mockjs

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = 40;
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'height': 0,
    'id': 0,
    'questionSign': 'string',
    'url': Random.image('250x300', '#fb0a2a')
  };
  list.push(template);
}

Mock.mock(/(\/class\/)[\w\W]*(\/students)$/, 'get', () => {
  let result = {
    'width': 0,
    'bookId': Random.integer(10000, 99999),
    'bookName': Random.name(true),
    'templatePages': list
  };
  return {
    'code': 0,
    'data': result,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
