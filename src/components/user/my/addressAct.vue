<template>
    <!-- 添加地址 -->
    <div class="my-address-page">
        <headerView custom-title="添加地址">
                <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../../static/img/public/backBtn.png" />
                </div>
        </headerView>

        <!-- :area-list="areaList" -->
        <!-- :search-result="searchResult" -->
         <van-address-edit
            show-postal
            show-delete
            show-set-default
            show-search-result
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            @change-default="onCheack"
            />
    </div>
</template>
 <script>
// 公共头部
import headerView from '../../common/headerView.vue'
/* 引入 mint-ui 弹窗组件 */
import {Toast} from "mint-ui"
 export default {
     data() {
         return {
              //地区列表
            //   areaList,
              //详细地址搜索结果
            //   searchResult: []
         }
     },components:{
        headerView
    },
    methods: {

        //点击保存按钮时触发
    onSave() {
      Toast('save');
    },

        //确认删除地址时触发
    onDelete() {
      Toast('delete');
    },

        //修改详细地址时触发
    onChangeDetail(val) {

    //   if (val) {
    //     this.searchResult = [{
    //       name: '黄龙万科中心',
    //       address: '杭州市西湖区'
    //     }];
    //   } else {
    //     this.searchResult = [];
    //   }
    },
    
        //选择默认地址时触发
        onCheack(val){
             console.log(val)
        }
    }
 }
 </script>
 <style lang="stylus">
    .van-cell
         padding 20px 
         font-size 30px
         line-height 40px
    
    .van-field__label
         max-width: 200px
    
    .van-address-edit-detail
         padding 0 
    
    .van-button
         font-size 30px
         height 100px
 </style>
 
 