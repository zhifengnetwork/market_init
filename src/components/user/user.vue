<template>
    <div class="user_box">
        <header class="elementary-bar">
            <a href="javascript:;" class="head-bar">
                <img src="../../../static/img/user/defaultHeadImg.png" alt="" class="head-img">
            </a>
            <a href="javascript:;" class="head-name">{{user.userName}}</a>
            <a href="javascript:;" class="member" style="background-color: rgb(0, 126, 186); ">
               <i class="vip-icon">{{user.vipRank}}</i></a>
        </header>
        <div class="section">
            <!-- 全部订单 -->
            <div class="order_bar">
               <a href="/order" class="order_look">
                   <span class="look_text">全部订单</span>
                    <span class="look_right">查看详情</span>
                    <i class="right-arrow"></i>
               </a>
               <ul class="order_icon clearfloat">
                   <li v-for="(item,index) in orderIcon" :key="index">
                       <a href="javascript:;" class="icont-or">
                           <img :src="item.imgUrl" alt="">
                           <p class="p-tit">{{item.name}}</p>
                        </a>
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

    </div>
</template>
<script>
export default {
    data() {
        return {
             orderIcon:[
                 {id:1,name:'待支付',imgUrl:'../../../static/img/user/yinghang.png'},
                 {id:2,name:'待收货',imgUrl:'../../../static/img/user/liwu.png'},
                 {id:3,name:'待发货',imgUrl:'../../../static/img/user/yunsu.png'},
                 {id:4,name:'评价管理',imgUrl:'../../../static/img/user/pingjia.png'},
                 {id:5,name:'退款/售后',imgUrl:'../../../static/img/user/shouhou.png'}
             ],
             btnBar:[
                 {id:1,name:'会员福利社',viceName:'签到送积分',imgUrl:'../../../static/img/user/Member@2x.png',aUrl:''},
                 {id:2,name:'急速保价',imgUrl:'../../../static/img/user/Price@2x.png',aUrl:''},
                 {id:3,name:'我的优惠券',imgUrl:'../../../static/img/user/coupon.png',aUrl:'/my/coupon'},
                 {id:4,name:'我的兑换',imgUrl:'../../../static/img/user/exchange@2x.png',aUrl:''},
                 {id:5,name:'我的收藏',imgUrl:'../../../static/img/user/Collection@2x.png',aUrl:'/my/enshrine'},
                 {id:6,name:'帮助中心',imgUrl:'../../../static/img/user/Help@2x.png',aUrl:''},
                 {id:7,name:'设置',viceName:'用户设置•地址',imgUrl:'../../../static/img/user/Set_up@2x.png',aUrl:''}
             ],
             user:{ id:1,userName:'马冬梅',vipRank:'白金会员'}
                
             
        }
    },
}
</script>
<style>
    /*用户中心样式*/
    @import "../../../static/css/user/user.css";
</style>