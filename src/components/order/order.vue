<template>
    <div class="order">
        <!-- 头部组件 -->
        <headerView custom-title="我的订单" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="/static/img/public/backBtn.png" />
            </div>
        </headerView>
        
        <div class="tab-wrap">
            <div class="tab-tit">
                <ul>
                    <li v-for="(item,index) in tabList"
                        :class="{active:index === nowIndex}"
                        @click="handleClick(index)">
                        {{item.tabTitle}}
                    </li>
                    <!-- <li class="active">全部订单</li>
                    <li>待付款</li>
                    <li>待发货</li>
                    <li>已完成</li> -->
                </ul>
            </div>
            <div class="tab-con">
                <ul>
                    <li v-show="nowIndex===0">
                        <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">已取消</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn">删除订单</span>
                                <span class="btn">再次购买</span>
                            </div>
                        </div>
                         <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">待付款</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn">取消订单</span>
                                <span class="btn payBtn">立即付款</span>
                            </div>
                        </div>
                        
                    </li>
                    <li v-show="nowIndex===1">
                        <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">待付款</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn">取消订单</span>
                                <span class="btn payBtn">立即付款</span>
                            </div>
                        </div>

                        <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">待付款</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn">取消订单</span>
                                <span class="btn payBtn">立即付款</span>
                            </div>
                        </div>
                    </li>
                    <li v-show="nowIndex===2">
                        <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">待发货</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn">取消订单</span>
                                <span class="btn">确认收货</span>
                            </div>
                        </div>

                        <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">待发货</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn">取消订单</span>
                                <span class="btn">立即收货</span>
                            </div>
                        </div>
                    </li>
                     <li v-show="nowIndex===3">
                        <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">已完成</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn">删除订单</span>
                                <span class="btn">再次购买</span>
                            </div>
                        </div>

                        <div class="order-good">
                            <div class="line1">
                                <span class="order-number">订单编号: 59077324629</span>
                                <span class="order-state">已完成</span>
                            </div>
                            <router-link to="/orderDetails">
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
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn">删除订单</span>
                                <span class="btn">再次购买</span>
                            </div>
                        </div>
                    </li>

                </ul>
                <!-- 无数据 -->
                <div class="none">
                    <img src="/static/img/public/none.png" alt="">
                    <p>暂无数据</p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import headerView from '../common/headerView'
    export default {
        name:'order',
        data(){
            return{
                nowIndex:0,
                tabList:[
					{
						tabTitle:"全部订单"
					},
					{
						tabTitle:"待付款"
					},
					{
						tabTitle:"待发货"
					},
					{
						tabTitle:"已完成"
					}
				]
            }
        },
        methods:{
            handleClick(index){
                this.nowIndex = index;
            }
        },
        components:{
            headerView
        }
        
    }
</script>

<style lang="stylus" scoped>
.order
    .tab-wrap
        padding-top 88px
        .tab-tit
            ul
                height 80px
                line-height 80px
                font-size 26px
                background-color #fff
                display flex
                align-items center
                justify-content space-between
                padding 0 30px
                box-sizing border-box
                margin-bottom 20px
                li
                    padding 0 28px
                    border-bottom 2px solid transparent
                    &.active
                        border-color #ed5657
        .tab-con
            .order-good
                margin-bottom 20px
                background-color #fff
                .line1
                    height 80px
                    font-size 26px
                    padding 0 30px
                    box-sizing border-box
                    display flex
                    align-items center
                    justify-content space-between
                    border-bottom 1px solid #e0e0e0
                .order-item
                    display flex
                    padding 20px 30px
                    box-sizing border-box
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
                .order-opt
                    text-align right 
                    padding 0 30px 20px
                    box-sizing border-box
                    .btn
                        width 138px
                        height 58px
                        font-size 24px
                        line-height 58px
                        text-align center
                        border 1px solid #000
                        border-radius 5px
                        display inline-block
                        margin-left 20px
                    .payBtn
                        color #fff
                        background-color #d0021b
                        border-color #d0021b
            .none
                display none
                text-align center
                img 
                    width 80px
                p
                    color #666
                    line-height 40px


</style>


