<template>
    <div class="confirmOrder">
        <headerView custom-title="确认订单" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="static/img/public/backBtn.png" />
            </div>
        </headerView>

        <div class="content">
            <!-- 收货地址 -->
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

            <!-- 商品信息 -->
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
            <div class="dispatch-row" >
                <div class="title">
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
            </div>

            <!-- 支付方式 -->
            <div class="dispatch-row" >
                <div class="title" @click = "toggleDrop($event)">
                    <div class="fl">支付方式</div>
                    <div class="fr">
                        <span class="wayText">{{this.payWay}}</span>
                        <span class="iconfont">&#xe602;</span>
                    </div>
                </div>
                <div class="list">
                       <van-radio-group v-model="payWay" v-show="isDrop">
                        <van-cell-group>
                            <van-cell title="在线支付" clickable   @click="payWay = '在线支付'" >
                            <van-radio name="在线支付"   @click="payWay = '在线支付'" />
                            </van-cell>
                            <van-cell title="货到付款" clickable   @click="payWay = '货到付款'" >
                            <van-radio name="货到付款" @click="payWay = '货到付款'" />
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>    
                </div>  
            </div>

            <!-- 配送方式 -->
            <div class="dispatch-row" >
                <div class="title" @click = "toggleDrop2($event)">
                    <div class="fl">配送方式</div>
                    <div class="fr">
                        <span class="wayText">{{this.delivery}}</span>
                        <span class="iconfont">&#xe602;</span>
                    </div>
                </div>
                <div class="list">
                       <van-radio-group v-model="delivery" v-show="isDrop2">
                        <van-cell-group>
                            <van-cell title="普通快递 : 运费¥10" clickable   @click="delivery = '普通快递 : 运费¥10'" >
                            <van-radio name="普通快递 : 运费¥10"   @click="delivery = '普通快递 : 运费¥10'" />
                            </van-cell>
                            <van-cell title="顺丰速运:运费¥15" clickable   @click="delivery = '顺丰速运:运费¥15'" >
                            <van-radio name="顺丰速运:运费¥15" @click="delivery = '顺丰速运:运费¥15'" />
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>    
                </div>  
            </div>

            <!-- 订单留言 -->
            <div class="dispatch-row">
                <div class="title">订单留言</div>
                <div class="msg">
                    <textarea placeholder="限300字（若有特殊需求，请联系商城在线客服)"></textarea>
                </div>
            </div>
            
           
        </div>

        <!-- 提交订单 -->
        <div class="order-bill">
            <div class="barText">
                共<span class="red">{{totalCount}}</span>件,
                总金额&nbsp;<span class="price red">{{totalPrice | toFix | rmb}}</span>
            </div>
            <button class="barBtn">
                确认订单
            </button>
        </div>
  
    </div>
</template>

<script>
    import headerView from '../common/headerView'
    const coupon = {
        available: 1,
        condition: '无使用门槛\n最多优惠12元',
        reason: '',
        value: 250,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '2.5',
        unitDesc: '元'
    };
    export default {
        name:'comfirmOrder',
        data() {
            return {
                // 商品信息
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
                coupons: [coupon],
                disabledCoupons: [coupon],
                showList:false,
                isDrop:false,
                isDrop2:false,
                payWay: '在线支付',
                delivery:"普通快递 : 运费¥10",
                wayArr:[
                    {
                        wayData:{
                            title:"支付方式",
                            wayList:["在线支付","货到付款"]
                        }
                    },
                    {
                        wayData:{
                            title:"配送方式",
                            wayList:["普通快递 : 运费¥10","顺丰速运:运费¥15"]
                        }
                    },
                ]
            };
        },
        computed:{
            // 总价
            totalPrice(){
                let total = 0;
                for(var i = 0;i<this.orderData.length;i++){
                   total += this.orderData[i].price * this.orderData[i].goodsNum;
                }
                return total;
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
            // 优惠券
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            onExchange(code) {
                this.coupons.push(coupon);
            },
            // 下拉列表
            toggleDrop(){
                this.isDrop = !this.isDrop
            },
            toggleDrop2(){
                this.isDrop2 = !this.isDrop2
            },
            // 更换支付方式
            selectWay(e){
                var selectText = e.target.children[0].innerText;
                this.payWay = selectText;
                this.isDrop = !this.isDrop
            },
       
        
        },
        filters:{
            // 价格过滤器
			toFix(val){
				return parseInt(val).toFixed(2)
			},
			rmb(val){
				return "￥" + val
			}
		},
        components:{
			headerView
        }
        
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
            min-height 70px
            .title
                min-height 70px
                display flex
                align-items center
                justify-content space-between
                border-bottom 1px solid #e8e8e8
                font-size 26px
                padding 0 30px
                box-sizing border-box
                background-color #fff
                .van-cell
                    line-height 65px
                    padding 0
                    .van-cell__title
                        font-size 26px
                    .van-cell__value
                        font-size 26px
                        color #666
                    .van-icon
                        font-size 28px
                        color #666
                    .van-cell__right-icon
                        line-height 70px
                .van-coupon-list /deep/ .van-cell
                    line-height 60px
                    .van-coupon-list__exchange
                        height 60px
                        line-height 60px;
                .van-coupon-list /deep/ .van-tabs__wrap
                    height 50px
                    line-height 50px
                    font-size 26px
                .van-coupon-list /deep/ .van-tabs__content
                    .van-coupon__content
                        height 150px
                        .van-coupon__head
                            h2
                                font-size 36px
                                margin-bottom 10px
                            p
                                line-height 30px
                        .van-coupon__body
                            h2
                                font-size 28px
                                margin-bottom 10px
                             p
                                line-height 30px
                .van-coupon-list /deep/ .van-button--large
                    height 88px
                    line-height 88px
                    .van-button__text
                        font-size 26px
                        
                .fr
                    font-size 0
                    .wayText
                        font-size 24px
                        color #666
                    .iconfont
                        font-size 30px
                        position relative
                        top 3px
            .list
                .van-radio-group /deep/ .van-cell
                    line-height 60px
                    padding 0 30px
                    font-size 24px
                    .van-radio__icon 
                        i
                            width 32px
                            height 32px
                            line-height 32px
            .msg
                textarea
                    width 95%
                    height 150px
                    border 2px solid #d1d1d1
                    margin 10px auto
                    display block
                    padding-left 10px
                    box-sizing border-box
                    border-radius 10px
                    font-family "微软雅黑"
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


