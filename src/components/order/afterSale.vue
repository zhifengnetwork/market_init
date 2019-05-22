
<template>
<!-- 退款/售后 -->
    <div class="afterSale">
         <!-- 头部组件 -->
        <headerView custom-title="退款/售后"  rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="/static/img/public/backBtn.png" />
            </div>
        </headerView>
        <div class="page-aft-box">
             <div class="aft-list-info">
                 <div class="list-info">
                  <router-link to="">
                      <div class="aft-list">
                        <div class="aft-img">
                            <img src="" alt="">
                        </div>
                        <div class="aft-text">
                            <h3>美的（Midea） 三门冰箱 风冷无霜家</h3> 
                            <p >
                                <span  class="color">规格:升级版,颜色:星空灰,尺寸:大</span>
                            </p>
                        </div>
                        <div class="aft-num">
                            <p class="count">x1</p>
                        </div>
                       </div>
                  </router-link>
                  <div class="aft-state">
                       <div class="tui">退</div>
                       <span class="state">退货成功 退款成功</span>
                  </div>
                  <div class="order-opt">
                      <router-link to="/afterSale/afterDetails">
                      <span  class="btn examine">查看详情</span>
                      </router-link>
                      </div>
                 </div>
             </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../common/headerView.vue'
export default {
    data(){
        return{

        }
    },
    components:{
            headerView
        },
        created() {
            //图片路径
           this.baseUrl=this.url
           
        },
}
</script>
<style lang="stylus" scoped>
 .list-info
    margin-bottom 20px
    background-color #fff
 .aft-list
    display flex
    padding 20px 30px 0
    box-sizing border-box

 .aft-list .aft-img
    width 120px
    height 160px
    margin-right 18px
    img 
        width 100%
 .aft-list .aft-text
    flex 1
    font-size 26px
 .aft-list .aft-num
    width 120px
    color #9999a6
    text-align right 
    margin-top 10px
 .aft-list .aft-text h3
    line-height 34px
    font-size 26px
    color #000000
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp 2
    -webkit-box-orient vertical
    overflow hidden
    margin 10px 0
    font-weight normal 
 .aft-list .aft-text p
    line-height 40px 
    color #b6b6b6

 .aft-list .aft-num .count
    // margin-bottom 20px
    line-height 160px
 .order-opt
    border-top 2px solid #666666
    text-align right 
    padding 20px 30px 
    box-sizing border-box
 .order-opt .btn
    width 138px
    height 58px
    font-size 24px
    line-height 58px
    text-align center
    border 2px solid #000
    border-radius 5px
    display inline-block
    margin-left 20px
 .order-opt .btn.examine
    color: #ff976a;
    // background-color: #d0021b;
    border-color: #ff976a;
 .aft-state
    display flex
    padding 20px 30px
    box-sizing border-box
 .aft-state .tui
    border-radius 50%
    border-color #ed4d08
    border 2px solid #ed4d08
    color #ed4d08
    padding 2px
    // font-size 24px
    margin-right 20px
</style>
