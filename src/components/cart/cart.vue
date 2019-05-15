<template>
   <div class="cart_box" :class="{edit:redactTextState}">
                <!-- <div class="lb_headWrap ">
                        <p class="lb_headWrap_return" >
                            <img class="lb_headWrap_return_img" src="../../../static/img/public/back@2x.png" />
                        </p>
                        <span class="font">购物车</span>
                        <p class="lb_headWrap_text" @click="redact">
                               {{redactText}}
                        </p>
                </div> -->
                <headerView custom-title="购物车" custom-fixed >
                    <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../static/img/public/backBtn.png" />
                    </div>
                    <span class="rightBtn" slot="rightBtn" @click="redact">{{redactText}}</span>
                </headerView>
                <div class="shopping-cart-page cart-page ">
                     <div class="cart-box">
                              <div class="cart-nav clearfix more" v-if="list.length>0">
                                    <div class="nav-item active" id="common-cart-nav" data-type="ordinary">
                                            <span>普通商品({{getnumber}})</span>
                                        </div>
                              </div> 
                              <!-- 购物车列表 -->
                              <div class="cart-content normal-good active" v-if="list.length>0">
                                    <a class="tips clearfix" href="" >
                                        <div>
                                            购物满¥000.00 已免运费
                                        </div>
                                        <span class="iconfont free-shipping">
                                            <img src="../../../static/img/public/right.png" alt="">
                                        </span>
                                    </a>
                                <div class="normal-box" >
                                        <div class="cart-brand  good-pools-data"  >
                                                <div class="good-list" v-for="(item,index) in list" :key="index"  :data-id="item.goods_id" :data-skn="item.sku_id">
                                                        <div class="good-item"  >
                                                            <div class="opt">
                                                                   <img :src="item.ischeack?'../../../static/img/cart/check-circle-fill.png':'../../../static/img/cart/clos.png'" alt="" class="iconfont  chk" :data-id="item.id" @click="imgselect(item,$event,index)">
                                                                    <!-- <div class=" iconfont  chk  select"></div>
                                                                    <div class=" iconfont  chk  edit"></div> -->
                                                            </div>
                                                            <div class="good-new-info">
                                                                <router-link :to="'/details?goods_id='+item.goods_id" class="img-a">
                                                                    <div class="img">
                                                                        <img class="thumb lazy" :src='baseUrl+item.img' style="display: block;">
                                                                    </div>
                                                                </router-link>
                                                                <div class="info" >
                                                                    <div class="fixed-height">
                                                                        <div class="intro intro-name">
                                                                            <div class="name-row">
                                                                                <div class="name">
                                                                                    <router-link :to="'/details?goods_id='+item.goods_id">{{item.goods_name}}</router-link>
                                                                                </div>
                                                                            </div>
                                                                            <p class="color-size-row"><span class="color">{{item.spec_key_name}}</span></p>
                                                                        </div>
                                                                        <div class="intro intro-edit" >
                                                                            <div class="edit-box">
                                                                                    <div class="num-opt">
                                                                                
                                                                                        <a href="javascript:;" class="btn btn-opt-minus"  @click="subtract(index,$event)" :data-id="item.sku_id">
                                                                                            -
                                                                                            </a>
                                                                                        <input type="text" class="good-num" disabled="true"  data-min="1" data-max="16" v-model="item.goods_num">
                                                                                        <a href="javascript:;" class="btn btn-opt-plus"   @click="push(index,$event)"     :data-id="item.sku_id">
                                                                                            +
                                                                                        </a>
                                                                                    </div>
                                                                                <div class="edit-size-info  edit-size-info-notop "  :data-id="item.id"> 
                                                                                    <div class="txt">{{item.spec_key_name}}</div>
                                                                                    <!-- <div class="down">
                                                                                        <img  src="../../../static/img/cart/xiajiantou.png" class="iconfont">
                                                                                    </div> -->
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="count">x{{item.goods_num}}</div>
                                                                    </div>
                                                                    <div class="bottom">
                                                                        <div class="price">
                                                                            <span class="market-price">¥{{item.goods_price}}</span>  
                                                                        </div>
                                                                        <div class="tags">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                              </div>
                              <div class="cart-zero"  v-if="list.length===0">
                                <i class="iconfont"></i>
                                <p>您的购物车暂无商品</p>
                                <router-link to="/classify">随便逛逛</router-link>
                             </div>
                              <!--  total box -->   
                              <div class="total box" v-if="list.length>0">
                                    <div class="price-compute">
                                        <p>总计¥{{getSubTotal}}.00=商品金额¥{{getSubTotal}}.00</p>
                                    </div>
                                </div>
                             
                              <!-- 结算 -->
                              <div class="cart-footer"   v-if="list.length>0">
                                    <div class="check-all">
                                         <img :src="cheackAll?'../../../static/img/cart/check-circle-fill.png':'../../../static/img/cart/clos.png'" alt="" class="iconfont  chk"  @click="slectAll">
                                            <!-- <div  class="iconfont chk select "></div>
                                            <div  class="iconfont chk  edit"></div> -->
                                        <p>全选</p>
                                    </div>
                                    <div class="opts edit">
                                        <div class="btn btn-red btn-del" @click="cancel">删除</div>
                                    </div>
                                    <div class="opts bill ">
                                        <div class="total">
                                            <p class="price">总计:¥{{getSubTotal}}.00&nbsp;&nbsp;({{getnum}}件)</p>
                                            <p class="intro">不含运费</p>
                                        </div>

                                        <router-link :to="'/confirmOrder?id='+cheack">
                                            <div class="btn btn-red btn-balance" @click="closeOrder">结算</div>
                                        </router-link>
                                    </div>
                                </div>
                              <!-- 选择 -->
                     </div>
                              <!-- 为你优选 -->
                              <div class="recommend-for-you box hide" style="display: block;">    
                                <div id="goods-container" class="goods-container">
                                    <p class="title">
                                        <span>为你优选新品</span>
                                    </p>
                                    <div class="new-goods container clearfix">
                                            <div class="good-info ">
                                                    <div class="tag-container clearfix">
                                                    </div>
                                                    <div class="good-detail-img">
                                                        <a class="good-thumb" href="javascript:;">
                                                                <img class="lazy"  alt="" src="../../../static/img/cart/0002.jpg">
                                                        </a>
                                                      </div>
                                                    <div class="good-detail-text">
                                                        <div class="name">
                                                            <a href="javascript:;"> FUTURA 系列 原子球印花滑板板面</a>
                                                        </div>
                                                        <div class="price">
                                                                <span class="sale-price ">¥99.00</span>
                                                                <span class="market-price">¥299.00</span>
                                                        </div>
                                                        <a class="similar-btn iconfont">
                                                            <img src="../../../static/img/cart/san.png" alt="">
                                                        </a>
                                                    </div>
                                                </div>
                                            <div class="good-info ">
                                                        <div class="tag-container clearfix">
                                                        </div>
                                                        <div class="good-detail-img">
                                                            <a class="good-thumb" href="javascript:;">
                                                                    <img class="lazy" src="../../../static/img/cart/0002.jpg">
                                                            </a>
                                                          </div>
                                                        <div class="good-detail-text">
                                                            <div class="name">
                                                                <a href="javascript:;"> FUTURA 系列 原子球印花滑板板面</a>
                                                            </div>
                                                            <div class="price">
                                                                    <span class="sale-price ">¥99.00</span>
                                                                    <span class="market-price">¥299.00</span>
                                                            </div>
                                                            <a class="similar-btn iconfont">
                                                                <img src="../../../static/img/cart/san.png" alt="">
                                                            </a>
                                                        </div>
                                             </div>
                                    </div>
                                    </div>
                              </div>
                        </div>
                        <!-- loading -->
                <div class="loading-mask" v-if="loding">
                            <div class="loading ">
                                <div></div>
                                <div></div>
                                <div></div>
                        </div>
                        </div>
                        <!-- del -->
                <div id="dialog-wrapper" class="dialog-wrapper" >
                            <div class="dialog-box " style="top: 50%; margin-top: -63px;">
                                <div class="dialog-content">您确定要从购物车中删除吗？</div>
                                    <div class="dialog-footer">
                                        <span class="dialog-left-btn tap-hightlight">取消</span>
                                        <span class="dialog-right-btn tap-hightlight">确定</span>
                                    </div>
                            </div>
                        </div>
                <!-- msg -->
                <div id="yoho-tip" class="yoho-tip" style=" display: none;"></div>
        </div>
