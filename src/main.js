// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'

import 'lib-flexible/flexible.js' 


// 引入全部组件
import Mint from 'mint-ui';
Vue.use(Mint);

import { Spinner } from 'mint-ui';

import store from './store/store'

// 导入vant所有组件
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

import { ImagePreview } from 'vant';

Vue.use(ImagePreview);
//Popup 弹出层
import { Popup } from 'vant';
Vue.use(Popup);

Vue
  .use(GoodsAction)
  .use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn);
Vue.component(Spinner.name, Spinner);

// 优惠券
import { CouponCell, CouponList } from 'vant';
Vue.use(CouponCell).use(CouponList);

//mint 时间
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

import { Swipe, SwipeItem, MessageBox } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(MessageBox.name, MessageBox);

// 单选框 
import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

// Toast 轻提示
import { Toast } from 'vant';
Vue.use(Toast);

Vue.component(Spinner.name, Spinner);


//字体图标css
import '../static/css/font/iconfont.css'



Vue.prototype.url = 'http://api.zhifengwangluo.c3w.cc/upload/images/'

//全局获取倒计时
Vue.prototype.timeCountdown = function (obj){
  const TIME_COUNT = 60; //默认倒计时秒数

  if (!obj.timer) {
      obj.waitTime = TIME_COUNT;
      obj.canGet = false;
      obj.timer = setInterval(() => {
          if (obj.waitTime>0 && obj.waitTime<=TIME_COUNT) {
              obj.waitTime--;
          }else{
              obj.canGet = true;
              clearInterval(obj.timer); //清空定时器
              obj.timer = null;
          }
      }, 1000)
  }
  return {
      timer: obj.timer,
      canGet: obj.canGet,
      waitTime: obj.waitTime
  }
}

//引入axios库
import axios from "./axios/request";
// //注册组件
Vue.prototype.$axios = axios;


/* 设置为 false 以阻止 vue 在启动时生成生产提示。 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
	template: '<App/>'
})
