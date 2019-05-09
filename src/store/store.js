import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

// 创建一个store仓库,使用export公开，其他地方可引用
export default new Vuex.Store({
    //strict:true,//严格模式
    // 状态(一般保存数据)
    state:{
      loading:false,
      cartCount:0  //购物车商品的数量
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
    },
    //获取共享数据
        getters:{
          optCartCount:function(state){
            return state.cartCount
          }
     }
  })