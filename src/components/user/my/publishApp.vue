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
                  <textarea name="" id="" cols="30" rows="5" placeholder="宝贝满足你的期待吗? 说说你的使用心得，分享给想买的他们吧" maxlength="250"></textarea>
              </div>
              <!-- 上传图片 -->
              <div class="uploader">
                    <div class="uploader-add" >
                        <!-- 显示图片 -->
                         <!-- <div class="hasPic" v-if="imgUrls.length>0" v-for="(item,index) in imgUrls">
      <img class="seledPic" ref="picture" :src="item?item:require('../../static/Images/imagebj.jpg')" name="avatar" @click="bigImg(index)">
      <img class="delect" src="../../static/Images/del.png" @click="delect(index)">
    </div>   -->
                        <div class="closeIcon" v-if="imgUrls.length>0" v-for="(item,index) in imgUrls">
                            <img class="seledPic" :src="item?item:require('../../../../static/img/user/appraise/up.jpg')" name="avatar" @click="bigImg(index)">
                            <img src="../../../../static/img/user/appraise/close.png" alt="" class="close"  @click="closeImg(index)">
                        </div>
                        <!-- 浏览显示图片 -->
                        <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
                            <div class="showImg">
                                <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous="false" :defaultIndex="num">
                                <mt-swipe-item v-for="(item,index) in imgUrls" :key="item.id">
                                    <div class="num"  >{{index+1+'/'+imgUrls.length}}</div>
                                    <img :src="imgUrls[index]" class="img"/>
                                </mt-swipe-item>
                                </mt-swipe>
                            </div>
                        </div>
                        <div class="selPic" v-if="imgUrls.length<6"> 
                            <img src="../../../../static/img/user/appraise/up.jpg" alt="" class="addI"  >
                                <p class="add-img" >{{pictureNums}}</p>
                            <input type="file" maxlength="" class="input-file" multiple="multiple" name="avatar" ref="avatarInput" @change="onRead($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
                        </div>
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

import {Swipe, SwipeItem} from 'mint-ui'
import {MessageBox, Toast} from 'mint-ui'


export default {
    data(){
        return{
         value: 3,
        
         goods:'一般',

         checkedT:{
             checked:true,
             text:'你的评价能帮助其他小伙伴哟'
         },

         //上传图片
            showBigImg: false,
            
            maxImages: 6,

            leftImages: 0,

            pictureNums: '添加图片',

            imgUrls: [],   //循环上传图片

            num: 0,

            avatar: '',

            file: '',
        }
    },created () {
    this.avatar = this.imgUrl
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
         //上传图片
         onRead(e){
                    if (e.target.files.length <= (this.maxImages - this.imgUrls.length)) {
                    for (var i = 0; i < e.target.files.length; i++) {
                    let file = e.target.files[i]
                    this.file = file
                    console.log(this.file)
                    let reader = new FileReader()
                    let that = this
                    reader.readAsDataURL(file)
                    reader.onload = function (e) {
                        console.log(this.result)
                        that.imgUrls.push(this.result)
                    }
                    }
                    // 剩余张数
                    this.leftImages = this.maxImages - (this.imgUrls.length + e.target.files.length)
                    this.pictureNums = String(this.maxImages - (this.imgUrls.length + e.target.files.length)) + '/' + String(this.maxImages)
                } else {
                    Toast('只能选择' + (this.maxImages - this.imgUrls.length) + '张了')
                }
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
               this.imgUrls.splice(index, 1)
                this.leftImages++
                if (this.leftImages === this.maxImages) {
                    this.pictureNums = '上传图片'
                } else {
                    this.pictureNums = String(this.leftImages) + '/' + String(this.maxImages)
                }
         },
         handleChange (index) {
            this.num = index
            },
            bigImg (index) {
            this.showBigImg = true
            this.num = index
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

    .appraise-info .info-input 
       padding 20px

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
        z-index 100
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
            position: absolute;
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

