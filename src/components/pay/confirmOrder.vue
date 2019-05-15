<template>
    <div class="confirmOrder">
        <headerView custom-title="确认订单" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="static/img/public/backBtn.png" />
            </div>
        </headerView>

        <div class="content">
            <!-- 收货地址 -->
            <!-- <router-link :to="'/my/site?site='+site"> -->
                <div class="address" @click="openSite">
                    <div class="address-icon" >
                        <img src="/static/img/order/address-icon.png" />
                    </div>
                    <div class="right">
                        <div class="nameInfo">
                            <span class="name">{{tacitlySite.consignee}}</span>
                            <span class="phone">{{tacitlySite.mobile}}</span>
                        </div>
                        <div class="addressText">
                            <p>{{tacitlySite.address}}</p>
                        </div>
                    </div> 
                    <div class="address-rightArrow iconfont">&#xe602;</div>
                </div>
            <!-- </router-link> -->

            <!-- 商品信息 -->
            <router-link :to="'/details?goods_id='+orderData.goods_id">
                <div class="order-item" v-for="(item,index) in orderData.spec" :key="index">
                    <div class="img-wrap">
                        <img :src="baseUrl+orderData.img" />    
                    </div>
                    <div class="text">
                        <h3>{{item.goods_name}}</h3>
                        <p>
                            <span class="color">{{item.spec_key_name}}</span>
                            <!-- <span class="size">尺码:{{item.goodsSize}}</span> -->
                        </p>
                    </div>
                    <div class="price-wrap">
                        <p class="price">{{item.goods_price | toFix | rmb}}</p>
                        <!-- <p class="sale-price">{{item.salePrice | toFix | rmb}}</p> -->
                        <p class="count">x{{item.goods_num}}</p>
                    </div>
                </div>
            </router-link>
             <!-- 订单留言 -->
             <div class="dispatch-row" >
                <van-cell-group>
                <van-field
                    v-model="message"
                    label="订单备注"
                    type="textarea"
                    placeholder="选填，请先和商家协商一致"
                    rows="2"
                    autosize
                />
                </van-cell-group>
             </div>

            <div class="dispatch-row" >
                <!-- 优惠券单元格 -->
                <van-coupon-cell
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @click="showList = true"
                />

                <!-- 优惠券列表 -->
                <van-popup v-model="showList" position="bottom">
                <van-coupon-list
                    :coupons="coupons"
                    :chosen-coupon="chosenCoupon"
                    :disabled-coupons="disabledCoupons"
                    @change="onChange"
                    @exchange="onExchange"
                />
                </van-popup>
            </div>

            <!-- 支付方式 -->
            <div class="dispatch-row">
                <van-cell-group class="goods-cell-group">
                    <van-cell is-link  @click="showPromotion" >
                        <template slot="title">
                            <span style="margin-right: 10px;">支付方式</span>
                            <span class="wayText" style="float:right" ref="payWay">{{this.payMode}}</span>
                        </template>
                    </van-cell>
                    <!-- 上拉菜单，选择支付方式 -->
                    <van-actionsheet v-model="show" title="支持以下支付方式" class="select-wrap">
                        <van-radio-group  v-model="payMode">
                            <van-cell-group>
                                <van-cell v-for="item in pay_type" :key="item.pay_id" :title="item.pay_name" clickable  :data-pay="item.pay_id"  @click="pay(item,pay_type)" >
                                    <van-radio :name="item.pay_name"/>
                                </van-cell>
                            </van-cell-group>    
                        </van-radio-group>
                    </van-actionsheet>
                </van-cell-group>
            </div>

            <!-- 配送方式 -->
            <div class="dispatch-row">
                <van-cell-group class="goods-cell-group">
                    <van-cell is-link  @click="showPromotion2" >
                        <template slot="title">
                            <span style="margin-right: 10px;">配送方式</span>
                            <span class="wayText" style="float:right">{{this.delivery}}</span>
                        </template>
                    </van-cell>
                    <!-- 上拉菜单，选择配送方式 -->
                
                    <van-actionsheet v-model="show2" title="支持以下配送方式" class="select-wrap">
                        <van-radio-group v-model="delivery">
                            <van-cell-group>
                                <van-cell title="普通快递 : 免运费" clickable  @click="selectWay2" >
                                    <van-radio name="普通快递 : 免运费"/>
                                </van-cell>
                                <van-cell title="顺丰速运:运费¥15" clickable  @click="selectWay2" >
                                    <van-radio name="顺丰速运:运费¥15"/>
                                </van-cell>
                            </van-cell-group>    
                        </van-radio-group>
                    </van-actionsheet>
                </van-cell-group>
            </div>

        </div>  

        <!-- 提交订单 -->
        <div class="order-bill">
            <div class="barText">
                共<span class="red">{{orderData.goods_num}}</span>件,
                总金额&nbsp;<span class="price red">{{orderData.subtotal_price}}</span>
            </div>
            <button class="barBtn" @click="open">
                确认订单
            </button>
        </div>
        <!-- 地址选择 -->
         <div class="site">
                   <van-popup v-model="showSite" position="right" :overlay="false">
                         <van-radio-group v-model="sitess" >
                             <div class="site-box">
                                  <div class="select-sist-title">
                                  <p class="goback" @click="showSite=false">返回</p>
                                  <p >选择地址</p>
                                  </div>
                                  <div class="site-list" v-for="item in site"  :key="item.id" @click="selectSite(item)">
                                  
                                        <div class="right">
                                            <div class="nameInfo">
                                                <span class="name">{{item.consignee}}</span>
                                                <span class="phone">{{item.mobile}}</span>
                                            </div>
                                            <div class="addressText">
                                                <p>{{item.address}}</p>
                                            </div>
                                        </div> 
                                        <van-radio :name="item.address_id">
                        </van-radio>
                                  
                                  </div>
                         </div>
                        
                        </van-radio-group>
                </van-popup>
            </div>
    </div>
