<template>
    <!-- 添加地址 -->
    <div class="my-address-page">
        <headerView custom-title="新增地址">
                <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../../static/img/public/backBtn.png" />
                </div>
        </headerView>

        <!-- :area-list="areaList" -->
        <!-- :search-result="searchResult" -->
         <van-address-edit
            :area-list="areaList"
            show-postal
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
            areaList:{},
              //详细地址搜索结果
            searchResult: [],
            addressId:this.$route.query.items,
            //购物车id
             cartId:this.$route.query.id,
            //收货人信息初始值
            addressInfo:'',
            // titleE:'添加地址',
         }
     },components:{
        headerView
    },
    methods: {

        //点击保存按钮时触发
    onSave(content) {
        var url = "user/add_address";
        var s;
        if(content.isDefault){
            s = 1
        }else{
            s = 0
        }
         var params = new URLSearchParams();
             params.append('consignee', content.name);       //你要传给后台的参数值 key/value         //收货人
                    params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value   //token
                    params.append('district',content.areaCode);       //你要传给后台的参数值 key/value          //县
                    params.append('address', content.addressDetail);       //你要传给后台的参数值 key/value             //详细地址
                    params.append('mobile', content.tel);       //你要传给后台的参数值 key/value             //电话
                    params.append('is_default', s);       //你要传给后台的参数值 key/value  //是否默认
                    params.append('zipcode', content.postalCode);       //你要传给后台的参数值 key/value  //是否默认
             this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                  if(res.data.status===1){
                      Toast(res.data.msg)
                     if(this.cartId){
                          this.$router.push("/confirmOrder?id="+this.cartId);
                     }else{
                          this.$router.go(-1)
                     }
                  }else{
                     Toast(res.data.msg)
                  }
                })
    },

        //确认删除地址时触发
    onDelete(content) {
      Toast('delete');
    },

        //修改详细地址时触发
    onChangeDetail(val) {
    //   console.log(val)

      
    },
  
        //选择默认地址时触发
        onCheack(val){
             console.log(val)
        }
    },
    created( ) {
           var url = "user/get_address"
           var params = new URLSearchParams();
               params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value   //token
             this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                  if(res.data.status===1){
                     this.areaList = res.data.data
                  }
                })
    },

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
 
 