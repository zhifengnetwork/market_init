import Vue from 'vue'
import Router from 'vue-router'

// 注册模块
import login from '@/components/login/login'
import register from '@/components/login/register'
import forget from '@/components/login/forget'
// 首页
import home from '@/components/home/home'

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


Vue.use(Router)

export default new Router({
	/*去除掉，路径#号*/
	mode: 'history',
  	routes: [
	    {
	    	path: '/',
		    name: 'login',
		    redirect: '/login', /**重定向**/
		    /*component: login*/
				component: (resolve) => require(['@/components/login/login.vue'],resolve)
	    },
	    {
	    	path: '/login', 
				component: (resolve) => require(['@/components/login/login.vue'],resolve)
	      
	    },
	    {
	    	path: '/register',
	    	name: 'register',
				component: (resolve) => require(['@/components/login/register'],resolve)
	    	
	    },
	    {
	    	path: '/forget',
	    	name: 'forget',
			component: (resolve) => require(['@/components/login/forget'],resolve)
		},
		// 首页
		{
			path:'/home',
			name: 'home',
			component:home
		},
		// 分类
		{
			path:'/classify',
			name: 'classify',
			component:classify
		},
		// 商品详情
		{
			path:'/details',
			name:'details',
			component:details
		},
		// 购物车
		{
			path:'/cart',
			name: 'cart',
			component:cart
		},
		// 用户中心
		{
			path:'/user',
			name: 'user',
			component:user
		},
		// 订单
		{
			path:'/order',
			name: 'order',
			component:order
		},
		// 订单详情
		{
			path: '/orderDetails', 
			name: 'orderDetails', 
			component:orderDetails
		},
		// 我的优惠券
		{
			path:'/my/coupon',
			name: 'coupon',
			component:coupon
		},
		// 我的收藏
		{
			path:'/collection',
			name:'collection',
			component:collection
		},
		//商品评价
		{
			path:'/details/evaluate',
			name:'evaluate',
			component:evaluate
		},
		//发布评价
		{
			path:'/my/appraise',
			name:'appraise',
			component:appraise
		},
		// 确认订单
		{
			path:'/confirmOrder',
			name: 'confirmOrder',
			component:confirmOrder
		},
		//个人信息
		{
			path:'/my/userinfo',
			name: 'userinfo',
			component:userinfo
		},
		//个人地址管理
		{
			path:'/my/site',
			name: 'site',
			component:site
		},
		//添加地址
		{
			path:'/my/addressAct',
			name: 'addressAct',
			component:addressAct
		},
		//账号安全
		{
			path:'/my/changePwd',
			name: 'changePwd',
			component:changePwd
		},
		//商品列表
		{
			path:'/productLsit',
			name: 'productLsit',
			component:productLsit
		}
		
  	]
})
