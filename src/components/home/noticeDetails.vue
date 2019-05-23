<template>
    <div class="noticeDetails">
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
            <h1>砍价免费下线通知</h1>
            <p>砍价免费下线通知:尊敬的用户，因活动调整，火车砍价免单活动暂时下线，砍价成功未提现用户可以联系客服进行人工提现，带来不便，敬请谅解！</p>
        </div>

    </div>
</template>

<script>
// 公共头部
import headerView from '@/components/common/headerView'
export default {
    name:'noticeDetails',
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
.noticeDetails
    background-color #fff
    min-height 100vh
    .content
        width 80%
        margin 50px auto 0
        h1
            text-align center
            font-size 38px
            font-weight normal
            margin-bottom 10px
        p
            line-height 36px
            font-size 26px
</style>
