<template>
    <div class="appraise">
         <headerView custom-title="发表评价" custom-fixed >
                    <div class="backBtn" slot="backBtn" @click="backBtn($router.go(-1))">
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
                    <div class="uploader-add">
                        <img src="../../../../static/img/user/appraise/addimg.png" alt="" class="addImg">
                        <p class="add-img">添加图片</p>
                        <van-uploader :after-read="onRead">
                        <!-- <van-icon name="photograph" /> -->
                        </van-uploader>
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
         
         goods:'一般'
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
         onRead(file) {
            console.log(file)
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
       margin-left 20px
       margin-right 20px
    
    .info-grade .good
       color #666
       width 100px

   .info-grade .agree-with .goods
       height 60px
       vertical-align: middle;
       margin-bottom  6px

    .appraise-info .info-input 
       padding 20px

    .appraise-info .info-input      textarea
       width 100%
       border none

    .appraise-info .uploader
       padding 0  20px 20px 20px

    .appraise-info .uploader .uploader-add
       width 200px
       height 200px
       border 2px solid #c6c2c2
       border-style dotted
       position relative

         
    .uploader .uploader-add     .add-img
       position absolute
       bottom  10px
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
       
</style>