</template>
<script>
/* 引入 mint-ui 弹窗组件 */
import {Toast,Dialog} from "vant"
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import headerView from '../common/headerView.vue'
export default {
    data() {
        return {
                //商品图片路径
              baseUrl:'http://api.zfwl.c3w.cc/upload/images/',
              /* 编辑 */
              redactText:'编辑',
              /* 编辑状态 */
              redactTextState:false,
              /* 商品总数 */
              goodsNumber:0,
              /* 单选选中 */
              cheack:[],
              /* 全选选中 */
              cheackAll:false,
              /* 更换尺码颜色状态 */
              /* 加载 */
              loding:false,
            /*数据*/
              list:[],
              
        }
    },
    created(){
               //获取购物车列表
                var url = 'cart/cartlist'
                var token = localStorage.Authorization;
               	var params = new URLSearchParams();
				params.append('token', token);       //你要传给后台的参数值 key/value
               this.$axios({
                    method:"post",
                    url:url,
                    data: params
               }).then((res)=>{
                 if(res.data.status === 1){
                       this.list = res.data.data
                 }
               })

    },
    methods: {
        // 删除商品
        cancel(){
            // 删除购物车 cart/delCart
            // 参数：
            // token
            // id	//购物车id
            var url = 'cart/delCart'
            if(this.list.length===0){
                 Toast('你的购物车为空噢！ 快去挑选喜欢的商品吧~')
                return false;
            }
            if(this.cheack==''){
                Toast('请至少选择一件商品')
                return false;
            }
            else{
                MessageBox.confirm('你确定要从购物车中删除吗?').then(action => {
                for(var i = this.list.length-1; i>=0;i--){
                    var item = this.list[i];
                    if(item.ischeack){
                        var params = new URLSearchParams();
                        params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value    tokne
                        params.append('id', item.id);                //你要传给后台的参数值 key/value             购物车id
                        
                        this.$axios({
                            method:"post",
                            url:url,
                            data: params
                        }).then((res)=>{
                            if(res.data.status=== 1){
                            var index=this.list.indexOf(item);
                            this.list.splice(index,1);
                            Toast({
                            message: '删除成功',
                            iconClass: 'icon icon-success',
                            duration:1000
                            });
                            }else{
                                Dialog.alert({
                                message:res.data.msg
                                });
                            }
                            
                        })
                        this.cheack=[];
                        this.cheackAll=false;
                    }
                }
                  })
                  .catch(() => {
                });  
            }
        },
        
        /* 编辑 */
        redact(){
              if(this.redactText=='编辑'){
                  this.redactText='完成',
                  this.redactTextState=true;
              }else{
                  this.redactText='编辑'
                  this.redactTextState=false;
              }
        },
        /*  单选 */ 
        imgselect(item,e,index){
            this.liding()
            var i=e.target.dataset.id
            if(typeof item.ischeack == "undefined"){
                this.$set(item,"ischeack",true)
            }else{
                item.ischeack=!item.ischeack;
            }
            this.cheack=[];
            this.list.forEach((item,index) => {
                if(item.ischeack){
                this.cheack.push(item.id);
                }
            })
            if(this.cheack.length==this.list.length){
                this.cheackAll=true;
            }else{
                this.cheackAll=false;
            }
        },
        /* 多选 */
        slectAll(){
            this.liding()
            this.cheack=[];
            this.cheackAll=!this.cheackAll;
            if(this.cheackAll){
                for(var item of this.list){
                   this.cheack.push(item.id);
                }
            }
            var _this=this;
            this.list.forEach((item,index) => {
            if(typeof item.ischeack == "undefined"){
            _this.$set(item,"ischeack",_this.cheackAll)
            }else{
            item.ischeack=_this.cheackAll  
            }
            });
        },
        /* 减 */
        
    subtract(index,e) {
        var than = this

        var id = e.target.dataset.id;

        for (var item of this.list) {

        if (item.sku_id == id ) {

          if (item.goods_num == 1) {

            Toast("修改的商品不能为零噢~");

            return;
          }
            var num = item.goods_num
            item.goods_num--;
            var url = 'cart/addCart'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value    tokne
            params.append('sku_id', item.sku_id);                //你要传给后台的参数值 key/value             sku id
            params.append('cart_number', item.goods_num);       //你要传给后台的参数值 key/value              数量
            params.append('act', 'edit');       //你要传给后台的参数值 key/value              修改购物车
           this.$axios({
                   method:"post",
                   url:url,
                   data: params
                }).then((res)=>{
                    if(res.data.status === 1){
                        
                    }else{
                        Dialog.alert({
                        message:res.data.msg
                        });
                        item.goods_num = num
                    }
                })

          this.liding()
          break;
        }
      }
    },

        /* 加 */
    push(index,e) {
      var id = e.target.dataset.id;
      for (var item of this.list) {
        if (item.sku_id == id) {
            
            var num = item.goods_num
            item.goods_num++;
            var url = 'cart/addCart'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value    tokne
            params.append('sku_id', item.sku_id);                //你要传给后台的参数值 key/value             sku id
            params.append('cart_number', item.goods_num);       //你要传给后台的参数值 key/value              数量
            params.append('act', 'edit');       //你要传给后台的参数值 key/value              修改购物车
            this.$axios({
                   method:"post",
                   url:url,
                   data: params
                }).then((res)=>{
                    if(res.data.status === 1){
                    }else{
                        Dialog.alert({
                        message:res.data.msg
                        });
                        item.goods_num = num
                    }
                })
          this.liding()
          break;
        }
      }
      
    },
    // 加载
    liding(){
            this.loding=true;
            setTimeout(() => {
                this.loding = false
            }, 300)
    }
    ,
    //结算
    closeOrder(){
        // 购物车提交订单	order/temporary
        // 参数：
        // token
        // cart_id
            var url = "order/temporary"
            for(var i = this.list.length-1; i>=0;i--){
                    var item = this.list[i];
                    if(item.ischeack){
                        var params = new URLSearchParams();
                        params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value    tokne
                        params.append('cart_id', item.id);                //你要传给后台的参数值 key/value             购物车id
                        this.$axios({
                            method:"post",
                            url:url,
                            data: params
                        }).then((res)=>{
                            if(res.data.status=== 1){
                         
                            }else{
                                Dialog.alert({
                                message:res.data.msg
                                });
                            }
                            
                        })
                    }else{
                                // Dialog.alert({
                                // message:'请先勾选商品'
                                // });
                                Toast('请先勾选商品')
                    }
                }
    }
    },computed:{
        /*  商品总和*/
        getSubTotal: function() {
      var sum = 0;
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        if(item.ischeack){
          sum += item.goods_price * item.goods_num;
        }else{
          sum += 0;
        }
      }
      return sum;
    },
    /* 商品数量选中总数 */
    getnum: function() {
      var sum = 0;
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        if(item.ischeack){
        sum += item.goods_num;
      }else{
        sum += 0
      }
      }
      return sum;
    },
    /* 商品数量总数 */
    getnumber: function() {
      var sum = 0;
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        sum += item.goods_num;
        
    }
    return sum;
    }
},components:{
        headerView
    }
}
</script>
<style scope>
    @import "../../../static/css/cart/cart.css";
    .mint-msgbox{
        border-radius: .3rem;
    }
    .mint-msgbox-confirm{
        color: #d0021b;
    }

    .mint-msgbox-title,.mint-msgbox-message{
        font-weight:400;
        color: #000;
    }

    .mint-msgbox-cancel{
            border-right: 2px solid #ddd;
    }

    /* .mint-toast{
        background: hsla(0,0%,100%,.84);
    } */
  .mint-msgbox-content{
      padding:40px;
  }
  .mint-msgbox-btns{
      height: 100px;
  }
</style>
