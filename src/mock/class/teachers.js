import Mock from 'mockjs'; // 引入mockjs

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = Random.integer(2, 4);
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'mobile': 134 + Random.integer(10000000, 99999999),
    'name': Random.cname()
  };
  list.push(template);
}

Mock.mock(/(\/class\/)[\w\W]*(\/teachers)$/, 'get', (options) => {
  let params = JSON.parse(options.body);
  console.log(params);
  return {
    'code': 0,
    'data': list,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
