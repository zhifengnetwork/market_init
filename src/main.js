// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import 'mint-ui/lib/style.css'

import 'lib-flexible/flexible.js'
=======
import'mint-ui/lib/style.css'
import { Spinner } from 'mint-ui';

Vue.component(Spinner.name, Spinner);
>>>>>>> f6a0a8a4f905f54cfc128b1af79f3a12b1ac2dc1


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
