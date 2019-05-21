<template>
    <div class="payFail">
        <headerView custom-title="购买失败" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="static/img/public/backBtn.png" />
            </div>
        </headerView>

        <div class="content">
                <div class="pay-tips">
                    <i class="iconfont icon-zhifushibai"></i>
                    <span>订单支付失败</span>
                </div>

        </div>

    </div>
</template>

<script>
    import headerView from '../common/headerView'
    export default {
        name:'payFail',
        data(){
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
            }
        },
        components:{
			headerView
        }
        
    }
</script>


<style lang="stylus" scoped>
.content
    padding-top 88px
    box-sizing border-box
    .pay-tips
        display flex
        justify-content center
        align-items center
        font-size 38px
        margin 80px 0;
        i 
            font-size 55px
            color red
            margin-right 15px
    h3
        line-height 70px
        font-size 30px
        color #444444
        font-weight normal
        margin-left 40px
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
</style>


