<template>
    <div calss="searchBox">
         <header>
                <headerView custom-title="搜索"  rightNone>
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
        <div class="sear-page zfwl-page">
            <!-- 搜索框 -->
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                @keyup="onSearch(value)"
                >
                <div slot="action" @click="onSSearch(value)">搜索</div>
            </van-search>
            <!-- 搜索关键字 -->
             <ul class="search-associate" v-if="value!=''">
                      <li v-for="item in keywo" :key="item.id" @click="">
                          <span class="keyword">{{item.goods_name}}</span>
                          <span class="">
                              <i class="right-arrow"></i>
                          </span>
                      </li>
            </ul>
                <!-- 热搜 -->
            <div class="hot-search-new " v-if="keywo.length===0 || value===''">
                <div class="now-hot">
                    <div class="hot-goods hot-title">热搜</div>
                    <div class="hot-goods"  v-for="item in hot" :key="item.id">
                        <router-link :to="'/productLsit?query='+item.keywords">
                            {{item.keywords}}
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- item -->
            <div class="search-item" v-if="keywo.length===0 || value===''">
                 <div class="itemOne">
                      <div class="search-group history-search">
                          <div class="search-content-title">
                              <h3 class="left">最近搜索</h3>
                              <i class="right">
                                  <img src="../../../static/img/user/userinfo/laji.png" alt="">
                              </i>
                          </div>
                          <div class="search-content">
                               <ul class="history">
                                   <li v-for="item in history" :key="item.id">
                                       <a href="">{{item.keywords}}</a>
                                   </li>
                               </ul>
                          </div>
                      </div>
                      <div class="search-group want-search" v-if="keywo.length===0  || value===''">
                        <h3>猜你想找</h3>
                        <div class="search-content">
                            <ul class="want clearfix">
                                    <li v-for="item in like" :key="item.id">
                                        <a href="javascript:void(0);">{{item.goods_name}}</a>
                                    </li>
                            </ul>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../common/headerView'
export default {
     data(){
         return{
              //头部显示导航
              isHide:true,

              //搜索关键字
              value:'',
              history: [],  //热搜
              hot: [],        //最近搜索
              like: [],       //猜你想找
              keywo:[],       //搜索列表
         }
     },
     methods: {
         //控制是否显示tab
         showTab(){
            this.isHide=!this.isHide
        },

        //搜索
        onSearch(value){
            // 搜索 search/search
            // 参数：
            // token
            // keywords
            // sort
            // goods_attr
            // page
            var url = 'search/search'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);           //token
            params.append('keywords', value);           //token
            params.append('sort','' );           //token
            params.append('goods_attr','' );           //token
            params.append('page', '');           //token
            if(value!=''){
                 this.$axios({
                 method:"post",
                 url:url,
                 data: params
                }).then((res)=>{
                    if(res.data.status === 1){
                       this.keywo=res.data.data.goods_list
                    }else{
                        Dialog.alert({
                         message:res.data.msg
                     })
                    }
                })
            }
        },
        onSSearch(value){
            if(value===''){
                 
            }else{
                this.$router.push('/productLsit?query='+value);
            }
        }
     },

     components:{
        // 公告头部
        headerView,
    },
    created()  {
        //获取搜索信息 search/get_search
        // 参数：
        // token
         var url = 'search/get_search'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);           //token
           this.$axios({
                 method:"post",
                 url:url,
                 data: params
                }).then((res)=>{
                    if(res.data.status === 1){
                        this.history=res.data.data.history
                        this.hot=res.data.data.hot
                        this.like=res.data.data.like
                    }else{  
                         Dialog.alert({
                                 message:res.data.msg
                         })
                    }
                })
    },
     
}
</script>

<style lang="stylus" scoped>
  
//搜索关键字内容
.search-associate 
    background: #ffffff
    position: absolute;
    width: 100%;
    z-index: 1;

.search-associate li 
    background: #ffffff
    box-sizing: border-box;
    clear: both;
    height:84px
    line-height: 84px
    margin-bottom:5px
    padding: 0 20px
    width: 100%;
    position relative

.search-associate .keyword 
    float: left;
    font-size: 30px
    max-width 80%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

.sear-page .hot-search-new  
    border-bottom: 2px solid #e0e0e0;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    background: #fff;

.sear-page .hot-search-new .now-hot
    background: #fff;
    line-height: 0;
    padding-bottom: 25px;
    padding-left: 30px;
    padding-top: 25px;

.sear-page .hot-search-new .hot-goods, .shop-index .search-area .hot-search-new .hot-goods
    background: #fff;
    border: 2px solid #e0e0e0;
    border-radius: 10px
    color: #000;
    display: inline-block;
    font-size: 25px
    height: 62px
    line-height:  62px
    margin-right: 15px
    overflow: hidden;
    padding: 0 20px
    text-overflow: ellipsis;
    white-space: nowrap;
    width: auto;

.sear-page .hot-search-new .hot-title
    border: none;
    color: #000;
    font-size: 40px
    padding: 0;

.sear-page .search-item
    background: #f0f0f0;
    padding-top: 30px

.sear-page .search-item .itemOne
    background: #fff;
    border-top: 2px solid #e0e0e0;
    padding: 30px

.sear-page .search-item .search-group
    background: #fff;

.sear-page .search-item .search-content-title
    height: 40px

.sear-page .search-item h3
    font-size: 30px
    margin-bottom: 20px
    color: #b0b0b0;

.sear-page .search-item .search-content-title .left
    float: left;

.sear-page .search-item .search-content-title .right
    float right

.sear-page .search-item .search-content
    box-sizing: border-box;
    clear: both;
    padding-bottom: 18px

.sear-page .search-item .history
    max-height: 261px
    overflow: hidden;


.sear-page .search-item .history li, .shop-index .search-area .search-item .history li 
    margin-right:15px

.sear-page .search-item li, .shop-index .search-area .search-item li 
    display: inline-block;
    margin-bottom: 15px
    margin-right: 15px
    max-width: 100%;
    overflow: hidden;

.sear-page .search-item .search-content a, .shop-index .search-area .search-items .search-content a 
    background: #fff;
    border: 2px solid #e0e0e0;
    border-radius: 10px
    font-size: 30px
    width: auto;

.sear-page .search-item a, .shop-index .search-area .search-item a 
    background: #f8f8f8;
    color: #000;
    float: left;
    font-size: 30px
    height: 60px
    line-height: 60px
    overflow: hidden;
    padding: 0 20px
    text-overflow: ellipsis;
    white-space: nowrap;

</style>
