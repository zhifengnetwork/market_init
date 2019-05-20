<template>
    <div class="paySucceed">
        <headerView custom-title="购买成功" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.push('/user')">
                <img src="static/img/public/backBtn.png" />
            </div>
        </headerView>

        <div class="content">
              <div class="pay-tips">
                <i class="iconfont icon-zhifuchenggong"></i>
                <span>订单支付成功</span>
            </div>
           <div >
      
            <!-- 商品信息 -->
            <h3>
                <span>订单编号:</span>
                
                <span class="publicEllipsis">{{orderData.order_sn}}</span>
            </h3>
            <h3>
                <span>支付金额:</span>
                <span style="color:red"  class="publicEllipsis">￥{{orderData.order_amount}}</span>
            </h3>
            <h3>
                <span>商品名称:</span>
                <span  class="publicEllipsis">{{orderData.goods_name}}</span>
            </h3>
            </div>
            <!-- <router-link to="/details">
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
            </router-link> -->
            <p class="chakan" @click="$router.push('orderDetails?order_id='+orderData.order_id)">查看订单详情>></p>
        </div>

    </div>
</template>

<script>
    import headerView from '../common/headerView'
    export default {
        name:'paySucceed',
        data(){
            return {
                // 商品信息
                orderData:'',
                    
                // //商品订单id
                // home:this.$route.query.id,
                // //列表
                // orderData:'',
            }
        },
        components:{
			headerView
        },
        created() {
                this.orderData = JSON.parse(this.$route.params.list)
                // console.log(this.$route.query.list)
        },
        //挂载完成后，判断浏览器是否支持popstate
        mounted(){
        if (window.history && window.history.pushState) {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.fun, false);//false阻止默认事件
          }
        },
        //页面销毁时，取消监听。否则其他vue路由页面也会被监听
            destroyed(){
        window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
        },
        //将监听操作写在methods里面，removeEventListener取消监听内容必须跟开启监听保持一致，
        methods: {
                    fun(){
                     this.$router.push('/user')
             }
        },
        
    }
</script>


<style lang="stylus" scoped>
.content
    padding-top 88px
    box-sizing border-box
    height 100vh
    background #ffffff
    .pay-tips
        display flex
        justify-content center
        align-items center
        font-size 38px
        margin 80px 0;
        i 
            font-size 55px
            color #3bb000
            margin-right 15px
    h3
        line-height 70px
        font-size 30px
        color #444444
        font-weight normal
        margin-left 15%
        display: flex
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
    .chakan
       margin-left 15%
       color red
       margin-top 20px
       font-size 30px
.content h3 .publicEllipsis
        max-width 60%
        padding-left 20px
</style>


