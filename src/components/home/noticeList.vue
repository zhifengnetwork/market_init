<template>
    <div class="noticeList">
        <header>
            <headerView custom-title="公告"  rightNone>
                    <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
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
                            <span class="text">首页</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/classify">
                            <img class="iconfont" src="../../../static/img/public/class.png" />
                            <span class="text">分类</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/cart" rel="nofollow">
                            <img class="iconfont" src="../../../static/img/public/Cart.png" />
                            <span class="text">购物车</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/user" rel="nofollow">
                            <img class="iconfont" src="../../../static/img/public/user.png" />
                            <span class="text">我的</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </header>

        <div class="content">
            <div class="notice-list">
                <ul>
                    <router-link to="/home/noticeDetails" tag="li">
                        <h3>关于销售国家开发银行2019七期金融债券发的销售通告</h3>
                        <span class="date">2019-05-15</span>
                    </router-link>
                    <router-link to="/home/noticeDetails" tag="li">
                        <h3>关于销售国家开发银行2019七期金融债券发的销售通告</h3>
                        <span class="date">2019-05-15</span>
                    </router-link>
                    <router-link to="/home/noticeDetails" tag="li">
                        <h3>关于销售国家开发银行2019七期金融债券发的销售通告</h3>
                        <span class="date">2019-05-15</span>
                    </router-link>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
// 公共头部
import headerView from '@/components/common/headerView'
export default {
    name:'noticeList',
    data(){
        return{
            //头部显示导航
            isHide:true,
        }
    },
    methods:{
        //控制是否显示tab
        showTab(){
            this.isHide=!this.isHide
        },
    },
    components:{
        headerView
    }
}
</script>

<style lang="stylus" scoped>
.noticeList
    background-color #fff
    min-height 100vh
    .content
        .notice-list
            ul
                li
                    height 134px
                    font-size 28px
                    line-height 50px
                    border-bottom 1px solid #efefef
                    padding 0 30px
                    box-sizing border-box
                    position relative
                    margin-top 10px
                    h3
                        font-weight normal
                    .date
                        color #999999
                        font-size 24px
                        position absolute
                        right 30px
                        bottom 10px


</style>


