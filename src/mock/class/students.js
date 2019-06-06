import Mock from 'mockjs'; // 引入mockjs

const Random = Mock.Random;

let list = []; // 用于接受生成数据的数组
let total = Random.integer(40, 50);
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'account': Random.integer(10000, 99999),
    'name': Random.cname()
  };
  list.push(template);
}

Mock.mock(/(\/class\/)[\w\W]*(\/students)$/, 'get', (options) => {
  let params = JSON.parse(options.body);
  console.log(params);
  return {
    'code': 0,
    'data': list,
    'message': 'success'
  };
}); // 根据数据模板生成模拟数据
