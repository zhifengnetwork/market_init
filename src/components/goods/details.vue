<template>
    <div class='details'>
         <header>
         <headerView custom-title="商品详情" custom-fixed rightNone>
				<div class="backBtn" slot="backBtn" @click="backBtn($router.go(-1))">
					<img src="../../../static/img/public/backBtn.png" />
				</div>
                <div class="rightBtn" slot="rightBtn" @click="showTab">
                    <img src="../../../static/img/public/recovery.png" />
                </div>
		</headerView> 
           <div class="homebuttom" :class="{hide:isHide}">
                    <div class="ul-arr"></div>
                    <ul>
                        <li>
                            <router-link to="/">
                                <img class="iconfont" src="../../../static/img/public/home.png" />
                                <span>首页</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/classify">
                                <img class="iconfont" src="../../../static/img/public/class.png" />
                                <span>分类</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/cart" rel="nofollow">
                                <img class="iconfont" src="../../../static/img/public/Cart.png" />
                                <span>购物车</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/user" rel="nofollow">
                                <img class="iconfont" src="../../../static/img/public/user.png" />
                                <span>我的</span>
                            </router-link>
                        </li>
                    </ul>
               </div>
    </header>
    <div class="goods">
                <van-swipe class="goods-swipe" :autoplay="0" indicator-color="#000">
                <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
                    <img  :src="thumb"v-lazy="thumb" >       
                </van-swipe-item>
                </van-swipe>

                <van-cell-group>
                <van-cell class="goods-name">
                    <div class="goods-title">{{ goods.title }}</div>
                    <div class="goods-price">
                        <span class="price">{{ formatPrice(goods.price) }}</span>
                        <span class="original">{{ formatPrice(goods.price) }}</span>
                    </div>
                    
                </van-cell>
                <van-cell class="goods-express">
                    <van-col span="10">运费：{{ goods.express }}</van-col>
                    <van-col span="14">剩余：{{ goods.remain }}</van-col>
                </van-cell>
                </van-cell-group>
                <!-- 领取优惠券 -->
                <div class="mod_detail_info_header evaluate">
                    <a class="J_to_evaluate" href="/detail/index?itemid=1000000000100511234895&amp;mtag=30022.46.1#evaluate">
                        <div class="detail_info_line clearfloat">
                            <h3>领取优惠券</h3>
                            <i class="midea-icon right-arrow"></i>
                        </div>
                    </a>
                </div>
                <!-- 商品评价 -->
                <div class="mod_detail_info_header evaluate">
                        <a class="J_to_evaluate" href="/detail/index?itemid=1000000000100511234895&amp;mtag=30022.46.1#evaluate">
                            <div class="detail_info_line clearfloat">
                                <h3>商品评价</h3>
                                <i class="midea-icon right-arrow"></i>
                            </div>
                        </a>
                        <div class="detail_switch">
                                                    <div class="evaluate_tag_box evaluate_tag_box_line">
                                    <div class="evaluate_tag_box_inner">
                                                                            <span class="tags_span">满意(245)</span>
                                                                            <span class="tags_span">师傅服务周(228)</span>
                                                                            <span class="tags_span">安装师傅很(192)</span>
                                                                            <span class="tags_span">效果好(52)</span>
                                                                            <span class="tags_span">师傅很专业(7)</span>
                                                                    </div>
                                </div>
                                                                        <div class="evaluate_list_box">
                                    <div class="evaluate_box">
                                        <div class="rate_avator_time clearfloat">
                                            <div class="avator_wrap">
                                                <img src="//filecmms.midea.com/ccrm-prod/userHeadImg/defaultHeadImg.png" class="avator_pic" alt="用户头像">
                                                <span class="avator_name" title="0***7">0***7</span>
                                            </div>
                                            <div class="quality_time">
                                                                                        <span class="comment_time">2019-04-26</span>
                                            </div>
                                        </div>
                                        <p class="evaluate_comment">送货快，安装好。</p>
                                    </div>
                                </div>
                                <a class="all_evaluate_btn J_to_evaluate" mtag="30008.8.1" href="/detail/index?itemid=1000000000100511234895&amp;mtag=30022.46.1#evaluate">
                                    <span class="evaluate_text">查看全部149条评价</span>
                                    <i class="midea-icon right-arrow evaluate_icon"></i>

                                </a>
                                            </div>
                    </div>
                <!-- 商品详情 -->
                <div class="mod_detail_info_header evaluate">
                        <a class="J_to_evaluate" href="/detail/index?itemid=1000000000100511234895&amp;mtag=30022.46.1#evaluate">
                            <div class="detail_info_line clearfloat">
                                <h3>商品详情</h3>
                                <!-- <i class="midea-icon right-arrow"></i> -->
                            </div>
                        </a>
                        <div class="detail_wrap">
                            <p class="p-info">
                                1983年的美国犹他州，有一位专门为科罗拉多河探险的人们提供向导服务的人，当时他有个困扰：身上的太阳镜总是容易丢失，为此他发明了一种多功能的眼镜绳，这是当时市场上一款可调节的全棉眼镜绳——他就是CHUMS品牌创始人Mike Taggett。“CHUMS”这一品牌名称，是由Mike 先生好友的爱犬“Chumley”的名字演变而来，其中蕴含了Mike先生希望透过这一品牌，让顾客感受到生活的温馨与美好的心情。
                            </p>
                            <p v-for="thumb in goods.thumb" :key="thumb" class="p-info">
                                <img  :src="thumb"v-lazy="thumb">
                            </p>
                        </div>
                        <div class="marking_price_wrap">
                            <p class="marking_price__title">划线价格：</p>
                            <p class="marking_price__content">指商品专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供參考。</p>
                            <p class="marking_price__title">未划线价格：</p>
                            <p class="marking_price__content">指商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</p>
                            <p class="marking_price__content">商家详情页（含主图）以图片成文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格.具体请以结算页面的标价、优惠条件或活动规则为准。</p>
                            <p class="marking_price__content">此说明仅当出现价格比较时有效，如有疑问，您可在购买前联系客服进行咨询。</p>
                        </div>
                </div>

                <van-goods-action>
                <van-goods-action-mini-btn icon="chat-o" @click="sorry">
                    客服
                </van-goods-action-mini-btn>
                <van-goods-action-mini-btn icon="cart-o" @click="onClickCart">
                    购物车
                </van-goods-action-mini-btn>
                <van-goods-action-big-btn @click="sorry">
                    加入购物车
                </van-goods-action-big-btn>
                <van-goods-action-big-btn primary @click="sorry">
                    立即购买
                </van-goods-action-big-btn>
                </van-goods-action>
        </div>
            <!-- <van-sku
            v-model="showBase"
            :sku="sku"
            :goods="goods"
            :goods-id="goodsId"
            :hide-stock="sku.hide_stock"
            :quota="quota"
            :quota-used="quotaUsed"
            :reset-stepper-on-hide="resetStepperOnHide"
            :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
            :close-on-click-overlay="closeOnClickOverlay"
            :disable-stepper-input="disableStepperInput"
            :message-config="messageConfig"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
            /> -->
