import Vue from 'vue'
import Router from 'vue-router'

// 注册模块
import login from '@/components/login/login'
import register from '@/components/login/register'
import forget from '@/components/login/forget'
// 首页
import home from '@/components/home/home'

import { Dialog } from 'vant';

// 商品分类
import classify from '@/components/classify/classify'

// 商品详情
import details from '@/components/goods/details'

// 购物车
import cart from '@/components/cart/cart'

// 个人中心
import user from '@/components/user/user'

// 订单页
import order from '@/components/order/order'

// 订单详情
import orderDetails from '@/components/order/orderDetails'

// 我的优惠券
import coupon from '@/components/user/my/coupon'

// 我的收藏 
import collection from '@/components/user/my/collection'

// 确认订单
import confirmOrder from '@/components/pay/confirmOrder'


//商品评价 
import evaluate from '@/components/goods/details/evaluate'

//发布评价
import appraise from '@/components/user/my/publishApp'

//个人信息
import userinfo from '@/components/user/my/userinfo'

//个人地址管理
import site from '@/components/user/my/site'

//添加地址
import addressAct from '@/components/user/my/addressAct'

//账号安全
import changePwd from '@/components/user/my/changePwd'

//商品列表
import productLsit from '@/components/goods/productList/product'

//商品售后
import afterSale from '@/components/order/afterSale'

//商品售后详情
import afterDetails from '@/components/order/afterDetails'

// 支付成功
import paySucceed from '@/components/pay/paySucceed'

// 支付失败
import payFail from '@/components/pay/payFail'

// 绑定用户信息
import bindingMsg from '@/components/user/my/bindingMsg'

//搜索
import search from '@/components/home/search'




Vue.use(Router)

const router = new Router({
	/*路由模式*/
	mode: 'hash',
  	routes: [
	    {
	    	path: '/',
		    name: 'login',
		    redirect: '/login', /**重定向**/
		    /*component: login*/
			 component: (resolve) => require(['@/components/login/login.vue'],resolve)
		},
		//登录
	    {
	    	path: '/login', 
			component: (resolve) => require(['@/components/login/login.vue'],resolve)
	      
		},
		//注册
	    {
	    	path: '/register',
	    	name: 'register',
			component: (resolve) => require(['@/components/login/register'],resolve)
	    	
		},
		//找回密码
	    {
	    	path: '/forget',
	    	name: 'forget',
			 component: (resolve) => require(['@/components/login/forget'],resolve)
		},
		// 首页
		{
			path:'/home',
			name: 'home',
			component: (resolve) => require(['@/components/home/home'],resolve),
			meta:{requireAuth:true}
		},
		// 分类
		{
			path:'/classify',
			name: 'classify',
			component: (resolve) => require(['@/components/classify/classify'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 商品详情
		{
			path:'/details',
			name:'details',
			component: (resolve) => require(['@/components/goods/details'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 购物车
		{
			path:'/cart',
			name: 'cart',
			component: (resolve) => require(['@/components/cart/cart'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 用户中心
		{
			path:'/user',
			name: 'user',
			component: (resolve) => require(['@/components/user/user'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 订单
		{
			path:'/order',
			name: 'order',
			component: (resolve) => require(['@/components/order/order'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 订单详情
		{
			path: '/orderDetails', 
			name: 'orderDetails', 
			component: (resolve) => require(['@/components/order/orderDetails'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 我的优惠券
		{
			path:'/my/coupon',
			name: 'coupon',
			component: (resolve) => require(['@/components/user/my/coupon'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 我的收藏
		{
			path:'/collection',
			name:'collection',
			component: (resolve) => require(['@/components/user/my/collection'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//商品评价
		{
			path:'/details/evaluate',
			name:'evaluate',
			component: (resolve) => require(['@/components/goods/details/evaluate'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//发布评价
		{
			path:'/my/appraise',
			name:'appraise',
			component: (resolve) => require(['@/components/user/my/publishApp'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 确认订单
		{
			path:'/confirmOrder',
			name: 'confirmOrder',
			component: (resolve) => require(['@/components/pay/confirmOrder'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//个人信息
		{
			path:'/my/userinfo',
			name: 'userinfo',
			component: (resolve) => require(['@/components/user/my/userinfo'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//个人地址管理
		{
			path:'/my/site',
			name: 'site',
			component: (resolve) => require(['@/components/user/my/site'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//添加地址
		{
			path:'/my/addressAct',
			name: 'addressAct',
			component: (resolve) => require(['@/components/user/my/addressAct'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//账号安全
		{
			path:'/my/changePwd',
			name: 'changePwd',
			component: (resolve) => require(['@/components/user/my/changePwd'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//商品列表
		{
			path:'/productLsit',
			name: 'productLsit',
			component: (resolve) => require(['@/components/goods/productList/product'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//  退款/售后
		{
			path:'/order/afterSale',
			name: 'afterSale',
			component: (resolve) => require(['@/components/order/afterSale'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		//  售后详情
		{
			path:'/afterSale/afterDetails',
			name: 'afterDetails',
			component: (resolve) => require(['@/components/order/afterDetails'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 支付成功
		{
			path:'/paySucceed',
			name: 'paySucceed',
			component: (resolve) => require(['@/components/pay/paySucceed'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 支付失败
		{
			path:'/payFail',
			name: 'payFail',
			component: (resolve) => require(['@/components/pay/payFail'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 绑定用户信息
		{
			path:'/my/bindingMsg',
			name: 'bindingMsg',
			component: (resolve) => require(['@/components/user/my/bindingMsg'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		// 搜索
		{
			path:'/search',
			name: 'search',
			component: (resolve) => require(['@/components/home/search'],resolve),
			meta:{requireAuth:true}   //是否需要登录
		},
		
  	]
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
	        
						// window.scrollTo(0, 0)
						// next()
	if (to.matched.some(r => r.meta.requireAuth)) { 

	if (to.path === '/login' || to.path === '/register') {
    
	  next();

	} else {
		let token = localStorage.getItem('Authorization');
	  if (token === null || token === '') {
		
		Dialog.alert({
			message: '请登录 !'
		}).then(() => {
			next('/login');	
		  });

	  } else {

		next();

	  }
	}
}else{
		next();
}
  });

export default router;
