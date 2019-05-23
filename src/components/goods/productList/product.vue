<template>
    <!-- 商品列表 -->
    <div class="productL-box">
          <header>
                <headerView :custom-title="searchInfo"  rightNone>
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
                      <li v-for="item in keywo" :key="item.id" @click="searchTo(item.goods_name)">
                          <span class="keyword">{{item.goods_name}}</span>
                          <span class="">
                              <i class="right-arrow"></i>
                          </span>
                      </li>
            </ul>
        <div class="good-list-page" v-if="keywo.length===0 || value===''">
                <div class="filter-tab">
                     <ul class="list-nav clearfloat" >
                        <li v-for="item in list" :key="item.id" class="buriedpoint" :class="[listId==item.id?'active':'',item.class]"  :data-ip="item.data"   @click.passive='setlocation(item.id,item.data)'>
                            <a href="javascript:void(0);" >
                                <span >{{item.name}}</span>
                                <span class="iconfont drop" v-html="item.s" v-if="!item.isHide">
                                </span>
                                <span class="icon" v-if="item.isHide">
                                     <i class="iconfont up"   :class="{cur:!isCur}">&#xe609;</i>
                                     <i class="iconfont down" :class="{cur:isCur}">&#xe606;</i>
                                </span>
                             </a>
                         </li>
                    </ul>
                    <ul class="drop-list"  :class="{hide:drop}">
                            <li  v-for="item in discount" :key="item.id"  :data-ip="item.data" :data-text="item.name" :class="[indexx==item.id?'active':'',item.class]" @click.passive='setloca(item)'>
                                <span>{{item.name}}</span>
                                <span class="chose"></span>
                            </li>
                        </ul>
                </div>
                <!-- 列表 -->
                <div id="goods-container" class="goods-container clearfloat">
               <div>
                     <div class="good-info "  v-for="(item,index) in proList" :key="index" :data-good-id="item.pid" :data-id="item.cat_id" :data-bp-id="item.goods_name">
                            <div class="tag-container clearfloat">
                                 <p class="good-tag new-tag" v-if="newState">NEW</p>
                            </div>
                            <div class="good-detail-img">
                                <router-link class="good-thumb" :to="'/details?goods_id='+item.goods_id" :title="item.desc">
                                        <img class="lazy"   :alt="item.goods_name" :src="baseUrl+item.img" style="display: block;">
                                </router-link>
                                <div class="similar-c">
                                <div class="bg"></div>
                                <a href="//m.yohobuy.com/product/similar?skn=52053768">找相似</a>
                            </div>            </div>
                                        <div class="good-detail-text">
                                <div class="name">
                                    <router-link class="good-thumb" :to="'/details?goods_id='+item.goods_id" :title="item.desc">{{item.goods_name}}</router-link>
                                </div>
                                <div class="price">
                                        <span class="sale-price no-price">
                                            ¥{{item.price}}
                                            <!-- {{baseUrl+item.img}} -->
                                        </span>
                                </div>
                                <a class="similar-btn iconfont">&#xe60b;</a>
                            </div>
                    </div>
                </div>
                <div class="no-result-new" v-if="searchInfo && proList.length===0">
                    <p>没有找到相关商品</p>
                    <p>试试搜索别的看看</p>
               </div>
                    <!-- 筛选 -->
                <div class="filter-mask" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" :class="{hide:screen}">
                  <div class="filter-body">
                                <ul class="classify">
                                <!-- <li class="classify-item " v-for="item in screenList" :key="item.id" :data-ip="item.data" :class="{active:item.name==classifyName}" @click="classifyNa(item.name)">
                                    <p class="shower">
                                         <span class="title">{{item.name}}：</span>
                                         {{item.title}}
                                    </p>
                                    <ul  class="sub-classify" data-type="gender">
                                        <li class="sub-item" v-for="(items,index) in item.classify" :key="index" :class="{chosed:items.data==classifyIndex}" @click="classifyI(items.data,items.id)">
                                            {{items.name}}
                                            <i class="iconfont chosed-icon">&#xe6ba;</i>
                                        </li>
                                    </ul>
                                </li> -->
                                </ul>
                   </div>
                </div>
                 </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView'
