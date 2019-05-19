import axios from 'axios'
import apiURL from './api.js'
import router from '../router'
import store from '../store/store'

import { Dialog } from 'vant';



// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = apiURL;  // 默认地址
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// http://api.zfwl.c3w.cc/api/goods/goodsDetail
// http://192.168.3.71:8888/api/goods/goodsDetail
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
config => {

    if (localStorage.getItem('Authorization')) {  //如果存在token

      //每个请求头加上token
      config.headers.Authorization = localStorage.getItem('Authorization');

    }
   
    return config;
},

error => {
    
    return Promise.reject(error);
});  

// http response 拦截器
axios.interceptors.response.use(
  response => {
   if(response.data.status ===  -1){
      Dialog.alert({
        message:'登录过期，请重新登录'
      }).then(()=>{
      store.commit('del_token'); //token过期，清除它
      router.replace({ //跳转到登录页面
      path: '/login',
      query: { redirect: router.currentRoute.fullPath } 
      })
      })
   }
  return response;
  },
  error => {
  if (error.response) {
  switch (error.response.status) {
  case 401:
        Dialog.alert({
          message:'登录过期，请重新登录'
        }).then(()=>{
        store.commit('del_token'); //可能是token过期，清除它
        router.replace({ //跳转到登录页面
        path: '/login',
        query: { redirect: router.currentRoute.fullPath } 
        })
        })
        
  }
  }
  return Promise.reject(error.response.data)
  });


    export default axios;
