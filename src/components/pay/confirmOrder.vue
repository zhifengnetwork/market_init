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
            
            <!-- <div class="dispatch"> -->
                <!-- 支付方式 -->
                <div class="dispatch-row" @click = "choiceWay()">
                    <div class="title" >
                        <div class="fl">支付方式</div>
                        <div class="fr">
                            <span class="wayText">在线支付</span>
                            <span class="iconfont">&#xe602;</span>
                        </div>
                    </div>
                    <ul class="list"  v-show="isShow">
                        <li>
                            <span>在线支付(推荐)</span>
                            <span class="iconfont" >&#xe776;</span>
                            <!-- <span class="iconfont">&#xe691;</span> -->
                        </li>
                        <li>
                            <span>货到付款</span>
                            <span class="iconfont">&#xe776;</span>
                            <!-- <span class="iconfont">&#xe691;</span> -->
                        </li>
                    </ul>
                </div>

                <!-- 配送方式 -->
                <div class="dispatch-row">
                    <div class="title" @click = "choiceWay($event)">
                        <div class="fl">配送方式</div>
                        <div class="fr">
                            <span class="wayText">普通快递 : 运费¥10</span>
                            <span class="iconfont">&#xe602;</span>
                        </div>
                    </div>
                    <ul class="list">
                        <li>
                            <span>普通快递 : 运费¥10</span>
                            <span class="iconfont" >&#xe776;</span>
                            <!-- <span class="iconfont">&#xe691;</span> -->
                        </li>
                        <li>
                            <span>顺丰速运:运费¥15</span>
                            <span class="iconfont">&#xe776;</span>
                            <!-- <span class="iconfont">&#xe691;</span> -->
                        </li>
                    </ul>
                </div>

            <!-- </div> -->


           
        </div>

        <!-- 提交订单 -->
        <div class="order-bill">
            <div class="barText">
                共<span class="red">1</span>件,
                总金额&nbsp;<span class="price red">¥79.00</span>
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
        name:'pay',
        data() {
            return {
                isShowA:false,
                isShowB:true
            
            };
        },
        methods:{
            choiceWay(e){
                // this.isShow = !this.isShow
                console.log(e)
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
            background-color #edf1f7
            padding 0 30px
            box-sizing border-box
            display none
            li
                line-height 60px
                font-size 24px
                display flex
                align-items center
                justify-content space-between
                .iconfont
                    font-size 30px

        

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