import {Toast,Dialog} from "vant"
export default {
    data(){
        return{
          //搜索title
            value:'',
          //商品分类id
            cat_id:this.$route.query.cat_id,
          //搜索
            searchInfo:'商品列表',

          //头部显示导航
             isHide:true,

          //选择默认 
             drop:true,

          //选中筛选
             screen:true,
          
          REQUIRE: true,
          
          //筛选左边
          classifyName:"性别",

          //筛选右边种类
          classifyIndex:0,
          classifyId:1,

          //分类id
        //   cat_id:12,
          sort:'ASC', 
          page:1,
        
        //分类列表
        proList:[],
        baseUrl:'',
        

        //新品
        newState:false, //新品状态
        
        //搜索信息
        keywo:[],


             listId:1,
             indexx:1,
             isCur:false,
             list:[
                 {id:1,name:"默认",data:"default",s:"&#xe605",class:'default'},
                 {id:2,name:"新品",data:"new",s:"",class:'new',},
                 {id:3,name:"人气",data:"popularity",s:"",class:'popularity',},
                 {id:4,name:"价格",data:"price",s:"&#xe605",isHide:true,class:'price'},
                 {id:5,name:"筛选",data:"filter",s:"&#xe605",class:'filter'},
             ],
             discount:[
                 {id:1,name:"默认",text:'默认',data:'default',class:'default'},
                 {id:2,name:"折扣从高到低",text:'折扣',data:'discountt_0',class:'discount dec'},
                 {id:3,name:"折扣从低到高",text:'折扣',data:'discountt_1',class:'discount asc'}
             ],
             screenList:[
                 {id:1,name:"价格",data:"classify_所有价格",title:"所有价格",
                     classify:[
                     {id:1,name:"所有价格",data:0},
                     {id:2,name:"￥0-189",data:6},
                     {id:3,name:"￥190-289",data:7},
                     {id:4,name:"￥300-769",data:8},
                     {id:5,name:"￥769以上",data:9},
                 ]
                 
                 },
             ]
        }
    },components:{
        // 公告头部
        headerView,
    },methods: {

        showTab(){
            this.isHide=!this.isHide
        },
        setlocation(id,ip){
             var url=""
             this.listId=id

            if(this.list[0].data==ip){//如果是默认
                  
                   this.drop=!this.drop

                // 
                if(this.indexx==1){ //选中的下标为一
                  if(this.searchInfo){  //如果是搜索
                      this.searchMo()
                  }else{
                      this.ajax()
                  }
                      
                }
                if(this.indexx==2){ //选中的下标为二
                     
                      this.isCur=false

                      this.getGoodsListPirce()//发送请求
                     
                }else if(this.indexx==3){
                     
                      this.isCur=true

                      this.getGoodsListPirce()//发送请求
                }

            }else{

                this.drop=true  
            }

            if(this.list[1].data==ip){//新品
            
              
                // 取消上一次请求
                // this.cancelRequest();
               var params = new URLSearchParams();
               params.append('goods_attr', 3);  
               params.append('page', this.page);       
               if(this.searchInfo){   //是搜索
                    url = 'search/search'
                    params.append('token', this.$store.getters.optuser.Authorization);           //token
                    params.append('keywords', this.searchInfo);          
               }else{
                    url="/goods/category"
                    params.append('cat_id', this.cat_id);           //token
               }
               this.$axios({
                    method:"post",
                    url:url,
                    data: params
                    }).then((res)=>{
                        if(res.data.status === 1){
                            this.proList= '' //清空
                            this.proList=res.data.data.goods_list
                            this.newState=true;
                        }else{  
                            Dialog.alert({
                                    message:res.data.msg
                            })
                        }
                    })

              
            }else{

                this.newState=false;

            }

            if(this.list[2].data==ip){//人气
               
                 // 取消上一次请求
                // this.cancelRequest();
                       
               var params = new URLSearchParams();
                    params.append('goods_attr', 3);   
                    params.append('page', this.page);        
               if(this.searchInfo){   //是搜索
                    url = 'search/search'
                    params.append('token', this.$store.getters.optuser.Authorization);           //token
                    params.append('keywords', this.searchInfo);          
               }else{
                    url="/goods/category"
                    params.append('cat_id', this.cat_id);           //token
               }
               this.$axios({
                    method:"post",
                    url:url,
                    data: params
                    }).then((res)=>{
                        if(res.data.status === 1){
                            this.proList= '' //清空
                            this.proList=res.data.data.goods_list;
                       
                        }else{  
                            Dialog.alert({
                                    message:res.data.msg
                            })
                        }
                    })

                
              

            }
            
            if(this.list[3].data==ip){ //如果是价格

                this.isCur=!this.isCur

                this.getGoodsListPirce()//发送请求

            }else{

                 this.isCur=false  
            }

            if(this.list[4].data==ip){ //筛选

                this.screen=!this.screen

            }else{

                this.screen=true

            }
           
        },

        setloca(item){

            this.indexx=item.id  //选中

            this.list[0].name=item.text  //改变tabtext

            this.drop=!this.drop 

            if(item.id==2){
                
                this.isCur=false

                this.getGoodsListPirce()//发送请求

            }else if(item.id==3){

                this.isCur=true

                this.getGoodsListPirce()//发送请求

            }else{

               if(this.searchInfo){  //如果是搜索
                      this.searchMo()
                  }else{
                      this.ajax()
                  }

            }
            
        },

        //筛选左边选中
        classifyNa(name){
          this.classifyName=name
        },

        //筛选右边选中
        classifyI(i,s){
          this.classifyIndex=i
          this.classifyId=s
        },

        getGoodsListPirce(){
         var url 
         var param
        //  console.log(this.isCur)
        if(this.isCur){  //升序

                     param = {
                            // 请求时传点击的价格区间数据给后台
                            sort:this.sort="ASC" // 点击的价格区间
                       }

        }else if(!this.isCur){

                     param = {
                            // 请求时传点击的价格区间数据给后台
                            sort:this.sort="DESC" // 点击的价格区间
                    }
        }
         // 取消上一次请求
            // this.cancelRequest();
                var params = new URLSearchParams();
                    params.append('sort', param.sort);           //token
               if(this.searchInfo){   //是搜索
                    url = 'search/search'
                    params.append('token', this.$store.getters.optuser.Authorization);           //token
                    params.append('keywords', this.searchInfo);          
               }else{
                    url="/goods/category"
                    params.append('cat_id', this.cat_id);           //token
               }
               this.$axios({
                    method:"post",
                    url:url,
                    data: params
                    }).then((res)=>{
                        if(res.data.status === 1){
                            this.proList= '' //清空
                            this.proList=res.data.data.goods_list
              
                        }else{  
                            Dialog.alert({
                                    message:res.data.msg
                            })
                        }
                    })
                   
    },
     cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        },
        scrollBottom() {
        if (((window.screen.height + document.body.scrollTop) > (document.body.clientHeight)) && this.REQUIRE) {
          // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据 this.REQUIRE = false;
          
        }
      },
      //页面默认
      ajax(){
             var url = "/goods/category"
                var params = new URLSearchParams();
               params.append('cat_id',this.cat_id);           //token
               this.$axios({
                    method:"post",
                    url:url,
                    data: params
                    }).then((res)=>{
                        if(res.data.status === 1){
                            this.proList=res.data.data.goods_list
                        }else{  
                            Dialog.alert({
                                    message:res.data.msg
                            })
                        }
                    })
                
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
            // this.searchInfo =  this.$route.query.query;
            var url = 'search/search'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);           //token
            params.append('keywords', value);           //搜索关键字
            params.append('sort','' );           
            params.append('goods_attr','' );           
            params.append('page', '');          //页码
            if(value == '' || value == ' '){
                return
            }
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
                  Toast('搜索不能为空！')
            }else{
                this.$router.push('/productLsit?query='+value);
                this.$router.go(0)
            }
        },
        searchTo(value){
                this.$router.push('/productLsit?query='+value);
                this.$router.go(0)
        },
      //搜索默认
      searchMo(){
               let url = 'search/search'
               var params = new URLSearchParams();
               params.append('token', this.$store.getters.optuser.Authorization);           //token
               params.append('keywords', this.searchInfo);           //token
               this.$axios({
                    method:"post",
                    url:url,
                    data: params
                    }).then((res)=>{
                        if(res.data.status === 1){
                            this.proList=res.data.data.goods_list
                        }else{  
                            Dialog.alert({
                                    message:res.data.msg
                            })
                        }
                    })
      }

    },

    mounted(){
             
        // 添加滚动事件，检测滚动到页面底部
      window.addEventListener('scroll', this.scrollBottom)
    },
    created() {
        //图片路径
           this.baseUrl=this.url
        //    获取搜索信息
            // 搜索 search/search
            // 参数：
            // token
            // keywords
            // sort
            // goods_attr
            // page
            this.searchInfo =  this.$route.query.query;
            if(this.searchInfo){
                this.searchMo()
           }else{
                this.ajax()
           }
    },
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

        
        .good-list-page .drop-list 
            background: #fff;
            padding-left: 30px
            position: absolute;
            width: 100%;
            z-index: 10;
        
        .good-list-page .drop-list .active 
            color: #444;


        .good-list-page .drop-list li 
            border-bottom: 1px solid #e0e0e0;
            color: #b0b0b0;
            font-size: 25px;
            height: 87px
            line-height: 87px
            width: 100%;
        
        .good-list-page .drop-list .active .chose 
            background-image: url('../../../../static/img/public/chose.7fe7f1efd9.png');
            background-repeat: no-repeat;
            background-size: 100%;
            display: inline-block;
            float: right;
            height: 22px;
            margin-right: 30px;
            margin-top: 33px;
            width: 30px;

        
        // 列表
        .good-list-page .goods-container 
            min-height: auto!important;
            padding-left: 15px
            padding-top: 8px
            position: relative;

            .good-info 
                float: left;
                height: 526px
                margin: 10px 15px 40px;
                width: 45.9%

       .good-info .tag-container 
                height: 28px
                overflow: hidden;
                width: 100%;
        
        .good-detail-img 
                height: 368px
                position: relative;
         
         .good-detail-img img 
                display: block;
                height: 368px
                width: 100%;
        
        //找相似
        .good-detail-img .similar-c 
            bottom: 0;
            display: none;
            height: 100%;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
        
        .good-detail-img .similar-c .bg 
            background-color: #000;
            height: 100%;
            opacity: .6;
            width: 100%;
        
        .good-detail-img .similar-c a 
            background-color: #d0021b;
            border-radius: 50%;
            color: #fff;
            display: block;
            font-size: 30px;
            height: 120px
            left: 50%;
            line-height: 120px
            margin-left: -60px
            margin-top:-60px
            position: absolute;
            text-align: center;
            top: 50%;
            width: 120px
    
   //
    .good-detail-text 
            position: relative;
    

    .good-detail-text .name a, .good-detail-text .price 
            -webkit-transform: scale(.9);
            font-size: 25px
            transform: scale(.9);


        .good-detail-text .name a 
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: #444;
            display: -webkit-box;
            height: 70px
            line-height: 25px
            margin: 15px 10px;
            min-height: 50px
            overflow: hidden;
            padding: 5px 0;

    .good-detail-text .price 
            line-height: 30px
            white-space: nowrap;
    
    .good-detail-text .price .sale-price.no-price 
            color: #000;


    .good-detail-text .price .sale-price 
           color: #d62927;
    

    .good-detail-text .similar-btn 
            bottom: -32px
            color: #b0b0b0;
            font-weight: 700;
            height: 80px
            line-height: 80px
            position: absolute;
            right: 0;
            text-align: center;
            width: 50px
   

