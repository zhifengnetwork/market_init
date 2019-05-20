import Axios from 'axios'
import router from '@/router'
import store from '@/store/store'

var root = process.env.API_ROOT;
const axios = Axios.create();
import { Dialog } from 'vant';
/*设置 axios拦截器=>是否登录*/
axios.interceptors.request.use(
	config => {
		//请求之前重新拼装url
		config.url = root + config.url;
//		config.baseURL = '/api' // 在config文件夹-index.js设置请求的域名
		config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
		config.timeout = 1000 // 超时时间
		let token = localStorage.getItem('Authorization');
		if(token) {
			config.headers = {
				'Authorization': token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	})

// http response 拦截器
axios.interceptors.response.use(
	response => {
		if(response.data.status === -1) {
			Dialog.alert({
				message: '登录过期，请重新登录'
			}).then(() => {
				store.commit('del_token'); //token过期，清除它
				router.replace({ //跳转到登录页面
					path: '/login',
					query: {
						redirect: router.currentRoute.fullPath
					}
				})
			})
		}
		return response;
	},
	error => {
		if(error.response) {
			switch(error.response.status) {
				case 401:
					Dialog.alert({
						message: '登录过期，请重新登录'
					}).then(() => {
						store.commit('del_token'); //可能是token过期，清除它
						router.replace({ //跳转到登录页面
							path: '/login',
							query: {
								redirect: router.currentRoute.fullPath
							}
						})
					})

			}
		}
		return Promise.reject(error.response.data)
	});

export default axios;