// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'

import 'lib-flexible/flexible.js' 
import { Spinner } from 'mint-ui';

// vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

// 商品导航
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';
Vue
  .use(GoodsAction)
  .use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn);

// 优惠券
import { CouponCell, CouponList } from 'vant';
Vue.use(CouponCell).use(CouponList);

import { Radio } from 'mint-ui';
Vue.component(Radio.name, Radio);

//css
import '../static/css/font/iconfont.css'

Vue.component(Spinner.name, Spinner);


//字体图标css
import '../static/css/font/iconfont.css'

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
