import Axios from 'axios'
import router from '@/router'
import store from '@/store/store'
//线上请求前缀
var root = process.env.API_ROOT;
const axios = Axios.create();
import { Dialog } from 'vant';
let cancel ,promiseArr = {} 
/*设置 axios拦截器=>是否登录*/
axios.interceptors.request.use(
	config => {
		//请求之前重新拼装url
//		config.url = root + config.url;
		config.baseURL = '/api' // 本地环境axios => 在config文件夹-index.js设置请求的域名
		config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
		config.timeout = 1000 // 超时时间
		let token = localStorage.getItem('Authorization');
		if(token) {
			config.headers = {
				'Authorization': token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		 //发起请求时，取消掉当前正在进行的相同请求
		 if (promiseArr[config.url]) {
			promiseArr[config.url]('操作取消')
			promiseArr[config.url] = cancel
		} else {
			promiseArr[config.url] = cancel
		}
		return config
	},
	error => {
		return Promise.reject(error)
	})

// http response 拦截器 //响应拦截器即异常处理
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
		if(error && error.response) {
			switch(error.response.status) {
				case 400:
					error.message = '错误请求'
					break;
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
				   break;
				case 403:
					error.message = '拒绝访问'
					break;
				case 404:
					error.message = '请求错误，未找到该资源'
					break;
				case 405:
					error.message = '请求方法未允许'
					break;
				case 408:
					error.message = '请求超时'
					break;
				case 500:
					error.message = '服务端出错'
					// Dialog.alert({
					// 	message: '服务端出错'
					// }).then(() => {
					// 	$router.go(-1)
					// })
					break;
				case 501:
					error.message = '网络未实现'
					break;
				case 502:
					error.message = '网络错误'
					break;
				case 503:
					error.message = '服务不可用'
					break;
				case 504:
					error.message = '网络超时'
					break;
				case 505:
					error.message = 'http版本不支持该请求'
					break;
				default:
					error.message = `链接错误${error.response.status}`
				
			}
		}else{
			error.message = '网络出现问题，请稍后再试'
		}
		return Promise.reject(error.response.data)
	});

export default axios;