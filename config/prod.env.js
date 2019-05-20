'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  API_ROOT: '"http://api.zhifengwangluo.com"'   //线上请求前缀
})