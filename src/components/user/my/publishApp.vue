<template>
    <div class="appraise">
         <headerView custom-title="发表评价" custom-fixed >
                    <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../../static/img/public/backBtn.png" />
                    </div>
                    <span class="rightBtn" slot="rightBtn"  @click="publish">发布</span>
        </headerView>
         <div class="appraise-info" v-for="(item,index) in orderList" :key="index">
              <div class="info-grade">
                   <div class="agree-with">
                       <img :src="baseUrl+item.img" alt="" class="goods">
                       描述相符
                   </div>
                   <van-rate
                    v-model="item.value"
                    :size="25"
                    color="#f44"
                    void-icon="star"
                    void-color="#eee"
                    @change="goodsValue(item.sku_id)"
                    />
                    <div class="good">{{item.values}}</div>
              </div>
              <div class="info-pro">
                    <h3>{{item.goods_name}}</h3>
                    <p>
                        <span>{{item.spec_key_name}}</span>
                        <span>x{{item.goods_num}}</span>
                    </p>
              </div>
              <div class="info-input">
                  <textarea name="" id="" cols="30" rows="5" placeholder="宝贝满足你的期待吗? 说说你的使用心得，分享给想买的他们吧" maxlength="250" v-model="item.textmsg"></textarea>
              </div>
              <!-- 上传图片 -->
              <div class="uploader">
                    <div class="uploader-add" >
                        <!-- 显示图片 -->
                         <!-- <div class="hasPic" v-if="imgUrls.length>0" v-for="(item,index) in imgUrls">
      <img class="seledPic" ref="picture" :src="item?item:require('../../static/Images/imagebj.jpg')" name="avatar" @click="bigImg(index)">
      <img class="delect" src="../../static/Images/del.png" @click="delect(index)">
    </div>   -->
                        <div class="closeIcon" v-if="item.imgUrls.length>0"  v-for="(itemz,index) in item.imgUrls" :key="index">
                            <img class="seledPic" :src="itemz?itemz:require('../../../../static/img/user/appraise/up.jpg')" name="avatar" @click="bigImg(index,item)">
                            <img src="../../../../static/img/user/appraise/close.png" alt="" class="close"  @click="closeImg(index,item)">
                        </div>
                        <!-- 浏览显示图片 -->
                        <div class="imgMask" v-if="item.showBigImg" @click.stop="item.showBigImg=!item.showBigImg">
                            <div class="showImg">
                                <mt-swipe :auto="0" :show-indicators="false" @change="handleChange(index,item)" :continuous="false" :defaultIndex="num">
                                <mt-swipe-item v-for="(items,index) in item.imgUrls" :key="items.id">
                                    <div class="num"  >{{index+1+'/'+item.imgUrls.length}}</div>
                                    <img :src="item.imgUrls[index]" class="img"/>
                                </mt-swipe-item>
                                </mt-swipe>
                            </div>
                        </div>
                        
                        

                        <div class="selPic" v-if="item.imgUrls.length<6"> 
                            <img src="../../../../static/img/user/appraise/up.jpg" alt="" class="addI"  >
                                <p class="add-img" >{{item.imgText}}</p>
                            <input type="file" maxlength="" class="input-file" multiple="multiple" name="avatar" ref="avatarInput" @change="onRead($event,item)"  accept="image/gif,image/jpeg,image/jpg,image/png" >
                        </div>
                    </div>

              </div>
              <div class="anonymity">
                    <div class="anonymity-add">
                        <img :src="item.checked?'../../../../static/img/user/appraise/gouactive.png':'../../../../static/img/user/appraise/gou.png'" alt="" class="addImg" @click="anonymity(item)">
                        <span>匿名</span>
                    </div>
                    <div class="anonymity-text">
                        {{item.text}}
                    </div>

              </div>
         </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView.vue'

import {Swipe, SwipeItem} from 'mint-ui'
import {MessageBox, Toast} from 'mint-ui'
import { List } from 'vant';


