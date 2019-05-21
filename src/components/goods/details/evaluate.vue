<template>
    <div class="evaluate"> 
        <header>
           <headerView custom-title="购买评价" custom-fixed rightNone>
				<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
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
                                <span>首页</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/classify">
                                <img class="iconfont" src="../../../../static/img/public/class.png" />
                                <span>分类</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/cart" rel="nofollow">
                                <img class="iconfont" src="../../../../static/img/public/Cart.png" />
                                <span>购物车</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/user" rel="nofollow">
                                <img class="iconfont" src="../../../../static/img/public/user.png" />
                                <span>我的</span>
                            </router-link>
                        </li>
                    </ul>
               </div>
        </header>
        <!-- 评价 -->
        <div class="goods-comments" id="goods-comments" >
            <div class="comment-item clearfloat" v-for="(item,index) in comment" :key="index">
                <div class="user-info clearfloat">
                    <span class="user-name">{{item.mobile}}</span>
                    <span class="goods-spec">
                    购买了<b>{{item.spec}}</b>
                    </span>
                    <!-- <span class="goods-size">/{{item.spec}}</span> -->
                </div>
                <p class="detail-content">{{item.content}}</p>
                <div class="img clearfloat" v-if="item.img.length!=0">
                    <div class="eveImg" v-for="items in item.img" :key="items">
                         <img :src="baseUrl+items" alt="">
                    </div>
                </div>
                <span class="comment-time">{{item.add_time | formatDate}}</span>
                <span>{{item.replies}}</span>
            </div>
        </div>
    </div>
</template>
<script>
// 公告头部
import headerView from '../../common/headerView.vue'
export default {
    data(){
        return{
              //商品图片路径
              baseUrl:'',
            isHide:true,
            goodId:this.$route.query.product_Id,
            comment:[
            ]
        }
    },components:{
        headerView
    },methods: {

        showTab(){
            this.isHide=!this.isHide
        },
    },
    created() {
        //图片路径
           this.baseUrl=this.url
          var url = "goods/comment_list"
            // 获取评论列表 	goods/comment_list
            // 参数：
            // token
            // goods_id
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value
            params.append('goods_id', this.goodId);       //你要传给后台的参数值 key/value
            this.$axios({
                    method:"post",
                    url:url,
                    data:params
                }).then((res)=>{
                   
                  if(res.data.status===1){
                      console.log(res)
                     this.comment = res.data.data
                 
                  }
                })
    },
    filters:{
            // 价格过滤器
            formatDate: function (value) {
                
                let date = new Date(value*1000);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
              
                return y + '-' + MM + '-' + d 
            }
            },
}
</script>
<style lang="stylus" scoped>

   .rightBtn>img
       height 50px
       width 50px
    header 
        width 100%
        height 88px
        line-height 88px
        background-color #323232
        color #fff
        text-align center
        position relative
        z-index 99
        position fixed
    .homebuttom 
        background-size: 100% 100%;
        color: #fff;
        height 355px
        overflow: hidden;
        padding-top: 17px;
        position: absolute;
        right: .2rem;
        top: 80px
        width: 280px
        z-index: 2;
       .ul-arr 
            background-color: #434343;
            -webkit-transform: rotate(45deg);
            height: 42px
            position: absolute;
            right 30px
            top: .1rem;
            transform: rotate(45deg);
            width: 42px
        .homebuttom   ul 
               border-radius: .25rem;
               height: 338px
               overflow: hidden;
               padding: 1px 0;
               width:100%
               background-image: linear-gradient(#434343,#171717);
        .homebuttom   ul   li
                    float: left;
                    height: 84px
                    line-height: 84px
                    overflow: hidden;
                    padding-left:40px
                    width: 100%;
        ul   li   span
                            border-bottom: 1px solid #444;
                            color: #fff;
                            display: block;
                            float: left;
                            font-size: 30px
                            height: 83px
                            padding-left: 40px
                            width: 190px
                            text-align left
       .homebuttom ul li .iconfont
            display: block;
            float: left;
            height 40px
            width 40px
            margin-top 20px
    
    //评价
    .goods-comments
            padding-top:88px
            background #ffffff
    
    .goods-comments .comment-item 
            border-bottom: 2px solid #e0e0e0;
            padding: 0 28px;

    .goods-comments .comment-item .user-info 
            max-width: 100%;

    .goods-comments .comment-item .user-name 
            color: #444;
            float: left;
            font-size: 25px
            line-height: 62px;
            max-width: 198px
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
    
     .goods-comments .comment-item .detail-content,.goods-comments .comment-item .goods-spec 
            color: #444;
   
    .goods-comments .comment-item .goods-spec 
            display: inline-block;
            float: left;
            height: 62px
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

    .goods-comments .comment-item .comment-time, .goods-comments .comment-item .goods-spec 
            font-size: 25px
            line-height: 62px;
    
    .goods-comments .comment-item .goods-size 
            float: left;
            line-height: 61px

    .goods-comments .comment-item .detail-content 
            font-size: 28px
            line-height: 36px
    
    .goods-comments .comment-item .comment-time 
            color: #c1c1c1;

    .img   .eveImg
            float left
            height 100px
            width 33.3%
    .img   .eveImg img 
            height 100%
            width 100%

</style>

