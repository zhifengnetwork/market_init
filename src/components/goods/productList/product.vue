<template>
    <!-- 商品列表 -->
    <div class="productL-box">
          <header>
                <headerView custom-title="商品列表"  rightNone>
                        <div class="backBtn" slot="backBtn" @click="backBtn($router.go(-1))">
                            <img src="../../../../static/img/public/backBtn.png" />
                        </div>
                        <div class="rightBtn" slot="rightBtn" @click="showTab">
                            <img src="../../../../static/img/public/recovery.png" />
                        </div>
                </headerView> 
                <div class="homebuttom" :class="{hide:isHide}">
                            <div class="ul-arr"></div>
                            <ul>
                                <li>
                                    <router-link to="/">
                                        <img class="iconfont" src="../../../../static/img/public/home.png" />
                                        <span class="text">首页</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/classify">
                                        <img class="iconfont" src="../../../../static/img/public/class.png" />
                                        <span class="text">分类</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/cart" rel="nofollow">
                                        <img class="iconfont" src="../../../../static/img/public/Cart.png" />
                                        <span class="text">购物车</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/user" rel="nofollow">
                                        <img class="iconfont" src="../../../../static/img/public/user.png" />
                                        <span class="text">我的</span>
                                    </router-link>
                                </li>
                            </ul>
                    </div>
        </header>
        <!-- 列表 -->
        <div class="good-list-page">
                <div class="filter-tab">
                    <ul class="list-nav clearfloat"  @click.prevent='setlocation($event)'>
                        <li :class="{active:index=='default'}"  class="default buriedpoint"    data-ip="'default'">
                            <!-- <router-link to=''> -->
                                <span>默认</span>
                                <span class="iconfont drop">&#xe605;</span>
                            <!-- </router-link> -->
                        </li>
                        <li :class="{active:index=='new'}" class="neww  buriedpoint" data-ip="new">
                            <!-- <router-link to=''> -->
                                <span>新品</span>
                            <!-- </router-link> -->
                        </li>
                        <li :class="{active:index=='popularity'}" class="popularity  buriedpoint" data-ip="popularity">
                            <!-- <router-link to=''> -->
                                <span>人气</span>
                            <!-- </router-link> -->
                        </li>
                        <li :class="{active:index=='price'}" class="price  buriedpoint"  data-ip="price">
                            <!-- <router-link to=''> -->
                                <span>价格</span>
                                <span class="icon">
                                     <i class="iconfont up"   :class="{cur:isCur==false}">&#xe609;</i>
                                     <i class="iconfont down" :class="{cur:isCur==true}">&#xe606;</i>
                                </span>
                            <!-- </router-link> -->
                        </li>
                        <li :class="{active:index=='filter'}" class="filter buriedpoint" data-ip="filter">
                            <!-- <router-link to=''> -->
                                <span>筛选</span>
                                <span class="iconfont drop">&#xe605;</span>
                            <!-- </router-link> -->
                        </li>
                    </ul>
                </div>

        </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView'
export default {
    data(){
        return{
          //头部显示导航
             isHide:true, 
             index:'default',
             isCur:false,
        }
    },components:{
        // 公告头部
        headerView,
    },methods: {

        showTab(){
            this.isHide=!this.isHide
        },
        setlocation(e){
            
             console.log(e.target.dataset.ip)
            this.isCur=!this.isCur
        }
    }
}
</script>
<style lang="stylus" scoped>
        .good-list-page
            background #ffffff

        .good-list-page .list-nav 
            border-bottom: 2px solid #e6e6e6;
            border-top: 2px solid #fff;
            position: relative;

        .good-list-page .list-nav>li 
            float: left;
            font-size: 25px
            height: 70px
            line-height: 70px
            text-align: center;
            width: 20%;

        .good-list-page .list-nav .active>a 
            color: #000;

        .good-list-page .list-nav a 
            box-sizing: border-box;
            color: #999;
            display: block;
            height: 100%;
            width: 100%;

        .good-list-page .list-nav .nav-txt 
            box-sizing: border-box;
            display: inline-block;
            height: 100%;
        
        .good-list-page .list-nav .icon 
            position: relative;
        
        .good-list-page .list-nav .active>a .iconfont 
            color: #999;

        .good-list-page .list-nav .icon .up 
            top: -6px;

        .good-list-page .list-nav .icon i 
            -webkit-transform: scale(.8);
            font-weight: 700;
            position: absolute;
            transform: scale(.8);

        .iconfont
            font-size 30px
        .down
            top -25px
        
        .good-list-page .list-nav .active>a .iconfont.cur, .good-list-page .list-nav .active>a .iconfont.drop 
            color: #000;

</style>