</template>

<script>
    import headerView from '../common/headerView'
    /* 引入 mint-ui 弹窗组件 */
import {Toast,Dialog} from "vant"
    export default {
        name:'comfirmOrder',
        data() {
            return {
                  //商品图片路径
                baseUrl:'http://api.zfwl.c3w.cc/upload/images/',
                home:this.$route.query.id,
                // 商品信息
                orderData:[],
                //商品支付
                pay_type:[],
                //支付显示
                showWay: false,
                //地址显示
                showSite:false,
                //地址
                sitess:1,
                //支付名称
                payMode:'在线支付',
                //支付方式
                payId:'',
                //备注
                message:'',
                //用户地址
                site:[],
                //默认显示地址
                tacitlySite:[],
                chosenCoupon: -1,
                coupons: [
                    {
                        available: 1,
                        condition: '无使用门槛\n最多优惠12元',
                        reason: '',
                        value: 250,
                        name: '优惠券名称',
                        startAt: 1489104000,
                        endAt: 1514592000,
                        valueDesc: '2.5',
                        unitDesc: '元'
                    },
                    {
                        available: 1,
                        condition: '无使用门槛\n最多优惠10元',
                        reason: '',
                        value: 350,
                        name: '优惠券名称',
                        startAt: 1489104000,
                        endAt: 1514592000,
                        valueDesc: '3.5',
                        unitDesc: '元'
                    }
                ],
                disabledCoupons: [

                ],
                showList:false,//优惠券
                delivery:"普通快递 : 免运费",
                show:false,//是否显示支付方式上拉列表
                show2:false,//是否显示配送方式上拉列表
            };
        },
        created(){
            // console.log(this.home)
                 //获取订单信息
                    // 购物车提交订单	order/temporary
                    // 参数：
                    // token
                    // cart_id
                 
                 var url = 'order/temporary';
                 var params = new URLSearchParams();
                 params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value    tokne
                 params.append('cart_id', this.home);
                 this.$axios({
                            method:"post",
                            url:url,
                            data: params
                        }).then((res)=>{
                            if(res.data.status=== 1){
                                  this.orderData = res.data.data.goods_res[0]  //商品信息
                                  this.pay_type = res.data.data.pay_type            //支付方式
                                  this.site = res.data.data.addr_res           //地址列表
                                  for(var i in this.site){                  
                                      if(this.site[i].is_default === 1 ){        //等于一就是显示默认地址
                                              this.tacitlySite = this.site[i]
                                      }
                                  }
                            }else{
                                Dialog.alert({
                                message:res.data.msg
                                });
                            }
                            
                        })       


        },
        computed:{
            // 总价
            totalPrice(index){
                let total = 0;
                for(var i = 0;i<this.orderData.length;i++){
                   total += this.orderData[i].price * this.orderData[i].goodsNum;
                }
                //判断是否选择优惠券               
                if(this.chosenCoupon == -1){ //不适用优惠券
                    // 选择顺丰速运
                    if(this.delivery == "顺丰速运:运费¥15"){
                        total = total + 15 ;
                    }
                }else{// 使用优惠券

                    // 使用优惠券优惠金额
                    var value = this.coupons[this.chosenCoupon].value / 100 ;
                    total -= value ;

                    // 选择顺丰速运
                    if(this.delivery == "顺丰速运:运费¥15"){
                        total = total + 15 ;
                    }    
                }
                return total;
            },
        },

        mounted(){
            // 处理留言框被键盘遮住
            this.clientHeight = document.documentElement.clientHeight;
            const that = this;
             // 安卓手机键盘吊起挡住输入框
            window.onresize = function() {
              if(document.documentElement.clientHeight < that.clientHeight) {
                // scrollVal为负值
                let scrollVal = document.documentElement.clientHeight-that.clientHeight;
                $(".content").css("marginTop",scrollVal);
                $(".order-bill").hide();
              }else {
                $(".content").css("marginTop",0);
                $(".order-bill").show();
              }
            }
           
        },

        methods:{
            // 优惠券切换回调
            onChange(index) {
                var indexx 
                this.showList = false;
                this.chosenCoupon = index;
            },
            // 兑换优惠券回调
            onExchange(code) {
                this.coupons.push(coupon);
            },
         
            showPromotion(){
                this.show=true;
            },
      
        
            // 上拉列表:选择配送方式
            showPromotion2() {
                this.show2 = true;
            },
            selectWay2(e){
                this.delivery = e.target.innerText;
                this.show2 = false;
                //判断是否选择顺丰快递
                 if(this.delivery == "顺丰速运:运费¥15"){
  
                    this.total += 15;
                }else{
                    this.total -= 15;
                }
            },

            // 提示
            sorry() {
                this.$toast('暂无后续逻辑~');   
            },

            //弹出支付方式
            open(){
                    // 提交订单	order/submitOrder
                    // 参数：
                    // token
                    // cart_id		//购物车ID（多个逗号分开）
                    // address_id	//收货ID
                    // pay_type	//支付方式
                    // user_note	//订单备注
                    if(this.payId === ''){
                                Dialog.alert({
                                message:'请选择支付方式'
                                });
                                return
                    }else{
                                var params = new URLSearchParams();
                                params.append('token', this.$store.getters.optuser.Authorization);           //token
                                params.append('cart_id',this.home );                       //购物车ID（多个逗号分开）
                                params.append('address_id', this.tacitlySite.address_id); //收货ID
                                params.append('pay_type', this.payId);                   //支付方式
                                params.append('user_note', this.message);               //订单备注
                                var url = "	order/submitOrder"
                                this.$axios({
                                        method:"post",
                                        url:url,
                                        data: params
                                    }).then((res)=>{
                                        if(res.data.status=== 1){
                                        // order_id  int
                                        // pay_type string  (alipay
                                        // 支付宝，weixin
                                        // 微信，credit
                                        // 余额，cash
                                        // 货到付款)
                                        var orderId = res.data.data
                                        var urll = 'pay/payment'
                                        var params = new URLSearchParams();
                                        params.append('token', this.$store.getters.optuser.Authorization);                         //订单id
                                        params.append('order_id', orderId);                                                       //订单id
                                        params.append('pay_type',this.payId);                                                    //支付方式
                                        this.$axios({
                                            method:"post",
                                            url:urll,
                                            data: params
                                        }).then((res)=>{
                                            if(res.data.status ===1){
                                                var ll = res.data.data
                                             window.location.href = ll;
                                            }else{
                                            Dialog.alert({
                                            message:res.data.msg
                                            });
                                            }
                                        })
                                        }else{
                                            Dialog.alert({
                                            message:res.data.msg
                                            });
                                        }
                                        
                                    }) 
                    }
                    

            },
            //支付中心
            pay(i,pay_type){
             this.show = false;
             this.payMode = i.pay_name;
             this.payId = i.pay_type //支付方式
            },
            //地址选择
            openSite(){
              this.showSite = true;
            },
            //地址列表选择
            selectSite(item){
               this.sitess = item.address_id
               this.tacitlySite = item
               this.showSite = false;
            }
        },

        filters:{
            // 价格过滤器
			toFix(val){
				return Number(val).toFixed(2)
			},
			rmb(val){
				return "￥" + val
			}
        },
        
        components:{
			headerView
        },
      
    }
