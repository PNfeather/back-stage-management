'use strict'
const devEnv = require('./dev.env')
module.exports = {
  NODE_ENV: '"production"',
  MOCK: 'false',
  BASE_URL: '"https://cjapi.ecaiedu.com/api"', // 后端接口地址
  // BASE_URL: '"http://10.0.2.252:8080/api"',
  XZDKF_ENTRANCE: '"https://www.ecaiedu.com/service/#/login"', // 客服入口
  CJIMGURL: '"https://cjfc-dev.oss-cn-shenzhen.aliyuncs.com/"', // oss地址
  CONFIG_NAME: '"cs"'
}
