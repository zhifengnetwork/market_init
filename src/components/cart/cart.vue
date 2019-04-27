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
                    <div class="backBtn" slot="backBtn" @click="backBtn($router.go(-1))">
                        <img src="../../../static/img/public/backBtn.png" />
                    </div>
                    <span class="rightBtn" slot="rightBtn" @click="redact">{{redactText}}</span>
                </headerView>
                <div class="shopping-cart-page cart-page ">
                     <div class="cart-box">
                              <div class="cart-nav clearfix more" v-if="list[0].title!= ''">
                                    <div class="nav-item active" id="common-cart-nav" data-type="ordinary">
                                            <span>普通商品({{getnumber}})</span>
                                        </div>
                              </div> 
                              <!-- 购物车列表 -->
                              <div class="cart-content normal-good active" v-if="list[0].title!= ''">
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
                                                <div class="good-list" v-for="(item,index) in list" :key="index" >
                                                        <div class="good-item"  v-if='item["title"] != ""'>
                                                            <div class="opt">
                                                                   <img :src="item.ischeack?'../../../static/img/cart/check-circle-fill.png':'../../../static/img/cart/clos.png'" alt="" class="iconfont  chk" :data-id="item.id" @click="imgselect(item,$event,index)">
                                                                    <!-- <div class=" iconfont  chk  select"></div>
                                                                    <div class=" iconfont  chk  edit"></div> -->
                                                            </div>
                                                            <div class="good-new-info">
                                                                <a href="javascript:;" class="img-a">
                                                                    <div class="img">
                                                                        <img class="thumb lazy" :src='item.url' style="display: block;">
                                                                    </div>
                                                                </a>
                                                                <div class="info">
                                                                    <div class="fixed-height">
                                                                        <div class="intro intro-name">
                                                                            <div class="name-row">
                                                                                <div class="name">
                                                                                    <a href="javascript:;">{{item.title}}</a>
                                                                                </div>
                                                                            </div>
                                                                            <p class="color-size-row"><span class="color">颜色:{{item.selectedColor}}</span><span class="size">尺码:{{item.selecteSize}}</span></p>
                                                                        </div>
                                                                        <div class="intro intro-edit">
                                                                            <div class="edit-box">
                                                                                    <div class="num-opt">
                                                                                
                                                                                        <a href="javascript:;" class="btn btn-opt-minus"  @click="subtract" :data-id="item.id">
                                                                                            -
                                                                                            </a>
                                                                                        <input type="text" class="good-num" disabled="true"  data-min="1" data-max="16" v-model="item.num">
                                                                                        <a href="javascript:;" class="btn btn-opt-plus"   @click="push"     :data-id="item.id">
                                                                                            +
                                                                                        </a>
                                                                                    </div>
                                                                                <div class="edit-size-info  edit-size-info-notop " @click="changeInfo(index)" :data-id="item.id"> 
                                                                                    <div class="txt">颜色:{{item.selectedColor}} 尺码:{{item.selecteSize}}</div>
                                                                                    <div class="down">
                                                                                        <img  src="../../../static/img/cart/xiajiantou.png" class="iconfont">
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="count">x{{item.num}}</div>
                                                                    </div>
                                                                    <div class="bottom">
                                                                        <div class="price">
                                                                            <span class="market-price">¥{{item.price}}.00</span>  
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
                              <div class="cart-zero" v-if="list[0].title==''">
                                <i class="iconfont"></i>
                                <p>您的购物车暂无商品</p>
                                <a href="javascript:;">随便逛逛</a>
                             </div>
                              <!--  total box -->   
                              <div class="total box">
                                    <div class="price-compute">
                                        <p>总计¥{{getSubTotal}}.00=商品金额¥{{getSubTotal}}.00</p>
                                    </div>
                                </div>
                             
                              <!-- 结算 -->
                              <div class="cart-footer">
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

                                        <router-link to="/confirmOrder">
                                            <div class="btn btn-red btn-balance">结算</div>
                                        </router-link>
                                    </div>
                                </div>
                              <!-- 选择 -->
                             <div class="chose-panel" :class="{hide:isHide}"  @click="isHide=true" @touchmove.prevent>
                                    <div class="main" @click.stop="userClick=false">
                                        <div class="close iconfont" @click="closeInfo">
                                            <img src="../../../static/img/cart/close.png" alt="">
                                        </div>
                                        <div class="infos">
                                            <div class="basic-info">
                                                <div class="thumb-img">
                                                    <img class="thumb" :src="list[specification].url">
                                                </div>
                                                <div class="text-info">
                                                    <p class="price">
                                 
                                                        <span class="sale-price no-price">¥{{list[specification].price}}.00</span>  
                                                    </p>
                                                    <p class="not-choose"   :class="{hide:selected==false}">请选择颜色、尺码</p>
                                                    <p class="choosed-info" :class="{hide:selected}">已选择:{{newList.color}},{{newList.size}}</p>
                                                    <p class="size-info hide"></p>
                                                    <p class="size-rec hide"></p>
                                                </div>
                                            </div>
                                            <div class="chose-items">
                                                    <div class="block-list">
                                                        <span class="name">颜色</span>
                                                        <ul class="size-row clearfix">
                                                            <li class="block " v-for="(color,index) in list[specification].color" :key="index" :class="{chosed:colorSelectt==index}" @click="colorSelect(index,color)">{{color}}</li>
                                                        </ul>
                                                    </div>
                                                    <div class="block-list">
                                                        <span class="name">尺码</span>
                                                        <ul class="size-row clearfix">
                                                            <li class="block " v-for="(size,index) in list[specification].size" :key="index" :class="{chosed:sizeSelectt==index}" @click="sizeSelect(index,size)">{{size}}</li>
                                                        </ul>
                                                    </div>
                                                <div class="num">
                                                    <span class="name">数量</span>
                                                    <div class="clearfix">
                                                        <a class="btn btn-minus " href="javascript:void(0);"  @click="subtractt" :data-id="list[specification].id">
                                                           -
                                                        </a>
                                                        <input id="good-num" class="good-num disabled" type="text"  v-model:value="newList.num"  disabled="true">
                                                            <a class="btn btn-plus" href="javascript:void(0);" @click="pushh"   :data-id="list[specification].id">
                                                           +
                                                        </a>
                                                    </div>
                                                    <span class="left-num"></span>
                                                    <input id="left-num" type="hidden" value="0">
                                                    <input id="limitNum" type="hidden" value="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btn-wrap">
                                                <div id="chose-btn-sure" class="btn btn-sure" @click="affirm">确认</div>
                                        </div>
                                    </div>
                                </div>
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
import {Toast} from "mint-ui"
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import headerView from '../common/headerView.vue'
export default {
    data() {
        return {
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
              isHide:true,
              /* 更换下标 */
              specification:0,
              /* 颜色选中 */
              colorSelectt:-1,
              /* 尺码选中 */
              sizeSelectt:-1,
              /* 已选中颜色与尺码 */
              selected:true,
              /* 已选中颜色状态 */
              selcolor:false,
              /* 已选中颜色下标 */
              selcolorIndex:0,
              /* 已选中尺码状态 */
              selSize:false,
              /* 已选中尺码下标 */
              selSizeIndex:0,
              /* 修改数据 */
              newList:
                  {size:'',color:'',num:''}
              ,
              /* 加载 */
              loding:false,
            /*数据*/
              list:[ 
                   {id:1,title:'HUMAN MADE  海军蓝棒球帽',size:['F','S','M'],color:['海军蓝','草原绿'],price:449,info:'',num:3,url:"../../../static/img/cart/0001.jpg",selecteSize:'F',selectedColor:'海军蓝'},
                   {id:2,title:'Dickies 简约纯色长袖衬衫',size:['F','S','M'],color:['卡其色','黑色'],price:559,info:'',num:3,url:"../../../static/img/cart/0003.jpg",selecteSize:'F',selectedColor:'卡其色'},
                   {id:3,title:'Dickies 简约纯色长袖衬衫',size:['F','S','M'],color:['卡其色','黑色'],price:559,info:'',num:3,url:"../../../static/img/cart/0003.jpg",selecteSize:'F',selectedColor:'卡其色'},
                   {id:4,title:'FUTURA 系列 原子球印花滑板板面',size:['F','S','M'],color:['卡其色','黑色'],price:1089,info:'',num:3,url:"../../../static/img/cart/0002.jpg",selecteSize:'F',selectedColor:'黑色'},
              ],
        }
    },
    methods: {
        // 删除商品
        cancel(){
            if(this.cheack==''){
                Toast('请至少选择一件商品')
                return false;
            }
            else{
                MessageBox.confirm('你确定要从购物车中删除吗?').then(action => {
                for(var i = this.list.length-1; i>=0;i--){
                    var item = this.list[i];
                    if(item.ischeack){
                        var index=this.list.indexOf(item);
                        // console.log(index)
                        this.list.splice(index,1);
                        if(this.list.length==1){
                            this.list.splice(index,1,{id:0,title:'',size:[],color:[],url:"",num:0});
                        }
                        Toast({
                        message: '删除成功',
                        iconClass: 'icon icon-success',
                        duration:1000
                        });
                        this.cheack=[];
                        this.cheackAll=false;
                    }
                }
                  })
            }
        },
        /* 修改确认 */
        affirm(){
            if(!this.selcolor){
                Toast("请选择颜色~");
                 return;
            }else if(!this.selSize){
                Toast("请选择尺码~");
               return;
            }
            //当前的尺码改变成编辑后的
            this.list[this.specification].selecteSize = this.newList.size 
            //当前的颜色改变成编辑后的
            this.list[this.specification].selectedColor = this.newList.color
            //当前的数量改变成编辑后的
            this.list[this.specification].num = this.newList.num
            //关闭更尺码颜色状态
            this.isHide=true
            this.selected=true
            this.colorSelectt=-1
            this.sizeSelectt=-1
            this.selcolor=false
            this.selSize=false
            this.liding()
        },
        /* 颜色选中 */
        colorSelect(index,color){
         this.colorSelectt=index;
         this.selected=false
         this.newList.color = color;
         //选中改变状态
         this.selcolor = true;
        },
        /* 尺码选中 */
        sizeSelect(index,size){
         this.sizeSelectt=index;
         this.selected=false
         this.newList.size = size
         //选中改变状态
         this.selSize = true;
        },
        /* 更换尺码颜色状态 */
        changeInfo(index){
           this.isHide = false
           this.specification = index;
           this.newList.num  = this.list[this.specification].num;
           this.liding()
        },
        /* 关闭尺码颜色选择 */
        closeInfo(){
           this.isHide=true
           this.selected=true
           this.colorSelectt=-1
           this.sizeSelectt=-1
           this.selected=true
           this.selcolor=''
           this.selSize=''
           this.liding()
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
            console.log(this.cheack)
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
    subtract(e) {
        var id = e.target.dataset.id;
        for (var item of this.list) {
        if (item.id == id && item.num > 1) {
          item.num--;
           this.liding()
          break;
        }
        if (item.num == 1) {
          Toast("修改的商品不能为零噢~");
        }
      }
    },
    /* 修改减  */
    subtractt(e) {
        var id = e.target.dataset.id;
        for (var item of this.list) {
        if (item.id == id && this.newList.num > 1) {
          this.newList.num--;
          break;
        }
        if (this.newList.num == 1) {
          Toast("修改的商品不能为零噢~");
        }
      }
    },
        /* 加 */
    push(e) {
      var id = e.target.dataset.id;
      for (var item of this.list) {
        if (item.id == id) {
          item.num++;
          this.liding()
          break;
        }
      }
      
    },
    /* 修改加*/
    pushh(e) {
    var id = e.target.dataset.id;
    for (var item of this.list) {
        if (item.id == id) {
          this.newList.num++;
          break;
        }
      }
    },
    // 加载
    liding(){
            this.loding=true;
            setTimeout(() => {
                this.loding = false
            }, 500)
    }
    },computed:{
        /*  商品总和*/
        getSubTotal: function() {
      var sum = 0;
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        if(item.ischeack){
        sum += item.price * item.num;
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
        sum += item.num;
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
        sum += item.num;
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
