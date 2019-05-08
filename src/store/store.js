import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

// 创建一个store仓库,使用export公开，其他地方可引用
export default new Vuex.Store({
    //strict:true,//严格模式
    // 状态(一般保存数据)
    state:{
      loading:false
    },

    // mutations 类似事件
    mutations:{
        showLoading(state){
            state.loading = true
        },
        hideLoading(state){
            state.loading = false
        }
    }

  })