export default {
    data(){
        return{
         //商品图片路径
        baseUrl:'',
        //订单id
         id : this.$route.query.order_id,
        //评分
         value: 3,
        
         goods:'一般',
        
        //订单列表
         orderList:[],

            imgUrls: [],   //循环上传图片

            num: 0,

            avatar: '',

            file: '',
        
        }
    },created () {
           //图片路径
            this.baseUrl=this.url
            // 获取订单商品评论列表 	order/order_comment_list
            // 参数：
            // token
            // order_id
            var url = 'order/order_comment_list';
            var params = new URLSearchParams();
            params.append('token',this.$store.getters.optuser.Authorization);
            params.append('order_id',this.id);
            this.$axios({
                            method:"post",
                            url:url,
                            data: params
            }).then((res)=>{

                if(res.data.status===1){
                    this.orderList = res.data.data
                    for(var item in this.orderList){
                       this.orderList[item].value = 5;
                       this.$set(this.orderList[item],'values','非常好')
                       this.$set(this.orderList[item],'text','你的评价能帮助其他小伙伴哟')
                       this.$set(this.orderList[item],'imgUrls',[])
                       this.$set(this.orderList[item],'imgText','添加图片')
                       this.$set(this.orderList[item],'leftImages',0)
                       this.$set(this.orderList[item],'maxImages',6)
                       this.$set(this.orderList[item],'showBigImg',false)
                    }
                }else{
                    Toast(res.data.msg)
                }
            })
     }
    ,components:{
        headerView
    },
    methods: {
         goodsValue(id){
        
             this.orderList.map((data) => { 
                 if(id === data.sku_id){
  
                if(data.value==1){
                   
                    this.$set(data,'values','非常差')

                }
                if(data.value==2){
  
                     this.$set(data,'values','差')
                }
                if(data.value==3){
       
                     this.$set(data,'values','一般')
                }
                if(data.value==4){
           
                     this.$set(data,'values','好')
                }
                if(data.value==5){
  
                     this.$set(data,'values','非常好')
                }
                 }
             })
             
         },
         //上传图片
         onRead(e,item){
                
                    this.orderList.map((data) => { 
            
                    if(item.sku_id===data.sku_id){
                 if (e.target.files.length <= (item.maxImages - item.imgUrls.length)) {
                    for (var i = 0; i < e.target.files.length; i++) {
                    let file = e.target.files[i]
                    this.file = file

                    let reader = new FileReader()
                    let that = this
                    reader.readAsDataURL(file)
                    
                    reader.onload = function (e) {
    
                        item.imgUrls.push(this.result)
                     
                        that.imgUrls.push(this.result)
                    }
                    }
                    // 剩余张数
                    item.leftImages = item.maxImages - (item.imgUrls.length + e.target.files.length)
                    item.imgText = String(item.maxImages - (item.imgUrls.length + e.target.files.length)) + '/' + String(item.maxImages)
                } else {
                    Toast('只能选择' + (item.maxImages - item.imgUrls.length) + '张了')
                }
                            }
                    })
                    
        },

         anonymity(item){
             this.orderList.map((data) => { 
              if(item.sku_id===data.sku_id){
              if(item.checked){
                   item.text="你的评价能帮助其他小伙伴哟";
                   this.$set(item,'checked',false)
              }else{
                  item.text="你写的评价会以匿名的形式展现"
                   this.$set(item,'checked',true)
              }
                    }
             })
              
         },
         onChange(index) {
            // this.indexx = index+1;
            // console.log(index)
     
            },
         //删除照片
         closeImg(index,item){
                item.imgUrls.splice(index, 1)
                item.leftImages++
                if (item.leftImages === item.maxImages) {
                    item.imgText = '上传图片'
                } else {
                    item.imgText = String(item.leftImages) + '/' + String(item.maxImages)
                }
         },
         handleChange (index,item) {
            this.num = index
        },

        bigImg (index,item) {
            item.showBigImg=true;
            this.num = index
        },
        //发布评论
    publish(){
            // order/order_comment
            //参数
            // order_id
            // goods_id
            // sku_id
            // content
            // star_rating
            // img
            var params = new URLSearchParams();
            var returnObj = new Object();//创建一个对象
            var url = 'order/order_comment'
            var order_list = [];
            for(var i=0;i<this.orderList.length;i++){
                var item = this.orderList[i];
                returnObj.order_id = this.id;
　　　　　　　　  returnObj.goods_id = item.goods_id;
                returnObj.sku_id = item.sku_id;
                returnObj.content = item.textmsg;
                returnObj.star_rating =item.value;
                returnObj.img = item.imgUrls;
                
                order_list[i] = returnObj;
                var returnObj = new Object();//创建一个对象
            }
         console.log(order_list)
            var s = JSON.stringify(order_list)
                params.append('token',this.$store.getters.optuser.Authorization)
                params.append('comments', s);
                this.$axios({
                            method:"post",
                            url:url,
                            data: params
                }).then((res)=>{
                    if(res.data.status === 1){
                        Toast(res.data.msg)
                    }else{
                        Toast(res.data.msg)
                    }
                })
    }

    },

}
</script>
<style lang="stylus" scoped>
 
   .headerView .rightBtn
      color #ff5000
   
   .van-rate .van-rate__item .van-rate__icon
      font-size 50px!important

   .appraise-info
      padding-top 88px
      background #ffffff
      
   .appraise-info .info-grade
      display flex
      height 300px
      line-height 300px
      padding 10px
      padding-bottom 20px
      justify-content space-around
      border 2px solid #eee
     
   .info-grade .agree-with,.info-grade .good
       font-size 28px
       line-height 100px
    
    .info-grade .good
       color #666
       width 100px
       line-height 270px
       text-align center

   .info-grade .agree-with .goods,.anonymity-add>img
       height 270px
       width 200px
       vertical-align: middle;
       margin-bottom  6px

    .appraise-info .info-input,.info-pro
       padding 20px
    .info-pro h3
       font-size 30px
    .info-pro span 
       font-size 25px
       color #666666
    .info-pro span:last-child
       float right
    .appraise-info .info-input      textarea
       width 100%
       border none
       font-size 30px

    .appraise-info .uploader
       padding 0  20px 20px 20px
       display flex

    .appraise-info .uploader .uploader-add
       width 100%
       
       display flex
       flex-wrap wrap
         
    .uploader .uploader-add     .add-img
       position absolute
       bottom  0
       height 40px
       width 100%
       text-align center
       color #666

     .uploader .uploader-add   .addImg
       height 70px
       width 70px
       position absolute
       top 30%
       left 0
       bottom 0
       right 0
       display block
       margin 0 auto
    
    .van-uploader
        width 100%
        height 100%
        position: absolute;
        top: 0;

    
    .anonymity
       padding 0  20px 20px 20px
       display flex
       justify-content space-between
       height 70px
       line-height 70px
    
    .anonymity-add>img
       width 40px
       height 40px

    .anonymity-add>span,.anonymity-text
       font-size 26px

    .anonymity-text
       color #666 

    .uploader .uploader-add .addI
          height 100%
          width 100%
          margin  0 auto
          display: block;
         
    .closeIcon
        position relative
        height 100%
        z-index 100
        width 30%
        height 200px
        border 2px solid #c6c2c2
        border-style dotted
        margin-left 15px
        margin-top 20px
    .closeIcon .close
         position absolute
         top -20px
         right -20px
         width 50px
         height 50px
         
    .closeIcon   .seledPic
         width 100%
         height 100%

    .selPic
        position relative
        height 100%
        z-index 10
        width 30%
        height 200px
        margin-left 15px
        margin-top 20px
        .input-file
            position absolute
            width: 100%
            height: 100%
            top 0
            background: red;
            opacity: 0;
      .imgMask
            position fixed
            height: 100%;
            width:100%;
            top:0px;
            left:0;
            z-index: 101;
            background:rgba(0,0,0,1);
  
  .num
            padding-top: 10px;
            color: white;
            font-size: 50px
            font-weight: bold;
            text-align center
  .showImg
            height: 100%;
            width: 100%;
            position: absolute;
            align-items: center;
            left: 0px;
            top:0;
  
  .img
            object-fit: scale-down;
            height: auto;
            width: 100%;
            height: 100%;
  
</style>

