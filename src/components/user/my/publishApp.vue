<template>
    <div class="appraise">
         <headerView custom-title="发表评价" custom-fixed >
                    <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../../static/img/public/backBtn.png" />
                    </div>
                    <span class="rightBtn" slot="rightBtn" >发布</span>
        </headerView>
         <div class="appraise-info">
              <div class="info-grade">
                   <div class="agree-with">
                       <img src="../../../../static/img/user/appraise/goods.png" alt="" class="goods">
                       描述相符
                   </div>
                   <van-rate
                    v-model="value"
                    :size="25"
                    color="#f44"
                    void-icon="star"
                    void-color="#eee"
                    @change="goodsValue"
                    />
                    <div class="good">{{goods}}</div>
              </div>
              <div class="info-input">
                  <textarea name="" id="" cols="30" rows="5" placeholder="宝贝满足你的期待吗? 说说你的使用心得，分享给想买的他们吧"></textarea>
              </div>
              <!-- 上传图片 -->
              <div class="uploader">
                    <div class="uploader-add" v-for="(item,index) in imgList" :key="index">
                        <div class="closeIcon" v-if="isup==false" @click="closeImg(index)">
                            <img src="../../../../static/img/user/appraise/close.png" alt="" class="close" >
                        </div>
                        <img src="../../../../static/img/user/appraise/addimg.png" alt="" class="addImg" v-if="isup==true||index==index">
                        <img :src="addImg" alt="" class="addI"   v-if="isup==false||indexx==index">
                        <p class="add-img" v-if="isup||index==1">添加图片</p>
                        <van-uploader :after-read="onRead" >
                        </van-uploader>
                    </div>

              </div>
              <div class="anonymity">
                    <div class="anonymity-add">
                        <img :src="checkedT.checked?'../../../../static/img/user/appraise/gou.png':'../../../../static/img/user/appraise/gouactive.png'" alt="" class="addImg" @click="anonymity">
                        <span>匿名</span>
                    </div>
                    <div class="anonymity-text">
                        {{checkedT.text}}
                    </div>

              </div>
         </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView.vue'
export default {
    data(){
        return{
         value: 3,
        
         indexx:1,

         imgList:[
             {}
         ],

         isup:true,
         
         addImg:'',

         goods:'一般',

         checkedT:{
             checked:true,
             text:'你的评价能帮助其他小伙伴哟'
         }
        }
    }
    ,components:{
        headerView
    },
    methods: {
         goodsValue(e){
             if(this.value==1){
                 this.goods="非常差"
             }
             if(this.value==2){
                 this.goods="差"
             }
             if(this.value==3){
                 this.goods="一般"
             }
             if(this.value==4){
                 this.goods="好"
             }
             if(this.value==5){
                 this.goods="非常好"
             }
         },
         onRead(file){
            // this.indexx=index
            this.imgList.push(1)
            this.addImg=file.content
            this.isup=false;
            console.log(this.imgList)
        },
         anonymity(){
              this.checkedT.checked=!this.checkedT.checked
              if(this.checkedT.checked){
                  console.log(this.checkedT.checked)
                  this.checkedT.text="你的评价能帮助其他小伙伴哟"
              }else{
                  this.checkedT.text="你写的评价会以匿名的形式展现"
              }
         },
         //删除照片
         closeImg(index){
             console.log(this.imgList.length==1)
             if(this.imgList.length==1){
                   this.isup=true
              }else{
                  this.imgList.splice(index,1)
              }
              
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
      height 120px
      line-height 125px
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
       text-align center

   .info-grade .agree-with .goods,.anonymity-add>img
       height 60px
       vertical-align: middle;
       margin-bottom  6px

    .appraise-info .info-input 
       padding 20px

    .appraise-info .info-input      textarea
       width 100%
       border none
       font-size 20px

    .appraise-info .uploader
       padding 0  20px 20px 20px
       display flex

    .appraise-info .uploader .uploader-add
       width 30%
       height 200px
       border 2px solid #c6c2c2
       border-style dotted
       position relative
       margin-left 10px
         
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
          display: block;
    .closeIcon
         position absolute
         right -20px
         top -20px
         width 50px
         height 50px
         z-index 100
    .closeIcon>img
         width 50px
         height 50px
</style>

