'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {},
    proxyTable: {
		  "/api": {
        target: "http://api.zhifengwangluo.c3w.cc",//接口的域名
        // target: "http://api.zfwl.c3w.cc",//接口的域名
		    // target: "http://localhost:8888",//接口的域名
		    //secure: false,  //如果是https接口，需要配置这个参数
		    changeOrigin: true, //如果接口跨域，需要进行这个参数配置
		    pathRewrite: {
		    	// "^/api" : "/static/mock"}
		    	"^/api" : "/"}
		  }
		},

    // Various Dev Server settings
<<<<<<< HEAD
    host: '192.168.1.41', // can be overwritten by process.env.HOST
=======
    host: '192.168.1.12', // can be overwritten by process.env.HOST
>>>>>>> a1441a0099105d94ac8dbf92f6fdec7319801a33
    port: 8888, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 静态资源输出到二级目录下
    assetsSubDirectory: 'static',
    // 静态资源cdn地址
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
