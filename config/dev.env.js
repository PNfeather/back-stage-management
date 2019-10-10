'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOCK: 'true',
  // BASE_URL: '"/api"'
  BASE_URL: '"https://devapi.ecaiedu.com/api"',
  // BASE_URL: '"http://10.0.2.88:8080/api"',
  XZDKF_ENTRANCE: '"https://www.ecaiedu.com/service/#/login"', // 客服入口
  CJIMGURL: '"https://cjfc-dev.oss-cn-shenzhen.aliyuncs.com/"',
  CONFIG_NAME: '"csdev"'
})
