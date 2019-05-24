import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

// 创建一个store仓库,使用export公开，其他地方可引用
const store =  new Vuex.Store({
    //strict:true,//严格模式
    // 状态(一般保存数据)
    state:{
      loading:false,
      cartCount:0,  //购物车商品的数量
      //购物车列表
      goodsList:localStorage["goodsList"]?JSON.parse(localStorage["goodsList"]):[],
      // // 存储token
      // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
      //用户信息
      userInfo:{
          // 存储token
         Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
         usin:localStorage.getItem('usin') ? localStorage.getItem('usin') : '',
      },
    
    },

    // mutations 类似事件
    mutations:{
        showLoading(state){
            state.loading = true
        },
        hideLoading(state){
            state.loading = false
        },
        increment(state){state.cartCount++},//数量增加
        substract(state){state.cartCount--},//数量减少
        cartNum(state,num){   //购物车总数
          state.cartCount = num;
        },
         // 修改token，并将token存入localStorage
        changeLogin (state, user) {
          state.userInfo.Authorization = user.Authorization;//TOKEN
          localStorage.setItem('Authorization', user.Authorization);

        },
        userInfo(state, user){
          state.userInfo.usin = JSON.stringify(user);
          // localStorage.setItem('usin', JSON.stringify(user));
          // state.userInfo.usin = user
          localStorage.setItem('usin', JSON.stringify(user));
        },
        
        del_token(state) {        //删除token
          state.userInfo.Authorization = '';//TOKEN
          state.userInfo.usin = '';//用户信息
          localStorage.removeItem('Authorization');
          localStorage.removeItem('usin');
        },
      
  
    },
    //获取共享数据
    getters:{
          optCartCount:function(state){
            return state.cartCount
          },
          optuser:function(state){
            return state.userInfo
          }
     },
  });
  export default store;