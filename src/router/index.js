import Vue from 'vue'
import Router from 'vue-router'
/*注册模块*/
import login from '@/components/login/login'
import register from '@/components/login/register'
import forget from '@/components/login/forget'
// 首页
import home from '@/components/home/home'

// 商品分类
import classify from '@/components/classify/classify'

// 购物车
import cart from '@/components/cart/cart'

// 个人中心
import user from '@/components/user/user'

// 订单页
// import order from '@/components/order/order'

// 订单详情
// import orderDetails from '@/components/order/orderDetails'

// 我的优惠券
import coupon from '@/components/user/my/coupon'

/* 商品详情 */
import details from '@/components/goods/details'

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
	    {
	    	path: '/index',
	    	name: 'index',
	    	component: (resolve) => require(['@/components/index'],resolve)
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
		// {
		// 	path:'/order',
		// 	name: 'order',
		// 	component:order
		// },
		// // 订单详情
		// {
		// 	path: '/orderDetails', 
		// 	name: 'orderDetails', 
		// 	component:orderDetails
		// },
		// 我的优惠券
		{
			path:'/my/coupon',
			name: 'coupon',
			component:coupon
		},
		
  	]
})