</script>


<style lang="stylus" scoped>

.confirmOrder
    .content
        padding-top 88px
        padding-bottom 98px
        .address
            display flex
            height 170px
            background-color #fff
            align-items center
            padding 30px 30px
            box-sizing border-box
            margin-bottom 20px
            background url(/static/img/bg-addr-box-line.png) #fff left bottom repeat-x; 
            background-size 70px
            justify-content space-between
            .address-icon
                width 42px
                height 42px
                margin-right 30px
                img 
                    width 100%
            .nameInfo
                margin-bottom 10px
                .name
                    font-size 30px
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
                .phone
                    color #999999
            .addressText
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                font-size 24px 
            .address-rightArrow
                font-size 40px
                color #969799 
        .order-item
            display flex
            padding 20px 30px
            box-sizing border-box
            background-color #fff
            border-bottom 1px solid #e8e8e8
            .img-wrap   
                width 120px
                height 160px
                margin-right 18px
                img 
                    width 100%
            .text
                flex 1
                font-size 26px
                h3
                    line-height 34px
                    font-size 26px
                    color #000000
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-line-clamp 2
                    -webkit-box-orient vertical
                    overflow hidden
                    margin 10px 0
                    font-weight normal
                p
                    line-height 40px 
                    color #b6b6b6
                    span 
                        margin-right 25px
            .price-wrap
                width 120px
                color #9999a6
                text-align right 
                margin-top 10px
                p
                    margin-bottom 20px
                .price
                    color #ee1827
                .sale-price
                    text-decoration line-through
        .dispatch-row
            .wayText
                color #969799       
        .select-wrap /deep/ .van-cell__value
            flex none
    .order-bill
        width 100%
        height 88px
        background-color #fff
        display flex
        align-items center
        position fixed
        left 0
        bottom 0
        z-index 9
        .barText
            flex 1
            text-align right 
            margin-right 30px
            font-size 26px
            color #666
            .red
                color #ff0036
        .barBtn
            width 160px 
            height 100%
            background-color #ff0036
            font-size 26px
            color #fff

.select-wrap /deep/ .van-cell__value
            flex none   

.site .van-popup
      min-height 100vh!important
      width 100%

.select-sist-title
        display flex
        position relative
        justify-content center 
        width 100%
        height 88px
        line-height 88px
        text-align center 
        font-size 16px
        background-color #323232
        color #fff

.goback
        position absolute
        left  10px       
.van-radio-group .site-list
            display flex
            height 170px
            background-color #fff
            align-items center
            padding 30px 25px
            box-sizing border-box
            margin-bottom 20px
            background url(/static/img/bg-addr-box-line.png) #fff left bottom repeat-x; 
            background-size 70px   
            padding-right 0
            justify-content space-between

.site-box .site-list .nameInfo
            margin-bottom 10px
.site-box .nameInfo .name
    font-size: 0.4rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

.site-box .nameInfo .phone
    color: #999;

.site-box .site-list .addressText
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 0.32rem;

.site-box .site-list .van-radio
    margin-right 10px
</style>


