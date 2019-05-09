<template>
    <div class="confirmOrder">
        <headerView custom-title="确认订单" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="static/img/public/backBtn.png" />
            </div>
        </headerView>

        <div class="content">
            <!-- 收货地址 -->
            <router-link to="/my/site">
                <div class="address">
                    <div class="address-icon">
                        <img src="/static/img/order/address-icon.png" />
                    </div>
                    <div class="right">
                        <div class="nameInfo">
                            <span class="name">小辣鸡</span>
                            <span class="phone">17875596666</span>
                        </div>
                        <div class="addressText">
                            <p>广东省 广州市 白云区 嘉禾街道嘉禾彭西仁和仁和仁和串钱的二巷69号</p>
                        </div>
                    </div> 
                    <div class="address-rightArrow iconfont">&#xe602;</div>
                </div>
            </router-link>

            <!-- 商品信息 -->
            <router-link to="/details">
                <div class="order-item" v-for="(item,index) in orderData" :key="index">
                    <div class="img-wrap">
                        <img :src="item.img" />
                    </div>
                    <div class="text">
                        <h3>{{item.goodsName}}</h3>
                        <p>
                            <span class="color">颜色:{{item.goodsColor}}</span>
                            <span class="size">尺码:{{item.goodsSize}}</span>
                        </p>
                    </div>
                    <div class="price-wrap">
                        <p class="price">{{item.price | toFix | rmb}}</p>
                        <p class="sale-price">{{item.salePrice | toFix | rmb}}</p>
                        <p class="count">x{{item.goodsNum}}</p>
                    </div>
                </div>
            </router-link>
            <!-- <div class="order-item">
                <div class="img-wrap">
                    <img src="/static/img/cart/0003.jpg" />
                </div>
                <div class="text">
                    <h3>COMBACK 随身便携小挎包随身便携小挎包随身便携小挎包</h3>
                    <p>
                        <span class="color">颜色:黑色</span>
                        <span class="size">尺码:L</span>
                    </p>
                </div>
                <div class="price-wrap">
                    <p class="price">¥79.00</p>
                    <p class="sale-price">¥98.00</p>
                    <p class="count">x1</p>
                </div>
            </div> -->

             <!-- 订单留言 -->
             <div class="dispatch-row" >
                <van-cell-group>
                    <van-field
                        label="订单备注"
                        type="textarea"
                        placeholder="选填，请先和商家协商一致"
                        rows="1"
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
                            <span class="wayText" style="float:right" ref="payWay">{{this.payWay}}</span>
                        </template>
                    </van-cell>
                    <!-- 上拉菜单，选择支付方式 -->
                    <van-actionsheet v-model="show" title="支持以下支付方式" class="select-wrap">
                        <van-radio-group v-model="payWay">
                            <van-cell-group>
                                <van-cell title="在线支付" clickable  @click="selectWay" >
                                    <van-radio name="在线支付"/>
                                </van-cell>
                                <van-cell title="货到付款" clickable  @click="selectWay" >
                                    <van-radio name="货到付款"/>
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
                共<span class="red">{{totalCount}}</span>件,
                总金额&nbsp;<span class="price red">{{  totalPrice  | toFix | rmb}}</span>
            </div>
            <button class="barBtn">
                确认订单
            </button>
        </div>
  
    </div>
</template>

<script>
    import headerView from '../common/headerView'
    export default {
        name:'comfirmOrder',
        data() {
            return {
                // 商品信息
                total:0,
                orderData:[
                    {
                        goodsId:1,
                        img:"/static/img/cart/0003.jpg",
                        imgUrl:"1",
                        goodsName:"COMBACK 随身便携小挎包随身便携小挎包随身便携小挎包",
                        goodsColor:"黑色",
                        goddsSize:"L",
                        price:79,
                        salePrice:98,
                        goodsNum:1
                    },
                    {
                        goodsId:1,
                        img:"/static/img/cart/0003.jpg",
                        imgUrl:"1",
                        goodsName:"COMBACK 随身便携小挎包随身便携小挎包随身便携小挎包",
                        goodsColor:"黑色",
                        goddsSize:"L",
                        price:79,
                        salePrice:98,
                        goodsNum:2
                    }
                ],
                chosenCoupon: -1,
                coupons: [
                    {
                    available: 1,
                    condition: '无使用门槛\n最多优惠12元',
                    reason: '',
                    value: 500,
                    name: '优惠券名称',
                    startAt: 1489104000,
                    endAt: 1514592000,
                    valueDesc: '5',
                    unitDesc: '元',
                    // total:0,
                    },
                    {
                    available: 1,
                    condition: '无使用门槛\n最多优惠12元',
                    reason: '',
                    value: 1000,
                    name: '优惠券名称',
                    startAt: 1489104000,
                    endAt: 1514592000,
                    valueDesc: '10',
                    unitDesc: '元',
                    // total:0,
                    },
                ],
                disabledCoupons: [
                //     {
                       
                //     available: 1,
                //     condition: '无使用门槛\n最多优惠12元',
                //     reason: '',
                //     value: 250,
                //     name: '优惠券名称',
                //     startAt: 1489104000,
                //     endAt: 1514592000,
                //     valueDesc: '2.5',
                //     unitDesc: '元',
                //     // total:0,
    
                // }
                ],
                showList:false,//优惠券
                payWay: '在线支付',
                delivery:"普通快递 : 免运费",
                show:false,//是否显示支付方式上拉列表
                show2:false,//是否显示配送方式上拉列表
                // total:0
            };
        },

        computed:{
            // 总价
            totalPrice(index){   
                // let total = 0;
                for(var i = 0;i<this.orderData.length;i++){
                   this.total += this.orderData[i].price * this.orderData[i].goodsNum;
                }
                // 判断是否使用优惠券
                if(this.chosenCoupon > 0){
                    this.total = this.total - parseInt(this.coupons[index].valueDesc) 
                }
           
                //判断是否选择顺丰快递
                else if(this.delivery == "顺丰速运:运费¥15"){
  
                    this.total += 15;
                }
                return this.total;
                
            },
            // 总数
			totalCount(){
                let count = 0;	
                for(var i = 0;i<this.orderData.length;i++){
                   count += this.orderData[i].goodsNum;
                }	
				return count;
			}
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
                this.totalPrice(index);
            },
            // 兑换优惠券回调
            onExchange(code) {
                // this.coupons.push(coupon);
            },
         
            // 上拉列表:选择支付方式
            showPromotion() {
                this.show = true;
            },
            // 选择支付方式
            selectWay(e){
                this.payWay = e.target.innerText;
                this.show = false;
            
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


</style>


