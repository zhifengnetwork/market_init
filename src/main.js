// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'

import 'lib-flexible/flexible.js'
import { Spinner } from 'mint-ui';

import Mint from 'mint-ui';
Vue.use(Mint);
// vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
// 提交订单
import { Sku } from 'vant';
Vue.use(Sku);


Vue.component(Spinner.name, Spinner);


//引入axios库
import axios from "axios";
//注册组件
Vue.prototype.axios = axios;


/* 设置为 false 以阻止 vue 在启动时生成生产提示。 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	components: { App },
	template: '<App/>'
})
