<template>
    <div class="user_box">
        <header class="elementary-bar">
            <a href="javascript:;" class="head-bar">
                <img :src="userItem.avatar" alt="" class="head-img">
            </a>
            <a href="javascript:;" class="head-name">{{userItem.realname}}</a>
            <a href="javascript:;" class="member" style="background-color: rgb(0, 126, 186); ">
               <i class="vip-icon">{{user.vipRank}}</i></a>
        </header>
        <div class="section">
            <!-- 全部订单 -->
            <div class="order_bar">
               <router-link to="/order?type=0" class="order_look">
                   <span class="look_text">全部订单</span>
                    <span class="look_right">查看详情</span>
                    <i class="right-arrow"></i>
               </router-link>
               <ul class="order_icon clearfloat">
                   <li v-for="(item,index) in orderIcon" :key="index">
                       <router-link :to="item.ar" class="icont-or">
                           <img :src="item.imgUrl" alt="">
                           <p class="p-tit">{{item.name}}</p>
                        </router-link>
                    </li>
               </ul>
            </div>
            <!-- INFO -->
            <!-- <div class="info_bar">
                    <ul class="info_icon clearfloat">
                            <li>
                                <a href="javascript:;" class="info-or">
                                    <P class="num_info">0</P>
                                    <p class="p-name">我的收藏</p>
                                 </a>
                             </li>
                            <li>
                                <a href="javascript:;" class="info-or">
                                        <P class="num_info">20</P>
                                    <p class="p-name">我的积分</p>
                                 </a>
                             </li>
                            <li>
                                <a href="javascript:;" class="info-or">
                                        <P class="num_info">0</P>
                                    <p class="p-name">优惠卷</p>
                                 </a>
                             </li>
                            <li>
                                <a href="javascript:;" class="info-or">
                                        <P class="num_info">
                                            <span class="num_card">0</span>
                                            <span class="unit">张</span>
                                        </P>
                                    <p class="p-name">礼品卡</p>
                                 </a>
                             </li>
                        </ul>
            </div> -->
            <!-- btn-bar -->
            <div class="btn-bar">
                    <router-link class="btn-item privilege-item"  v-for="(item,index) in btnBar" :key="index" :to="item.aUrl">
                        <div class="item-name">{{item.name}}</div>
                        <img :src="item.imgUrl" alt="" class="item_icon">
                        <span class="item-desc">{{item.viceName}}</span>
                        <i class="right-arrow"></i>
                      </router-link>
            </div>
        </div>
         <!-- <div class="quitOut-box" @click="quitOut">
             <button class="quitOut">退出登录</button>
         </div> -->
        <menuBar></menuBar>
    </div>
</template>
<script>
import menuBar from '../common/menuBar.vue'
import store from '../../store/store'
import { Toast,Dialog} from 'vant';
export default {
    data() {
        return {
             orderIcon:[
                 {id:1,name:'待支付',imgUrl:'../../../static/img/user/yinghang.png',ar:'/order?type=1'},
                 {id:2,name:'待收货',imgUrl:'../../../static/img/user/liwu.png',ar:'/order?type=3'},
                 {id:3,name:'待发货',imgUrl:'../../../static/img/user/yunsu.png',ar:'/order?type=2'},
                 {id:4,name:'评价管理',imgUrl:'../../../static/img/user/pingjia.png',ar:'/order?type=4'},
                 {id:5,name:'退款/售后',imgUrl:'../../../static/img/user/shouhou.png',ar:'/order/afterSale'}
             ],
             btnBar:[
                //  {id:1,name:'会员福利社',viceName:'签到送积分',imgUrl:'../../../static/img/user/Member@2x.png',aUrl:''},
                //  {id:2,name:'急速保价',imgUrl:'../../../static/img/user/Price@2x.png',aUrl:''},
                 {id:3,name:'我的优惠券',imgUrl:'../../../static/img/user/coupon.png',aUrl:'/my/coupon'},
                //  {id:4,name:'我的兑换',imgUrl:'../../../static/img/user/exchange@2x.png',aUrl:''},
                 {id:5,name:'我的收藏',imgUrl:'../../../static/img/user/Collection@2x.png',aUrl:'/collection'},
                //  {id:6,name:'帮助中心',imgUrl:'../../../static/img/user/Help@2x.png',aUrl:''},
                 {id:7,name:'设置',viceName:'用户设置•地址',imgUrl:'../../../static/img/user/Set_up@2x.png',aUrl:'/my/userinfo'}
             ],
             user:{ id:1,userName:'马冬梅',vipRank:'白金会员'},
             userItem:[]   
             
        }
    },
    components:{
        menuBar
    },
    methods: {
        // 退出登录
        // quitOut(){
        //     Dialog.confirm({
        //     title: '提示',
        //     message: '你确定要退出登录吗?'
        //     }).then(() => {
        //        Toast('退出成功')
        //        store.commit('del_token'); //token，清除它;
        //        setTimeout(() => {
		// 			this.$router.push("/login");
		// 	   }, 1000);
        //     }).catch(() => {
        //         // on cancel
        //     });
        // }
    },
    created() {
         var url = "user/userinfo"
           var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value
            this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                    
                  if(res.data.status===1){
                     this.userItem = res.data.data
                     this.$store.commit("userInfo",res.data.data);
                  }else if(res.data.status === -1){  
                            Dialog.alert({
                            message:res.data.msg
                            }).then(()=>{
                            store.commit('del_token'); //token，清除它;
                            setTimeout(() => {
                            this.$router.push("/login");  
                         })
                         })
                    }else{
                          Dialog.alert({
                            message:res.data.msg
                            })
                    }
                })
    },
}
</script>
<style lang="stylus" scoped>
    /*用户中心样式*/
    @import "../../../static/css/user/user.css";
   .quitOut-box
      background  #323232;
      height 80px;
      width 500px;
      border-radius 10px
      margin 0 auto 
      line-height 80px
      text-align center
    .quitOut
      color #ffffff
   .btn-item:nth-child(2) .item-name
      border-bottom: none;
   .btn-item:nth-child(3)
      margin-top: .4rem;

</style>