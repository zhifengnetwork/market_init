<template>
    <div class="order">
        <!-- 头部组件 -->
        <headerView custom-title="我的订单" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.push('/user')">
                <img src="/static/img/public/backBtn.png" />
            </div>
        </headerView>
        
        <div class="tab-wrap">
            <div class="tab-tit">
                <ul>
                    <li v-for="(item,index) in tabList"
                        :class="{active:index === nowIndex}"
                        @click="handleClick(index)"
                        :key="index">
                        {{item.tabTitle}}
                    </li>
                </ul>
            </div>
            <div class="tab-con">
                <ul>
                    <li v-show="nowIndex===0">
                        <div class="order-good" v-for="(item,index) in allOrders" :key="index">
                            <div class="line1">
                                <span class="order-number">订单编号: {{item.order_sn}}</span>
                                <span class="order-state" v-if="item.status===1">待付款</span>
                                <span class="order-state" v-if="item.status===2">待发货</span>
                                <span class="order-state" v-if="item.status===3">待收货</span>
                                <span class="order-state" v-if="item.status===4">待评价</span>
                                <span class="order-state" v-if="item.status===5">已取消</span>
                                <span class="order-state" v-if="item.status===6">待退款</span>
                                <span class="order-state" v-if="item.status===7">已退款</span>
                                <span class="order-state" v-if="item.status===8">拒绝退款</span>
                            </div>
                            <router-link :to="'/orderDetails?order_id='+item.order_id">
                                <div class="order-item">
                                    <div class="img-wrap">
                                        <img :src="baseUrl+item.img" />
                                    </div>
                                    <div class="text">
                                        <h3>{{item.goods_name}}</h3>
                                        <p>
                                            <span class="color">{{item.spec_key_name}}</span>
                                        </p>
                                    </div>
                                    <div class="price-wrap">
                                        <p class="price">¥{{item.goods_price}}</p>
                                        <p class="sale-price">¥{{item.original_price}}</p>
                                        <p class="count">x{{item.goods_num}}</p>
                                    </div>
                                </div>
                            </router-link>
                            <div class="order-opt" v-if="item.status===1">
                                <span class="btn cancelBtn" @click="cancellation(index,item.order_id,item.status)">取消订单</span>
                           
                                <span class="btn payBtn" @click="payment(item.order_id,item.pay_type)">立即付款</span>
                          
                            </div>
                            <div class="order-opt" v-if="item.status===2">
                                <router-link :to="'/order/refund?order_id='+item.order_id">
                                <span class="btn cancelBtn">退款</span>
                                </router-link>
                                
                                <!-- <span class="btn">确认收货</span> -->
                            </div>
                            <div class="order-opt" v-if="item.status===3">
                               
                                 <span class="btn"  @click="receipt(index,item.order_id,item.status)">确认收货</span>
                            </div>
                            <div class="order-opt" v-if="item.status===4">
                                <span class="btn cancelBtn" @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                                
                                 <span class="btn" @click="evaluateet(item)">评价</span>
                         
                            </div>
                            <div class="order-opt" v-if="item.status===6">
                                <span class="btn" @click="cancelRefund(index,item.order_id,item.status)">取消退款</span>
                                <!-- <span class="btn">再次购买</span> -->
                            </div>
                        </div>
                         
                        
                    </li>
                    <li v-show="nowIndex===1">
                        <div class="order-good" v-for="(item,index) in allOrders" :key="index">
                            <div class="line1">
                                <span class="order-number">订单编号:{{item.order_sn}}</span>
                                <span class="order-state">待付款</span>
                            </div>
                            <router-link :to="'/orderDetails?order_id='+item.order_id">
                                <div class="order-item">
                                    <div class="img-wrap">
                                        <img :src="baseUrl+item.img" />
                                    </div>
                                    <div class="text">
                                        <h3>{{item.goods_name}}</h3>
                                        <p>
                                            <span class="color">{{item.spec_key_name}}</span>
                                        </p>
                                    </div>
                                    <div class="price-wrap">
                                        <p class="price">¥{{item.goods_price}}</p>
                                        <p class="sale-price">¥{{item.original_price}}</p>
                                        <p class="count">x{{item.goods_num}}</p>
                                    </div>
                                </div>
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn" @click="cancellation(index,item.order_id,item.status)">取消订单</span>
                                <span class="btn payBtn" @click="payment(item.order_id)">立即付款</span>
                            </div>
                        </div>

                    </li>
                    <li v-show="nowIndex===2">
                        <div class="order-good" v-for="item in allOrders" :key="item.id">
                            <div class="line1">
                                <span class="order-number">订单编号:{{item.order_sn}}</span>
                                <span class="order-state">待发货</span>
                            </div>
                            <router-link :to="'/orderDetails?order_id='+item.order_id">
                                <div class="order-item">
                                    <div class="img-wrap">
                                        <img :src="baseUrl+item.img" />
                                    </div>
                                    <div class="text">
                                        <h3>{{item.goods_name}}</h3>
                                        <p>
                                             <span class="color">{{item.spec_key_name}}</span>
                                        </p>
                                    </div>
                                    <div class="price-wrap">
                                        <p class="price">¥{{item.goods_price}}</p>
                                        <p class="sale-price">¥{{item.original_price}}</p>
                                        <p class="count">x{{item.goods_num}}</p>
                                    </div>
                                </div>
                            </router-link>
                            <div class="order-opt">
                                <router-link :to="'/order/refund?order_id='+item.order_id">
                                <span class="btn cancelBtn">退款</span>
                                <!-- <span class="btn">确认收货</span> -->
                                </router-link>
                            </div>
                        </div>
                    </li>
                     <li v-show="nowIndex===3">
                        <div class="order-good" v-for="item in allOrders" :key="item.id">
                            <div class="line1">
                                <span class="order-number">订单编号:{{item.order_sn}}</span>
                                <span class="order-state">待收货</span>
                            </div>
                            <router-link :to="'/orderDetails?order_id='+item.order_id">
                                <div class="order-item">
                                    <div class="img-wrap">
                                        <img :src="baseUrl+item.img" />
                                    </div>
                                    <div class="text">
                                         <h3>{{item.goods_name}}</h3>
                                        <p>
                                             <span class="color">{{item.spec_key_name}}</span>
                                        </p>
                                    </div>
                                    <div class="price-wrap">
                                        <p class="price">¥{{item.goods_price}}</p>
                                        <p class="sale-price">¥{{item.original_price}}</p>
                                        <p class="count">x{{item.goods_num}}</p>
                                    </div>
                                </div>
                            </router-link>
                            <div class="order-opt">
                                <!-- <span class="btn cancelBtn">删除订单</span> -->
                                 <span class="btn" @click="receipt(index,item.order_id,item.status)">确认收货</span>
                            </div>
                        </div>
                    </li>
                     <li v-show="nowIndex===4">
                        <div class="order-good" v-for="(item,index) in allOrders" :key="index">
                            <div class="line1">
                                <span class="order-number">订单编号:{{item.order_sn}}</span>
                                <span class="order-state">已完成</span>
                            </div>
                           <router-link :to="'/orderDetails?order_id='+item.order_id">
                                <div class="order-item">
                                    <div class="img-wrap">
                                        <img :src="baseUrl+item.img" />
                                    </div>
                                    <div class="text">
                                        <h3>{{item.goods_name}}</h3>
                                        <p>
                                            <span class="color">{{item.spec_key_name}}</span>
                                        </p>
                                    </div>
                                    <div class="price-wrap">
                                        <p class="price">¥{{item.goods_price}}</p>
                                        <p class="sale-price">¥{{item.original_price}}</p>
                                        <p class="count">x{{item.goods_num}}</p>
                                    </div>
                                </div>
                            </router-link>
                            <div class="order-opt">
                                <span class="btn cancelBtn" @click="delOrder(index,item.order_id,item.status)">删除订单</span>
                                  <!-- <router-link :to="'/my/appraise?order_id='+item.order_id" > -->
                                 <span class="btn" @click='evaluateet(item)'>评价</span>
                                 <!-- </router-link> -->
                            </div>
                        </div>
                    </li>

                </ul>
                <!-- 无数据 -->
                <div class="none vacancy" v-if="allOrders.length===0">
                    <img src="/static/img/public/none.png" alt="">
                    <p>暂无数据</p>
                </div>
                 <!-- 密码输入框 -->
            <van-popup v-model="showPwd" class="popup" @click-overlay="close()">
                  <van-password-input
                    :value="value"
                    info="密码为 6 位数字"
                    @focus="showKeyboard = true"
                    />
            </van-popup>
             <!-- 数字键盘 -->
                    <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
            />
            </div>

        </div>

    </div>
