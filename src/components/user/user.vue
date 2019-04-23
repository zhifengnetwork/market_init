<template>
    <div class="user_box">
        <header class="elementary-bar">
            <a href="javascript:;" class="head-bar">
                <img src="../../../static/img/user/defaultHeadImg.png" alt="" class="head-img">
            </a>
            <a href="javascript:;" class="head-name">马冬梅</a>
            <a href="javascript:;" class="member" style="background-color: rgb(0, 126, 186); ">
               <i class="vip-icon">普通会员</i></a>
        </header>
        <div class="section">
            <!-- 全部订单 -->
            <div class="order_bar">
               <a href="" class="order_look">
                   <span class="look_text">全部订单</span>
                    <span class="look_right">查看详情</span>
                    <i class="right-arrow"></i>
               </a>
               <ul class="order_icon clearfloat">
                   <li>
                       <a href="javascript:;" class="icont-or">
                           <img src="../../../static/img/user/yinghang.png" alt="">
                           <p class="p-tit">待支付</p>
                        </a>
                    </li>
                   <li>
                       <a href="javascript:;" class="icont-or">
                           <img src="../../../static/img/user/liwu.png" alt="">
                           <p class="p-tit">待收货</p>
                        </a>
                    </li>
                   <li>
                        <a href="javascript:;" class="icont-or">
                                <img src="../../../static/img/user/yunsu.png" alt="">
                                <p class="p-tit">待发货</p>
                             </a>
                    </li>
                   <li>
                        <a href="javascript:;" class="icont-or">
                                <img src="../../../static/img/user/pingjia.png" alt="">
                                <p class="p-tit">评价管理</p>
                             </a>
                    </li>
                   <li>
                       <a href="javascript:;" class="icont-or">
                           <img src="../../../static/img/user/shouhou.png" alt="">
                           <p class="p-tit">退款/售后</p>
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
                    <a class="btn-item privilege-item" href="">
                        <div class="item-name">会员福利社</div>
                        <img src="../../../static/img/user/Member@2x.png" alt="" class="item_icon">
                        <span class="item-desc">签到送积分</span>
                        <i class="right-arrow"></i>
                      </a>
                      <a class="btn-item privilege-item" href="">
                            <div class="item-name">急速保价</div>
                            <img src="../../../static/img/user/Price@2x.png" alt="" class="item_icon">
                            <span class="item-desc"></span>
                            <i class="right-arrow"></i>
                      </a>
                      <a class="btn-item privilege-item" href="">
                            <div class="item-name">我的产品库</div>
                            <img src="../../../static/img/user/Inventory@2x.png" alt="" class="item_icon">
                            <span class="item-desc"></span>
                            <i class="right-arrow"></i>
                    </a>
                    <a class="btn-item privilege-item" href="">
                            <div class="item-name">我的兑换</div>
                            <img src="../../../static/img/user/exchange@2x.png" alt="" class="item_icon">
                            <span class="item-desc"></span>
                            <i class="right-arrow"></i>
                    </a>
                    <a class="btn-item privilege-item" href="">
                            <div class="item-name">我的收藏</div>
                            <img src="../../../static/img/user/Collection@2x.png" alt="" class="item_icon">
                            <span class="item-desc"></span>
                            <i class="right-arrow"></i>
                    </a>
            </div>
            <!-- help -->
            <div class="help-bar">   
                    <a class="btn-item privilege-item" href="">
                            <div class="item-name">帮助中心</div>
                            <img src="../../../static/img/user/Help@2x.png" alt="" class="item_icon">
                            <span class="item-desc"></span>
                            <i class="right-arrow"></i>
                    </a>
                    <a class="btn-item privilege-item" href="">
                            <div class="item-name">设置</div>
                            <img src="../../../static/img/user/Set_up@2x.png" alt="" class="item_icon">
                            <span class="item-desc">用户设置•地址</span>
                            <i class="right-arrow"></i>
                    </a>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style>
    /*用户中心样式*/
    @import "../../../static/css/user/user.css";
</style>