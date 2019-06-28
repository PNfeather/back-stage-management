'use strict'
const devEnv = require('./dev.env')
module.exports = {
  NODE_ENV: '"production"',
  MOCK: 'false',
  BASE_URL: '"https://cjapi.ecaiedu.com/api"', // 后端接口地址
  XZDKF_ENTRANCE: '"http://www.ecaiedu.com/service/#/login"', // 客服入口
  CJIMGURL: '"https://cjfc-dev.oss-cn-shenzhen.aliyuncs.com/"' // oss地址
}
