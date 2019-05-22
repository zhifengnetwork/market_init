
<template>
<!-- 退款/详情 -->
    <div class="after-details">
          <!-- 头部组件 -->
        <headerView custom-title="售后详情"  rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="/static/img/public/backBtn.png" />
            </div>
        </headerView>
        <div class="retreat-pege">
             <div class="retreat-stil">
               <p class="title-stil te">退款成功</p>
               <span class="time te">2018年 10 月 20 日 15:16</span>
             </div>
             <div class="retreat-sum info-msg">
                 <span>退款总金额</span>
                 <span class="price">￥79.00</span>
             </div>
             <div class="retreat-info">
                <div class="retreat-sum info-msg">
                    <span>退款信息</span>
                </div>
                <div class="info-details" v-for="item in afeter.goods_res" :key="item.id">
                    <div class="info-img">
                      <img :src="item" alt="">
                    </div>
                    <div  class="text">
                        <h3 >{{item.goods_name}}</h3>
                         <p >
                             <span  class="color">{{item.spec_key_name}}</span>
                        </p>
                        </div>
                </div>
                <div class="refund-info">
                    <ul>
                        <li>
                            <span>退款原因: </span>
                            <span class="nowal">尺码拍错</span>
                        </li>
                        <li>
                            <span>退款金额: </span>
                            <span class="nowal">￥{{afeter.order_amount}}</span>
                        </li>
                        <li>
                            <span>申请件数: </span>
                            <span class="nowal">1</span>
                        </li>
                        <li>
                            <span>申请时间: </span>
                            <span class="nowal">2018-10-10 09:23</span>
                        </li>
                        <li>
                            <span>退款编号: </span>
                            <span class="nowal">4564654564564156</span>
                        </li>
                        
                    </ul>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../common/headerView.vue'
import { Toast } from 'vant';
export default {
    data(){
        return{
                 orderId:this.$route.query.order_id,
                 afeter:[],
        }
    },
    components:{
            headerView
        },
        created() {
            //图片路径
           this.baseUrl=this.url
            // 订单详情 	der/order_detail
            // 参数：
            // token
            // order_id
             var url =  'order/order_detail'
             var params = new URLSearchParams();
                 params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value    tokne
                 params.append('order_id',this.orderId);
            this.$axios({
                            method:"post",
                            url:url,
                            data: params
            }).then((res)=>{
                if(res.data.status===1){
                    this.afeter = res.data.data
                    console.log(this.afeter)
                }else{
                    Toast(res.data.msg)
                }
            })


        },
        filters: {
            formatDate: function (value) {
                
                let date = new Date(value*1000);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
            }, 
}
</script>
<style lang="stylus" scoped>
 .retreat-stil
   padding 50px 30px 20px
   box-sizing border-box
   background #f66d32
   height 200px
   .te
    color #ffffff
    font-size 24px
   .title-stil
    font-size 30px
 .retreat-sum
   padding 40px
   box-sizing border-box
   background #ffffff
   display flex
   justify-content space-between
   margin-bottom 20px
   span  
     font-size 24px
   .price
     color #e34703
 .info-details
    display flex
    padding 0 20px 20px
 .info-details .info-img
    width 120px
    height 160px
    margin-right 18px
    background #ffffff
    img
     width 100%
  .info-details   .text
    flex 1
    font-size 26px
  .info-details   .text h3
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
  .info-details   .text p  
    line-height 40px 
    color #b6b6b6
 .refund-info
     background #ffffff
     padding 20px
     box-sizing border-box
 .refund-info ul li 
     display flex
     overflow hidden
 .refund-info ul li span 
     white-space nowrap
     margin-right 10px
     color #b6b6b6
 .refund-info ul li .nowal
     overflow hidden
     text-overflow ellipsis

</style>
