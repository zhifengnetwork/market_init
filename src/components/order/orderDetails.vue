<template>
    <div class="order-details">
          <!-- 头部组件 -->
        <headerView custom-title="订单详情" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="/static/img/public/backBtn.png" />
            </div>
        </headerView>
        
        <div class="details-wrap">
            <!-- 订单状态 -->
            <div class="order-state">
                 <p>订单状态：<span>已完成</span></p>   
                 <img src="/static/img/order/order-state1.png" alt="">
            </div>

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
            </div>

            <!-- 商品信息 -->
            <div class="order-item">
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
            </div>
            
            <div class="order-row">
                <div class="line">
                    <div class="left">
                        订单优惠:
                    </div>
                    <div class="right">
                        订单满68元包邮
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        运费:
                    </div>
                    <div class="right">
                        ¥0.00
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        优惠:
                    </div>
                    <div class="right red">
                        ¥-0.00
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        订单总价:
                    </div>
                    <div class="right">
                        ¥79.00
                    </div>
                </div>
               
            </div>
     
            <div class="order-row">
                <div class="line">
                    <div class="left">
                        配送方式:
                    </div>
                    <div class="right">
                        顺丰速运 免邮
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        支付方式:
                    </div>
                    <div class="right">
                        在线支付
                    </div>
                </div>
                  <div class="line">
                    <div class="left">
                        订单备注:
                    </div>
                    <div class="right">
                        尽快发货！
                    </div>
                </div>
                <div class="line">
                    <div class="left">
                        订单编号:
                    </div>
                    <div class="right">
                        294119778362083616
                    </div>
                </div>
                 <div class="line">
                    <div class="left">
                        发票类型:
                    </div>
                    <div class="right">
                        个人
                    </div>
                </div>
                 <div class="line">
                    <div class="left">
                        发票抬头:
                    </div>
                    <div class="right">
                        xxxx
                    </div>
                </div>
            </div>



        </div>

    </div>
</template>

<script>
    import headerView from '../common/headerView'
    export default {
        name:'orderDetails',
        components:{
            headerView
        }
    }
</script>

<style lang="stylus" scoped>
.details-wrap
    padding-top 88px
    .order-state
        width 100%
        height 240px
        font-size 30px
        color #fff
        background-color #69c1ff
        display flex
        align-items center
        justify-content space-between
        padding 0 40px
        box-sizing border-box
        img 
            width 270px
    .address
        display flex
        height 150px
        background-color #fff
        align-items center
        padding 20px 30px
        box-sizing border-box
        margin-bottom 20px
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
    .order-row
        padding 20px 30px
        box-sizing border-box
        background-color #fff
        border-bottom 1px solid #e8e8e8 
        .line
            display flex
            font-size 24px 
            margin-bottom 10px
            color #666
            .left
                width 150px
            .right
                flex 1
                font-size 22px
            .red
                color #f00
        
            

</style>


