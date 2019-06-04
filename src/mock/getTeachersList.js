import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random;

let data = []; // 用于接受生成数据的数组
let total = 821;
for (let i = 0; i < total; i++) { // 可自定义生成的个数
  let template = {
    'userId': Random.integer(10000, 99999),
    'name': Random.name(true),
    'cellphone': '138' + Random.integer(10000000, 99999999),
    'school': Random.cname() + '小学',
    'using': 'success'
  };
  data.push(template);
}

Mock.mock(beseUrl + '/getTeachersList', 'get', (options) => {
  let params = JSON.parse(options.body);
  let pageSize = params.pageSize;
  let pageNum = params.pageNum;
  let start = (pageNum - 1) * pageSize;
  let end = start + pageSize;
  let result = [];
  (start < 0) && (start = 0);
  (end > data.length - 1) && (end = data.length);
  for (let i = start; i < end; i++) {
    result.push(data[i]);
  }
  return {
    'resultCode': '000000',
    'resultData': {
      count: total,
      list: result
    },
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据