</div>
    
</template>
<script>
// 公告头部
import headerView from '../common/headerView.vue'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
} from 'vant';
export default {
    data(){
        return{
             isHide:true, goods: {
                title: '美国伽力果（约680g/3个）',
                price: 2680,
                express: '免运费',
                remain: 19,
                thumb: [
                'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
                'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
                ]
            }
    };
    },components:{
        // 公告头部
        headerView,
        // vant
        [Tag.name]: Tag,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
    },methods: {
        showTab(){
            this.isHide=!this.isHide
        },
        formatPrice() {
        return '¥' + (this.goods.price / 100).toFixed(2);
        },
        onClickCart() {
        this.$router.push('cart');
        },
        sorry() {
        Toast('暂无后续逻辑~');
        },
        onBuyClicked(){

        },
        onAddCartClicked(){

        }
        }
}
</script>
<style lang="stylus" >
    .rightBtn>img
       height 50px
       width 50px
    header 
        width 100%
        height 88px
        line-height 88px
        background-color #323232
        color #fff
        text-align center
        position relative
        z-index 99
        position fixed
    .homebuttom 
        background-size: 100% 100%;
        color: #fff;
        height 355px
        overflow: hidden;
        padding-top: 17px;
        position: absolute;
        right: .3rem;
        top: 80px
        width: 280px
        z-index: 2;
       .ul-arr 
            background-color: #434343;
            -webkit-transform: rotate(45deg);
            height: 42px
            position: absolute;
            right 30px
            top: .1rem;
            transform: rotate(45deg);
            width: 42px
        .homebuttom   ul 
               border-radius: .25rem;
               height: 338px
               overflow: hidden;
               padding: 1px 0;
               width:100%
               background-image: linear-gradient(#434343,#171717);
        .homebuttom   ul   li
                    float: left;
                    height: 84px
                    line-height: 84px
                    overflow: hidden;
                    padding-left:40px
                    width: 100%;
        ul   li   span
                            border-bottom: 1px solid #444;
                            color: #fff;
                            display: block;
                            float: left;
                            font-size: 30px
                            height: 83px
                            padding-left: 40px
                            width: 190px
                            text-align left
       .homebuttom ul li .iconfont
            display: block;
            float: left;
            height 40px
            width 40px
            margin-top 20px
            //vant
            .goods {
                padding-bottom: 50px;
                &-swipe {
                    img {
                    width: 100%;
                    display: block;
                    height 500px;
                    }
                }
                &-title {
                    font-size: 16px;
                }
                &-price {
                    color: #f44;
                }
                &-express {
                    color: #999;
                    font-size: 12px;
                    padding: 5px 15px;
                }
                &-cell-group {
                    margin: 15px 0;
                    .van-cell__value {
                    color: #999;
                    }
                }
                &-tag {
                    margin-left: 5px;
                }
                }
        .goods
            padding-top 88px
            padding-bottom 79px
           .goods-swipe
                    max-height 660px
                    background-color #fff
        .van-swipe-item
              display: flex;
        .van-swipe-item  img
               margin 30px auto
               height 597px
      .van-swipe__indicators 
        background: rgba(0,0,0,.2);
        border-radius: 1.25rem;
        line-height: 1.2;
        padding: 4px  8px;
      .van-swipe__indicators  .van-swipe__indicator
                                width 14px
                                height 14px
                                background-color #b0b0b0 
      .goods-name
         background-color: #515150; 
         color: #fff;
         padding 20px 28px
         line-height 45px
         .van-cell__value--alone
               color: #fff; 
               font-size 35px
               .goods-price
                  color #d0021b
                  .original
                    text-decoration line-through
                    color #b0b0b0
                    font-size 30px
                    margin-left 10px
      .goods-express,.van-cell
         padding 20px 28px
         line-height 45px
         margin-top: 10px
     .van-cell
         font-size: 30px
    // bottom
      .van-goods-action
        height 79px
        .van-goods-action-mini-btn,.van-button--large
           height 100%  
     .van-goods-action-mini-btn__icon
        font-size 35px
    // 商品评价
      .mod_detail_info_header 
            background-color: #fff;
            position: relative;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
            margin-top: 10px;
      .evaluate .detail_info_line 
            border-bottom: 1px solid #eee
            position: relative
            padding: 30px 0 30px 20px
     .mod_detail_info_header h3 
            color: #333;
            float: left;
            font-size: 30px
            font-weight: normal;
    .detail_switch 
            padding-left: 15px;
    .evaluate .evaluate_tag_box 
            overflow: hidden
            box-sizing: border-box
            padding: 5px 0 15px 0
            border-bottom: 1px solid #f4f4f4
    .evaluate .evaluate_tag_box_inner 
            height: 50px
            overflow: hidden
    .evaluate .evaluate_tag_box span.tags_span 
            display: inline-block;
            font-size: 25px
            color: #333;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            background: #ebfcf1;
            border: 2px solid #23d75f;
            height: 40px
            line-height: 40px
            vertical-align: middle;
            padding: 0 8px;
            margin: 10px 10px 0 0;
    .evaluate .evaluate_list_box 
            padding: 15px 0 20px 0;
    .evaluate .evaluate_list_box .evaluate_box 
            padding-right: 15px;
            background: #fff;
    .evaluate .evaluate_list_box .evaluate_box .avator_wrap 
            float: left;
            height: 50px
            line-height 50px;
    .evaluate .evaluate_list_box .evaluate_box .quality_time 
            float: right;
    .evaluate .evaluate_list_box .evaluate_box .avator_wrap img.avator_pic 
            width: 50px
            height: 50px;
            border-radius: 15px;
            -webkit-border-radius: 15px;
    .evaluate .evaluate_list_box .evaluate_box .comment_time 
            color: #ccc;
            font-size: 13px;
            line-height: 50px;
    .evaluate .evaluate_list_box .evaluate_box .avator_wrap .avator_name 
            display: inline-block;
            line-height: 50px;
            margin-left: 5px;
            vertical-align: text-bottom;
            max-width: 145px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
    .evaluate .evaluate_list_box .evaluate_box p.evaluate_comment 
            font-size: 25px;
            clear: both;
            color: #747474;
            word-break: break-all;
            overflow: hidden;
            margin-top: 25px
    .evaluate .all_evaluate_btn 
            cursor: pointer;
            display: block;
            color: #0092d8;
            height: 60px
            line-height: 60px
            font-size: 14px;
            text-align: center;
            border-top: 1px solid #f4f4f4;
    .evaluate .evaluate_icon
                display: inline-block;
                position: relative;
                top: -1px;
                left: 2px;
                font-size: 13px;
                font-weight: normal;
                border-bottom: 2px solid #0092d8;
                border-right: 2px solid #0092d8;
    .detail_wrap 
                display: block;
                width:100%;
    .detail_wrap    .p-info
                padding: 17px 25px 20px 25px;
                font-size: 10px;
                background-color: #fff;
     .detail_wrap    .p-info>img
                display: block;
                width:100%;
    .marking_price_wrap 
                padding: 17px 25px 20px 25px;
                font-size: 10px;
                background-color: #fff;
    .marking_price_wrap .marking_price__title 
                position: relative;
                height: 30px
                line-height: 30px
                padding-left: 5px;
                margin-bottom: 6px;
                font-weight: bold;
                color: #000;
                vertical-align: baseline;
    .marking_price_wrap .marking_price__content 
                padding-left: 5px;
                margin-bottom: 15px;
                color: #999;
   
</style>
