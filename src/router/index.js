import Vue from 'vue'
import Router from 'vue-router'
/*注册模块*/
import login from '@/components/login/login'
import register from '@/components/login/register'
import forget from '@/components/login/forget'
/*首页*/
import index from '@/components/index'
// 分类
import classify from '../components/classify/classify'
/*购物车 */
import cart from '../components/cart/cart'
/*个人中心 */
import user from '../components/user/user'

Vue.use(Router)

export default new Router({
	/*去除掉，路径#号*/
	mode: 'history',
  	routes: [
			{
	    	path: '/',
		    name: 'classify',
				component:classify
			},
	    // {
	    // 	path: '/',
		  //   name: 'login',
		  //   redirect: '/login', /**重定向**/
		  //   /*component: login*/
			// 	component: (resolve) => require(['@/components/login/login.vue'],resolve)
	    // },
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
			{
				path:'/cart',name: 'cart',component:cart,
			},
			{
				path:'/user',name: 'user',component:user,
	    }
  	]
})