</template>

<script>
    import headerView from '../common/headerView'
    import { Dialog,Toast } from 'vant';
    export default {
        name:'order',
        data(){
            return{
                //支付密码
                value: '',
                showPwd:false,
                showKeyboard:false,
                orderId:'',
                //支付方式
                payId:'',
                //商品图片路径
                baseUrl:'',

                nowIndex:0,
                type:this.$route.query.type,
                //全部订单
                allOrders:[],
                // //代付款
                // obligation:[],
                // //待发货
                // shipments:[],
                // //待收货
                // delivery:[],
                // //待评价
                // evaluate:[],
                tabList:[
					{
						tabTitle:"全部订单"
					},
					{
						tabTitle:"待付款"
					},
					{
						tabTitle:"待发货"
					},
					{
						tabTitle:"待收货"
                    },
                    {
                        tabTitle:"待评价"
                    }
                ],
                list:[]
            }
        },
        methods:{
            handleClick(index){
                this.nowIndex = index;
                this.$router.go(0)
                this.$router.push('/order?type='+index);
                this.type = this.$route.query.type;
//				this.data_rendering();
            },
            //取消订单
            ajax(index,id,status,s,msgg){
                   // 取消订单	order/edit_status
                    // 参数：
                    // token
                    // order_id
                    // status
                    var url = "order/edit_status"
                    var params = new URLSearchParams();
                        params.append('token', this.$store.getters.optuser.Authorization);           //token
                        params.append('order_id',id);   
                        params.append('status',status);
                    Dialog.confirm({
                        message: msgg
                    }).then(() => {
                    this.$axios({
                                method:"post",
                                url:url,
                                data: params
                                }).then((res)=>{
                        if(res.data.status === 1){
                        s.splice(index,1)
                        Toast(res.data.msg)
                    }else{
                        Toast(res.data.msg)
                    }
                    }) 
                    })
                    .catch(()=>{
        
                    })
            },
            //立即付款ajax
            payment(id,type){
                  if(type===1){
                       this.showPwd=true;
                       this.showKeyboard=true;
                       this.orderId = id
                       this.payId = type
                  }
            },
            
             //待付款取消订单
            cancellation(index,id,status){
                 var msgg = '您确定要取消订单吗？'
                 this.ajax(index,id,status,this.allOrders,msgg)       
                 console.log(index)        
            },
            //全部订单页  删除订单
            delOrder(index,id,status){
                 var msgg = '您确定要删除订单吗？'
                 this.ajax(index,id,status,this.allOrders,msgg) 
            },
            //确认收货
            receipt(index,id,status){
                var msgg = '您要确认收货吗？'
                this.ajax(index,id,status,this.allOrders,msgg) 
            },
            //取消订单
            cancelRefund(index,id,status){
                var msgg = '您要确认取消退款吗？'
                this.ajax(index,id,status,this.allOrders,msgg) 
            },
           
            evaluateet(item){
                if(item.comment === 1){
                    Toast('你已评价过此商品')
                }else{
                    this.$router.push('/my/appraise?order_id='+item.order_id);
                }
            },
             //输入密码
            onInput(key) {
               this.value = (this.value + key).slice(0, 6);
                      if(this.value.length === 6){
                                        var url = 'user/check_pwd'
                                        var params = new URLSearchParams();
                                        params.append('token', this.$store.getters.optuser.Authorization);                         //token
                                        params.append('pwd', this.value);                                                         //密码
                                        this.$axios({
                                            method:"post",
                                            url:url,
                                            data: params
                                        }).then((res)=>{
                                      if(res.data.status ===1){  //提交成功
                                                Toast.loading({
                                                mask: true,
                                                message: '支付中...'
                                                });
                                                this.showKeyboard=false;
                                                this.value = '';
                                                 //请求支付接口  

                                        var orderId = res.data.data
                                        var urll = 'pay/payment'
                                        var params = new URLSearchParams();
                                        params.append('token', this.$store.getters.optuser.Authorization);                         //订单id
                                        params.append('order_id', this.orderId);                                                       //订单id
                                        params.append('pay_type',this.payId);                                                    //支付方式                                  
                                        this.$axios({
                                            method:"post",
                                            url:urll,
                                            data: params
                                        }).then((res)=>{
                                            if(res.data.status ===1){  //余额支付成功
                                            setTimeout(()=>{
                                                Toast.success(res.data.msg);
                                                var data = JSON.stringify(res.data.data)
                                                this.$router.push(
                                                    {
                                                     path:'/paySucceed',
                                                     name: 'paySucceed',
                                                      params: {
                                                         list:data
                                                      }      
                                                    })
                                                },2000)
                                            

                                            }else{                     //余额支付失败
                                            setTimeout(()=>{
                                                Toast.fail(res.data.msg);
                                                this.close();
                                                this.showKeyboard = false
                                            },2000)
                                            }

                                          })
                                        }else{
                                             Toast.loading({
                                                mask: true,
                                                message: '支付中...'
                                            });
                                            this.showKeyboard=false;
                                            setTimeout(()=>{
                                                this.showKeyboard=true;
                                                Toast.fail(res.data.msg);
                                                this.value = '';
                                            },2000)
                                          
                                        }
                                        
                                         })  
               }
            },
            //删除密码
            onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
            },
            //关闭蒙城 清空密码
            close(){
                this.showPwd=false
                this.value = ''
            },
			/*页面-数据渲染*/
//			data_rendering() {
//				// 调用loading 
//				this.$store.commit('showLoading')
//				//图片路径
//				this.baseUrl = this.url
//				// 订单列表	order/order_list
//				// 参数：
//				// token
//				// type		//全部订单 all，待付款 dfk，待发货 dfh，待收货 dsh，待评价 dpj，已取消 yqx
//				// 订单状态提示：
//				// order_status	//订单状态	已确认，2已收货，3已取消，4已完成
//				// pay_status	//支付状态	0未支付，1已支付，3，已退款
//				// shipping_status	//商品配送情况 0未发货，1已发货，3已收货，4退货
//				this.nowIndex = parseInt(this.type);
//				console.log(parseInt(this.type));
//				var type, siz
//				if(this.nowIndex === 0) {
//					type = 'all'
//				}
//				if(this.nowIndex === 1) {
//					type = 'dfk'
//				}
//				if(this.nowIndex === 2) {
//					type = 'dfh'
//				}
//				if(this.nowIndex === 3) {
//					type = 'dsh'
//				}
//				if(this.nowIndex === 4) {
//					type = 'dpj'
//				}
//				var url = 'order/order_list'
//				var params = new URLSearchParams();
//				params.append('token', this.$store.getters.optuser.Authorization); //token
//				params.append('type', type);
//				this.$axios({
//					method: "post",
//					url: url,
//					data: params
//				}).then((res) => {
//					if(res.data.status === 1) {
//						// 数据加载成功，关闭loading 
//						this.$store.commit('hideLoading')
//	
//						this.allOrders = res.data.data
//	
//					} else {
//						Dialog.alert({
//							message: res.data.msg
//						}).then(() => {
//							this.$router.push('/login');
//						});
//					}
//				}).catch((err) => {
//					alert('请求错误'+err);
//				})
//			},
        },
        components:{
            headerView
        },
        created(){
//      	/*数据请求*/
//			this.data_rendering();
            // 调用loading 
			                    this.$store.commit('showLoading')
            //图片路径
           this.baseUrl=this.url
            // 订单列表	order/order_list
            // 参数：
            // token
            // type		//全部订单 all，待付款 dfk，待发货 dfh，待收货 dsh，待评价 dpj，已取消 yqx
            // 订单状态提示：
            // order_status	//订单状态	已确认，2已收货，3已取消，4已完成
            // pay_status	//支付状态	0未支付，1已支付，3，已退款
            // shipping_status	//商品配送情况 0未发货，1已发货，3已收货，4退货
           this.nowIndex=parseInt(this.type);
           console.log(parseInt(this.type));
           var type,siz
           if(this.nowIndex === 0){
               type='all'
           }
           if(this.nowIndex === 1){
               type='dfk'
           }
           if(this.nowIndex === 2){
               type='dfh'
           }
           if(this.nowIndex === 3){
               type='dsh'  
           }
           if(this.nowIndex === 4){
               type='dpj'
           }
                                var url = 'order/order_list'
                                var params = new URLSearchParams();
                                params.append('token', this.$store.getters.optuser.Authorization);           //token
                                params.append('type',type );                      
                                this.$axios({
                                        method:"post",
                                        url:url,
                                        data: params
                                        }).then((res)=>{
                                        if( res.data.status === 1){
                                            // 数据加载成功，关闭loading 
					                        this.$store.commit('hideLoading')
                                          
                                                this.allOrders = res.data.data
                                        
                                        }else if(res.data.status === -1){  
                                            Dialog.alert({
                                            message:res.data.msg
                                            }).then(()=>{
                                            store.commit('del_token'); //token，清除它;
                                            setTimeout(() => {
                                            this.$router.push("/login");  
                                        })
                                        })
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
@import '../../../static/css/public/mixin.styl';
.order
    .tab-wrap
        padding-top 88px
        .tab-tit
            ul
                height 80px
                line-height 80px
                font-size 26px
                background-color #fff
                display flex
                align-items center
                justify-content space-between
                padding 0 30px
                box-sizing border-box
                margin-bottom 20px
                li
                    // padding 0 28px
                    border-bottom 2px solid transparent
                    &.active
                        border-color #ed5657
        .tab-con
            .order-good
                margin-bottom 20px
                background-color #fff
                .line1
                    height 80px
                    font-size 26px
                    padding 0 30px
                    box-sizing border-box
                    display flex
                    align-items center
                    justify-content space-between
                    border-bottom 1px solid #e0e0e0
                .order-item
                    display flex
                    padding 20px 30px
                    box-sizing border-box
                    .img-wrap   
                        width 120px
                        height 160px
                        margin-right 18px
                        img 
                            width 100%
                            height 100%
                    .text
                        flex 1
                        font-size 26px
                        h3
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
                        p
                            line-height 40px 
                            color #b6b6b6
                            span 
                                margin-right 25px
                    .price-wrap
                        width 120px
                        color #9999a6
                        text-align right 
                        margin-top 10px
                        p
                            margin-bottom 20px
                        .price
                            color #ee1827
                        .sale-price
                            text-decoration line-through
                .order-opt
                    text-align right 
                    padding 0 30px 20px
                    box-sizing border-box
                    .btn
                        width 138px
                        height 58px
                        font-size 24px
                        line-height 58px
                        text-align center
                        border 2px solid #000
                        border-radius 5px
                        display inline-block
                        margin-left 20px
                    .payBtn
                        color #fff
                        background-color #d0021b
                        border-color #d0021b
            .vacancy
                text-align center
                padding-top 50%
                img 
                    width 80px
                p
                    color #666
                    line-height 40px

   .popup
        width 100%
   .van-number-keyboard
        z-index 3000!important
    .van-password-input__security li:first-child
        border-left 0.5px solid #000

    .van-password-input__security li
        border 0.5px solid #000
        border-left 0
   .van-password-input
        padding-top 30px
   .van-loading
        position fixed
        top 45%
        left 45%
        width 100px
        height 100px
        z-index 3100!important

</style>


