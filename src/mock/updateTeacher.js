import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

Mock.mock(beseUrl + '/updateTeacher', 'post', (options) => {
  let params = JSON.parse(options.body);
  console.log(params);
  return {
    'resultCode': '000000',
    'resultData': params,
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据
