
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
               <p class="title-stil te" v-if="afeter.status===6">待退款</p>
               <p class="title-stil te" v-if="afeter.status===7">已退款</p>
               <p class="title-stil te" v-if="afeter.status===8">拒绝退款</p>
               <span class="time te">{{create_time | formatDate}}</span>
             </div>
             <div class="retreat-sum info-msg">
                 <span>退款总金额</span>
                 <span class="price">￥{{afeter.total_amount}}</span>
             </div>
             <div class="retreat-info">
                <div class="retreat-sum info-msg">
                    <span>退款信息</span>
                </div>
                <div class="info-details" v-for="item in afeter.goods_res" :key="item.id">
                    <div class="info-img">
                      <img :src="baseUrl+item.img" alt="">
                    </div>
                    <div  class="text">
                        <h3 >{{item.goods_name}}</h3>
                         <p >
                             <span  class="color">{{item.spec_key_name}}</span>
                        </p>
                         <p >
                             <span  class="color">价格:{{item.goods_price}}</span>
                        </p>
                        <p >
                             <span  class="color">件数:{{item.goods_num}}</span>
                        </p>
                        </div>
                </div>
                <div class="refund-info">
                    <ul>
                        <li>
                            <span>退款原因: </span>
                            <span class="nowal" v-if="refund_reason===0">7天无理由退款</span>
                            <span class="nowal" v-if="refund_reason===1">退运费</span>
                            <span class="nowal" v-if="refund_reason===2">商品描述不符</span>
                            <span class="nowal" v-if="refund_reason===3">质量问题</span>
                            <span class="nowal" v-if="refund_reason===4">少件漏发</span>
                            <span class="nowal" v-if="refund_reason===5">包装/商品破损/污渍</span>
                            <span class="nowal" v-if="refund_reason===6">发票问题</span>
                            <span class="nowal" v-if="refund_reason===7">卖家发错货</span>
                        </li>
                        <li>
                            <span>退款方式: </span>
                            <span class="nowal" v-if="refund_type.refund_type===0">支付原路退回</span>
                            <span class="nowal" v-if="refund_type.refund_type===1">退到用户余额</span>
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
                            <span class="nowal">{{create_time | formatDate}}</span>
                        </li>
                        <li>
                            <span>退款编号: </span>
                            <span class="nowal">{{afeter.order_sn}}</span>
                        </li>
                        <li>
                            <span>退款备注: </span>
                            <span class="nowal">{{refund_type.cancel_remark}}</span>
                        </li>
                        <li>
                            <span>退款图片: </span>
                            
                            <div class="nowalImg">
                                <div v-for="item in listImg" :key="item.id">
                                <img :src="baseUrl+item" alt="">
                                </div>
                            </div>
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
                 //图片路径
                 baseUrl:'',
                 //退款时间
                 create_time:'',
                 //退款原因
                 refund_reason:'',
                 //退款方式
                 refund_type:'',
                 listImg:[],
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
                    this.create_time = res.data.data.order_refund.create_time
                    this.refund_reason = res.data.data.order_refund.refund_reason  //退款原因
                    this.refund_type = res.data.data.order_refund  //退款方式
                    this.listImg = res.data.data.order_refund.img.split(',')  //退款图片

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
     height 100%
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
 .refund-info ul li:last-child
     display block
 .refund-info ul li span 
     white-space nowrap
     margin-right 10px
     color #b6b6b6
 .refund-info ul li .nowal
     overflow hidden
     text-overflow ellipsis
.nowalImg
     display flex
     justify-content space-around
     width 100%
     height 200px
     div
       width 30%
       img 
            height 100%
            width 100%
    
</style>
