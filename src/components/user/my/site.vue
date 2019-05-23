
<template>
<!-- 地址管理 -->
    <div class="location">
          <headerView custom-title="地址管理">
                    <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../../static/img/public/backBtn.png" />
                      </div>
        </headerView>
        <div class="my-address-page yoho-page">
                <div class="page-wrap" >
                        <input type="hidden" name="_csrf" value="jT1UUoB2-sPizk8OZFoN4vtGpJDsinvqovSo">
                        <div class="address-item" v-for="(item,index) in siteList" :key="index">
                            <span class="name">{{item.consignee}}</span>
                            <span class="tel">{{item.mobile}}</span>
                            <p class="address-info">{{item.address}}</p>
                            <div class="action iconfont">
                                <a class="edit" href="javascript:;"  @click="xiugai(item,index)">
                                    <img src="../../../../static/img/user/userinfo/xiugai.png" alt="">
                                </a>
                                <span class="del"  @click="delSite(item,index)">
                                    <img src="../../../../static/img/user/userinfo/laji.png" alt="">
                                </span>
                            </div>
                        </div>
                    <div class="tip">为提高配送时效，请您尽量准确填写四级地址。</div>
                    <!-- <a class="add-address" data-href="/user/addressAct" href="/user/addressAct"> -->
                    <router-link class="add-address" to="/my/addressAct"> 添加新地址</router-link>
                    <!-- </a> -->

                    <van-popup v-model="show1" position="" :overlay="false" style="height:100%;width:100%">
                  
                   <headerView custom-title="修改地址">
                      <div class="backBtn" slot="backBtn" @click="show1=false">
                        <img src="../../../../static/img/public/backBtn.png" />
                      </div>
                    </headerView>
                  <!-- 地址组件 -->
                   <!-- <div style="width:100vw;height:100vh;background:#fff;">地址编辑内容</div> -->
                    <van-address-edit  
                        :area-list="areaList"
                        :address-info="addressInfo"
                        show-postal
                        show-set-default
                        show-search-result
                        @save="onSave"
                        />
                </van-popup>
                </div>
                <ul class="address-list">
            </ul>
       </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView.vue'
import { MessageBox } from 'mint-ui';
/* 引入 mint-ui 弹窗组件 */
	import {Toast} from "vant"
export default {
    data(){
        return{
        //   site:this.$route.query.site, 
          areaList:[],
          siteList:[],
          addressInfo:'',
          show1:false
        }
    },components:{
        headerView
    },
    created(){
        // 获取用户地址列表
         var url = 'user/address_list'
         var params = new URLSearchParams();
             params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value
             this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                   
                  if(res.data.status===1){
                     this.siteList = res.data.data
                  }else{
                    Dialog.alert({
								message:res.data.msg
								})
                  }
                })
        //获取地址
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
    methods: {
        //删除地址
        delSite(item,index){
             var url = 'user/del_address'
            var params = new URLSearchParams();
               params.append('address_id',item.address_id);       //你要传给后台的参数值 key/value
               params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value
            MessageBox.confirm('你确定要删除当前地址吗?').then(action => {
                this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
 
                  if(res.data.status===1){
                    Toast(res.data.msg);
                    this.siteList.splice(index,1)
                  }else{
                      Dialog.alert({
								message:res.data.msg
					})
                  }
                })


            }).catch(() => {
                });  
        },
        //修改地址
        // '/my/addressAct?address_id='+JSON.stringify(item)
        xiugai(item,index){
         
            let addressInfo = new Object;
            // this.areaList = areaList;
      // Toast('编辑收货地址:' + index);
    //   console.log('编辑收货地址:' + index);
    //    console.log(item);
      // 进入编辑模式
      if( item.is_default){
          item.is_default=true
      }else{
          item.is_default=false
      }
                this.show1 = true;
                addressInfo = {
                    id:item.address_id,    //地址id
                    name:item.consignee,   //收货人
                    tel:item.mobile,         //电话
                    province:item.province,    //省份
                    city:item.city,            //区
                    county:item.county,        //市
                    areaCode:item.code,     //code
                    addressDetail:item.address,  //详细地址
                    postalCode:item.zipcode,     //邮政编码
                    isDefault:item.is_default,   //是否默认地址
                }
                    this.addressInfo = addressInfo;
    },
    onSave(content) {
                        var url = "user/edit_address";
                        var s;
                        if(content.isDefault){
                            s = 1
                        }else{
                            s = 0
                        }
                        console.log(this.addressInfo.id)
                        var params = new URLSearchParams();
                                    params.append('address_id', this.addressInfo.id);       //你要传给后台的参数值 key/value         //收货id
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
                                    setTimeout(() => {
                                           this.$router.go(0)
                                    }, 1000);
                                }else{
                                    Toast(res.data.msg)
                                }
                                })
    },
    }
    
}
</script>
<style lang="stylus" scoped>
     
     .my-address-page 
        background: #f0f0f0;
        width: 100%;
    
    .my-address-page .address-item 
        background: #fff;
        border-bottom: 2px solid #e0e0e0;
        color: #b0b0b0;
        display: block;
        padding: 20px 30px;

    .my-address-page .address-item .name 
        display: inline-block;
        max-width: 380px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    
    .my-address-page .address-item .tel 
        float: right;

    .my-address-page .address-item .name, .my-address-page .address-item .tel 
        color: #444;
        font-size: 30px
        font-weight: 700;
        line-height: 56px;
    
    .my-address-page .address-item .address-info 
        font-size: 25px
        line-height: 38px;
    
    .my-address-page .address-item .action 
        font-size: 30px;
        line-height: 60px;
        text-align: right;
    
    .my-address-page .address-item .action .del, .my-address-page .address-item .action .edit 
        color: #999;
        display: inline-block;
        height: 60px
        text-align: center;
        width: 60px

    
    .my-address-page .tip 
        color: #aeaeae;
        padding: 20px
        text-align: center;
        font-size: 25px;
    
    .my-address-page .add-address 
        background: #fff;
        border-bottom: 2px solid #e0e0e0;
        border-top: 2px solid #e0e0e0;
        color: #444;
        display: block;
        font-size: 30px
        font-weight: 700;
        line-height: 88px
        margin-bottom: 30px
        text-align: center;
    
    .my-address-page .address-item .action .edit 
        margin-right: 20px
    
    .my-address-page .address-item .action .edit>img,.del>img
        width 32px
        height 32px  
   .van-popup
    transform none
    top 0 
    left 0
</style>