//    新品
        .good-info .tag-container .good-tag:last-child 
            margin-right: 0;

        .good-info .tag-container .new-tag 
            background-color: #78dc7e;
            color: #fff;
            width: 60px

        .good-info .tag-container .good-tag 
            box-sizing: border-box;
            display: block;
            float: left;
            font-size: 25px
            height: 28px
            line-height: 28px
            margin-right: 1px;
            text-align: center;
     
    //  筛选
    .filter-mask 
            background: rgba(0,0,0,.1);
            height: 100%;


  .filter-body, .filter-mask  
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 12;

   .filter-body 
            background: #fff;
            color: #000;
            cursor: pointer;
            font-size: 25px;
            height: 1000px
    
    .filter-body .classify 
            background: #f8f8f8;
            height: 100%;
            width: 50%;

    .filter-body .classify>li.active 
            background: #fff;

    .filter-body .classify>li 
            height: 120px
            line-height: 120px
    
    .filter-body .classify>li .shower 
            color: #333;
            overflow: hidden;
            padding-left: 1rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;

    .filter-body .classify>li>* 
            box-sizing: border-box;
   
    .filter-body .classify>li .title 
            color: #000;
            float: left;
    
    .filter-body .active>.sub-classify 
            display: block;

    .filter-body .sub-classify 
            -webkit-overflow-scrolling: touch;
            display: none;
            height: 880px
            left: 50%;
            overflow: auto;
            position: absolute;
            top: 0;
            width: 50%;
    
    .filter-body .sub-classify>li 
            border-bottom: 2px solid #e6e6e6;
            height: 119px
            line-height: 119px
            overflow: hidden;
            padding-left:30px
            text-overflow: ellipsis;
            white-space: nowrap;
    
    .filter-body .sub-classify .chosed .chosed-icon 
            display: inline;


    .filter-body .sub-classify .chosed-icon 
            display: none;

.good-list-page .no-result-new 
    padding-bottom: 70px
    padding-top: 60px
    text-align: center;

.good-list-page .no-result-new p 
    color: #ccc;
    font-size: 30px
    margin-bottom: 15px

.good-list-page .no-result-new p:first-child 
    color: #444;
    font-size: 50px

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
</style>
