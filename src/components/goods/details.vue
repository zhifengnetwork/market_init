<template>
    <div class='details'>
         <header>
         <headerView custom-title="商品详情" custom-fixed rightNone>
				<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
					<img src="../../../static/img/public/backBtn.png" />
				</div>
                <div class="rightBtn" slot="rightBtn" @click="showTab">
                    <img src="../../../static/img/public/recovery.png" />
                </div>
		</headerView> 
           <div class="homebuttom" :class="{hide:isHide}">
                    <div class="ul-arr"></div>
                    <ul>
                        <li>
                            <router-link to="/">
                                <img class="iconfont" src="../../../static/img/public/home.png" />
                                <span>首页</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/classify">
                                <img class="iconfont" src="../../../static/img/public/class.png" />
                                <span>分类</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/cart" rel="nofollow">
                                <img class="iconfont" src="../../../static/img/public/Cart.png" />
                                <span>购物车</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/user" rel="nofollow">
                                <img class="iconfont" src="../../../static/img/public/user.png" />
                                <span>我的</span>
                            </router-link>
                        </li>
                    </ul>
               </div>
           </header>
    <!-- 商品详情 -->
        <div class="goods">
                <van-swipe class="goods-swipe" :autoplay="0" indicator-color="#000">
                <van-swipe-item v-for="(thumb,index) in goods.img" :key="index">
                    <img  :src="baseUrl+thumb.picture" v-lazy="baseUrl+thumb.picture" >       
                </van-swipe-item>
                </van-swipe>

                <van-cell-group>
                <van-cell class="goods-name">
                    <div class="goods-title">{{ goods.goods_name }}</div>
                    <div class="goods-price">
                        <span class="price">{{formatPrice(goods.price)}}</span>
                        <span class="original">￥{{goods.original_price}}</span>
                    </div>
                    
                </van-cell>
                <van-cell class="goods-express">
                    <van-col span="10">运费：{{ goods.express }}</van-col>
                    <van-col span="14">库存：{{ goods.stock }}</van-col>
                </van-cell>
                </van-cell-group>
                <!-- 领取优惠券 -->
                <div class="mod_detail_info_header evaluate" @click="getCoupon=true">
                    <a class="J_to_evaluate" href="javascript:;">
                        <div class="detail_info_line clearfloat">
                            <div class="icon-conpou">卷</div>
                            <h3>领取优惠券</h3>
                            <i class="midea-icon right-arrow"></i>
                        </div>
                    </a>
                </div>
                <!-- 商品评价 -->
                <div class="mod_detail_info_header evaluate">
                        <router-link class="J_to_evaluate" :to="'details/evaluate?product_Id='+goods.id">
                            <div class="detail_info_line clearfloat">
                                <h3>商品评价</h3>
                                <i class="midea-icon right-arrow"></i>
                            </div>
                        </router-link>
                        <div class="detail_switch">
                                                    <div class="evaluate_tag_box evaluate_tag_box_line">
                                    <div class="evaluate_tag_box_inner">
                                                                            <span class="tags_span">满意(245)</span>
                                                                            <!-- <span class="tags_span"></span>
                                                                            <span class="tags_span"></span> -->
                                                                            <span class="tags_span">很好看，潮的(52)</span>
                                                                            <!-- <span class="tags_span"></span> -->
                                                                    </div>
                                </div>
                                                                        <div class="evaluate_list_box">
                                    <div class="evaluate_box">
                                        <div class="rate_avator_time clearfloat">
                                            <div class="avator_wrap">
                                                <img src="//filecmms.midea.com/ccrm-prod/userHeadImg/defaultHeadImg.png" class="avator_pic" alt="用户头像">
                                                <span class="avator_name" title="0***7">0***7</span>
                                            </div>
                                            <div class="quality_time">
                                                                                        <span class="comment_time">2019-04-26</span>
                                            </div>
                                        </div>
                                        <p class="evaluate_comment">
                                           很好看，潮的**。
                                    </p>
                                    </div>
                                </div>
                                <router-link class="all_evaluate_btn J_to_evaluate" mtag="30008.8.1" :to="'details/evaluate?product_Id='+goods.id">
                                    <span class="evaluate_text">查看全部149条评价</span>
                                    <i class="midea-icon right-arrow evaluate_icon"></i>

                                </router-link>
                                            </div>
                    </div>
                <!-- 商品详情 -->
                <div class="mod_detail_info_header evaluate">
                        <a class="J_to_evaluate" href="/detail/index?itemid=1000000000100511234895&amp;mtag=30022.46.1#evaluate">
                            <div class="detail_info_line clearfloat">
                                <h3>商品详情</h3>
                                <h4>DETAILS</h4>
                                <!-- <i class="midea-icon right-arrow"></i> -->
                            </div>
                        </a>
                        <div class="detail_wrap">
                            <p class="p-info">
                              Dickies从1922年诞生之日起就旨在出品品质的工装制服，深谙美国服装文化的精髓。越来越多的冲浪和明星、各大音乐人、社会名流及新生代时尚偶像们开始拥戴Dickies品牌。Dickies以它的耐穿、舒适和标志性外观成为一个生活方式品牌，得到一代又一代年轻人的喜爱和拥蹙。Dickies，从不刻意追逐时尚的这份低调反而得到无数时尚人士的认同，朴实、简单、款式经典的工装风格本身就是一种时尚！ 
                            </p>
                            <p v-for="thumb in goods.thumb" :key="thumb" class="p-info">
                                <img  :src="thumb" v-lazy="thumb">
                            </p>
                        </div>
                        <div class="marking_price_wrap">
                            <p class="marking_price__title">划线价格：</p>
                            <p class="marking_price__content">指商品专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供參考。</p>
                            <p class="marking_price__title">未划线价格：</p>
                            <p class="marking_price__content">指商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</p>
                            <p class="marking_price__content">商家详情页（含主图）以图片成文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格.具体请以结算页面的标价、优惠条件或活动规则为准。</p>
                            <p class="marking_price__content">此说明仅当出现价格比较时有效，如有疑问，您可在购买前联系客服进行咨询。</p>
                        </div>
                </div>
                       <van-goods-action>
                            <van-goods-action-mini-btn
                                icon="chat-o"
                                text="客服"
                            />
                            <van-goods-action-mini-btn
                                :info="optCartCount()"
                                icon="cart-o"
                                text="购物车"
                            />
                            <van-goods-action-mini-btn  
                                icon="like-o"
                                text="收藏"
                                @click="onClickMinicollect"
                            />
                            <van-goods-action-big-btn text="加入购物车" @click='sorry' />
                            <van-goods-action-big-btn primary text="立即购买" @click='buy'/>
                       </van-goods-action>
                </div>
                <!-- sku -->
                <div class="chose-panel"  v-show="is_sku" @click="close" @touchmove.prevent  > 
                                    <div class="main" @click.stop="userClick=false">
                                        <div class="close iconfont" @click="close">
                                            <img src="../../../static/img/cart/close.png" alt="">
                                        </div>
                                        <div class="infos ">
                                            <div class="basic-info">
                                                <div class="thumb-img">
                                                    <img class="thumb" :src="getImg" /> 
                                                </div>
                                                <div class="text-info">
                                                    <p class="price">
                                                        <span class="sale-price no-price">{{sku_price}}</span>  
                                                    </p>
                                                    <p class="not-choose"   v-show="pitch==true">请选择颜色、尺码</p>
                                                    <p class="choosed-info" v-show="pitch==false" >已选择:&nbsp;&nbsp;{{selectArr}}</p>
                                                    <p class="size-info hide"></p>
                                                    <p class="size-rec hide"></p>
                                                </div>
                                            </div>
                                            <div class="chose-items">
                                                  <div class="block-list" v-for="(item,n) in good" :key="n">
                                                        <span class="name">{{item.spec_name}}</span>                                
                                                        <ul class="size-row clearfix">
                                                           
                                                            <li class="block "  v-for="(oItem,index) in item.res" :key="index" :class="[oItem.isShow?'':'noneActive',oItem.isSelect?'chosed':'']" :data-id='oItem.attr_id'  @click="tabInfoChange(n,index,oItem.attr_id,$event)">{{oItem.attr_name}}</li>
                                                        </ul>
                                                    </div>
                                                    
                                                <div class="num">
                                                    <span class="name">数量</span>
                                                    <div class="clearfix">
                                                        <button class="btn btn-minus"   href="javascript:void(0);" @click="minusNum"  :disabled='sku_num>1'>
                                                           -
                                                        </button>
                                                        <input id="good-num" class="good-num disabled" type="text" v-model="sku_num" disabled>
                                                            <button class="btn btn-plus" href="javascript:void(0);" @click="addNum" :disabled='sku_num>10'>
                                                           +
                                                        </button>
                                                    </div>
                                                    <span class="left-num" v-show="sku_stock_s">库存:{{sku_stock}}</span>
                                                    <input id="left-num" type="hidden" value="0">
                                                    <input id="limitNum" type="hidden" value="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btn-wrap">
                                                <div id="chose-btn-sure" class="btn btn-sure"  :class="{hide:byHide==true}" @click="addCart">加入购物车</div>
                                                <div id="chose-btn-sure" class="btn btn-sure"  :class="{hide:byHide==false}" @click="purchase">立即购买</div>
                                        </div>
                        </div>
                    </div>
                <!-- 领取优惠券 -->
                <div class="coupon-drawer" :class="{open:getCoupon}" >
                   <div class="coupon-drawer-dialog">
                      <div class="title" @touchmove.prevent>领取优惠券</div>
                        <div class="body">
                            <ul class="coupon-list">
                                    <li class="coupon" data-coupon="450445">
                                        <div class="pull-right">
                                            <button type="button" class="coupon-btn coupon-btn-valid">立刻领取</button>
                                        </div>
                                        <div class="coupon-intro">
                                            <div class="coupon-price">¥ 40</div>
                                            <div class="coupon-desc">Dickies满459元减40元</div>
                                            <div class="coupon-time">使用期限: 2019.04.22-2019.04.27</div>
                                        </div>
                                    </li>
                                    <li class="coupon" data-coupon="449475">
                                        <div class="pull-right">
                                            <button type="button" class="coupon-btn coupon-btn-valid">立刻领取</button>
                                        </div>
                                        <div class="coupon-intro">
                                            <div class="coupon-price">¥ 40</div>
                                            <div class="coupon-desc">【周年庆】满399减40</div>
                                            <div class="coupon-time">使用期限: 2019.04.23-2019.04.27</div>
                                        </div>
                                    </li>
                                    <li class="coupon" data-coupon="452607">
                                        <div class="pull-right">
                                            <button type="button" class="coupon-btn coupon-btn-valid">立刻领取</button>
                                        </div>
                                        <div class="coupon-intro">
                                            <div class="coupon-price">¥ 60</div>
                                            <div class="coupon-desc">【428周年庆】Dickies满559元减60元</div>
                                            <div class="coupon-time">使用期限: 2019.04.28-2019.05.05</div>
                                        </div>
                                    </li>
                                    <li class="coupon" data-coupon="449477">
                                        <div class="pull-right">
                                            <button type="button" class="coupon-btn coupon-btn-valid">立刻领取</button>
                                        </div>
                                        <div class="coupon-intro">
                                            <div class="coupon-price">¥ 80</div>
                                            <div class="coupon-desc">【周年庆】满699减80</div>
                                            <div class="coupon-time">使用期限: 2019.04.23-2019.04.27</div>
                                        </div>
                                    </li>
                                    <li class="coupon" data-coupon="449479">
                                        <div class="pull-right">
                                            <button type="button" class="coupon-btn coupon-btn-valid">立刻领取</button>
                                        </div>
                                        <div class="coupon-intro">
                                            <div class="coupon-price">¥ 110</div>
                                            <div class="coupon-desc">【周年庆】满999减110</div>
                                            <div class="coupon-time">使用期限: 2019.04.23-2019.04.27</div>
                                        </div>
                                    </li>
                            </ul>
                        </div>
                     </div>
                     <div class="coupon-drawer-mask" @click="getCoupon=false" @touchmove.prevent></div>
                 </div>
</div>
</template>
<script>
// 公告头部
import headerView from '../common/headerView.vue'

// vant
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Sku,
} from 'vant';
export default {
    data(){
        return{
             ish:false,
            //商品分类id
            goods_id:this.$route.query.goods_id,
            
            //商品图片路径
            baseUrl:'http://api.zfwl.c3w.cc/upload/images/',
             
             //头部显示导航
             isHide:true, 

             //显示弹窗规格 已选中的颜色和规格
             pitch:true,

             //显示领取优惠券
             getCoupon:false,

             //显示不同规格图片
             getImg:'',

             //显示加入购物车还是立即购买//规格弹窗的按钮text
             byHide:false,
             
                recommends: [], //推荐商品

                is_sku: false,  //规格弹窗

                sku_stock_s: false,     //规格.库存状态

                sku_price: 0,   //规格.价格

                sku_stock: 0,   //规格.库存

                sku_num: 1,     //规格.数量
                 
                selectArr: '',  //存放被选中的值
                
                shopItemInfo:{}, //存放要和选中的值进行匹配的数据

                selectArarr:[],  //发给后台
                
                goods: [], //渲染的商品,

                good:[],

    };
    },components:{
        // 公告头部
        headerView,
        // vant
        [Tag.name]: Tag,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    },methods: {

        showTab(){
            this.isHide=!this.isHide
        },

        formatPrice() {
        return '¥' + (this.goods.price);
        },

        onClickCart() {
        this.$router.push('cart');
        },

        //点击加入购物车
        sorry() {
             this.is_sku=true;                                  //改变规格弹窗状态为true
             this.byHide=false                                  //改变规格弹窗按钮
             this.getImg=this.baseUrl+this.goods.img[0].picture //点击加入默认sku显示的图片为第一张
        },

        //点击立即购买
        buy(){
            this.is_sku=true;      //改变规格弹窗状态为true
            this.byHide=true       //改变规格弹窗按钮
        },

        //点击关闭规格弹窗
        close(){
            this.is_sku=false;                                 //改变规格弹窗状态为true
        },

        //初始化规格数据
        initializeSpecification(){
                this.initSKU(); //初始化，得到SKUResult
                 var that = this;
                 that.sku_price = this.formatPrice(that.goods.price);
                for (let i = 0; i < that.good.length; i++) {
                for (let j = 0; j < that.good[i].res.length; j++) {
                       that.good[i].res[j].isSelect = false;
                       that.good[i].res[j].isShow = true;
                if (that.shopItemInfo[that.good[i].res[j].attr_id] == null) {
                       that.good[i].res[j].isShow = false;
                       that.good[i].res[j].isSelect = true;
                }
                }
            }
        },
          //获得对象的key
            getObjKeys(obj) {
            if (obj !== Object(obj)) throw new TypeError("Invalid object");
            var keys = [];
            for (var key in obj)
                if (Object.prototype.hasOwnProperty.call(obj, key))
                keys[keys.length] = key;
                 return keys;
            },
    
        //把组合的key放入结果集SKUResult
        add2SKUResult(combArrItem, sku) {
        var key = combArrItem.join(";");
        if (this.shopItemInfo[key]) {
            //SKU信息key属性·
            this.shopItemInfo[key].inventory += sku.inventory;
            this.shopItemInfo[key].prices.push(sku.price);
        } else {
            this.shopItemInfo[key] = {
            goods_id:sku.goods_id,    //商品Id
            sku_id:sku.sku_id,    //skuId  
            inventory: sku.inventory,  //库存
            prices: [sku.price],        //sku价格
            sku_attr:sku.sku_attr       //sku组合
            };
        }
        },

          //初始化得到结果集
    initSKU() {
      var i,
        j,
        skuKeys = this.getObjKeys(this.shopItemInfo);
      for (i = 0; i < skuKeys.length; i++) {
        var skuKey = skuKeys[i]; //一条SKU信息key
        var sku = this.shopItemInfo[skuKey]; //一条SKU信息value
        var skuKeyAttrs = skuKey.split(","); //SKU信息key属性值数组
        skuKeyAttrs.sort(function(value1, value2) {
          return parseInt(value1) - parseInt(value2);
        });
        //对每个SKU信息key属性值进行拆分组合
        var combArr = this.combInArray(skuKeyAttrs);
        for (j = 0; j < combArr.length; j++) {
          this.add2SKUResult(combArr[j], sku);
        }
        //结果集接放入SKUResult
        this.shopItemInfo[skuKeyAttrs.join(";")] = {
          goods_id:sku.goods_id,          //商品Id
          sku_id:sku.sku_id,          //skuId
          inventory: sku.inventory,  //库存
          prices: [sku.price],        //sku价格
          sku_attr:sku.sku_attr       //sku组合
        };
      }
    },

    /**
     * 从数组中生成指定长度的组合
     * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
     */
    combInArray(aData) {
      if (!aData || !aData.length) {
        return [];
      }
 
      var len = aData.length;
      var aResult = [];
 
      for (var n = 1; n < len; n++) {
        var aaFlags = this.getCombFlags(len, n);
        while (aaFlags.length) {
          var aFlag = aaFlags.shift();
          var aComb = [];
          for (var i = 0; i < len; i++) {
            aFlag[i] && aComb.push(aData[i]);
          }
          aResult.push(aComb);
        }
      }
 
      return aResult;
    },

    /**
     * 得到从 m 元素中取 n 元素的所有组合
     * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
     */
    getCombFlags(m, n) {
      if (!n || n < 1) {
        return [];
      }
 
      var aResult = [];
      var aFlag = [];
      var bNext = true;
      var i, j, iCnt1;
 
      for (i = 0; i < m; i++) {
        aFlag[i] = i < n ? 1 : 0;
      }
 
      aResult.push(aFlag.concat());
 
      while (bNext) {
        iCnt1 = 0;
        for (i = 0; i < m - 1; i++) {
          if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
            for (j = 0; j < i; j++) {
              aFlag[j] = j < iCnt1 ? 1 : 0;
            }
            aFlag[i] = 0;
            aFlag[i + 1] = 1;
            var aTmp = aFlag.concat();
            aResult.push(aTmp);
            if (
              aTmp
                .slice(-n)
                .join("")
                .indexOf("0") == -1
            ) {
              bNext = false;
            }
            break;
          }
          aFlag[i] == 1 && iCnt1++;
        }
      }
      return aResult;
    },
    
    /*商品条件筛选*/
    tabInfoChange(n,index,cid,$event) {

      var self = this
      let orderInfo = this.good; /*所有规格**所有规格*/
      let orderInfoChild = this.good[n].res; /*当前点击的规格的所有子属性内容*/
      if(this.good[n].spec_id==1){                                  //如果点击当前的id是规格
          if(index==this.goods.img.length){
            this.getImg=this.baseUrl+this.goods.img[0].picture    //切换不同的规格商品图片
          }else{
            this.getImg=this.baseUrl+this.goods.img[index].picture    //切换不同的规格商品图片
          }
          
      }
      //选中自己，兄弟节点取消选中
      if (orderInfoChild[index].isShow = true) {
        if (orderInfoChild[index].isSelect == true) {
            orderInfoChild[index].isSelect = false;
                this.sku_num = 1,  //只要取消选中 商品选择数量自动默认为1
                this.pitch=true;
        } else {
            for (let i = 0; i < orderInfoChild.length; i++) {
                orderInfoChild[i].isSelect = false;
                this.pitch=true;
          }
              orderInfoChild[index].isSelect = true;
              this.pitch=false;
                
        }
      }
       self.$forceUpdate(); //重绘

       //已选择的显示已选择的规格
         let li = []
         for(let i = 0; i < this.good.length; i++){
          for(let j = 0; j < this.good[i].res.length; j++){
                  
                    if(this.good[i].res[j].isSelect==true){
                       this.pitch=false;
                       li.push(this.good[i].res[j].attr_name)
                    }
          }

         this.selectArr=li.join('、')
      }
 
      // //已经选择的节点
      let haveChangedId = [];
      for (let i = 0; i < this.good.length; i++) {
        for (let j = 0; j < this.good[i].res.length; j++) {
          if (this.good[i].res[j].isSelect == true) {
            haveChangedId.push(this.good[i].res[j].attr_id);
            
          }
        }
      }
      if (haveChangedId.length) {
        //点击显示库存
        this.sku_stock_s = true;
        //获得组合key价格
 
        haveChangedId.sort(function(value1, value2) {

          return parseInt(value1) - parseInt(value2);
        });
        var len = haveChangedId.length;
        var prices = this.shopItemInfo[haveChangedId.join(";")].prices;   //价格
        this.sku_stock = this.shopItemInfo[haveChangedId.join(";")].inventory  //库存
        var maxPrice = Math.max.apply(Math, prices);
        var minPrice = Math.min.apply(Math, prices);
        this.sku_price = 
              maxPrice > minPrice
            ? '￥'+(minPrice) + "-" + '￥'+maxPrice
            : '￥'+maxPrice/*筛选价格*/
           
        //用已选中的节点验证待测试节点
        let daiceshi = []; //待测试节点
        let daiceshiId = [];
        for (let i = 0; i < this.good.length; i++) {
          for (let j = 0; j < this.good[i].res.length; j++) {
            if (this.good[n].res[index].attr_id != this.good[i].res[j].attr_id ) {
              daiceshi.push({
                index: i,
                cindex: j,
                id: this.good[i].res[j].attr_id
              }) ;
              daiceshiId.push(this.good[i].res[j].attr_id);
            }
          }
        }

        for (let i = 0; i < haveChangedId.length; i++) {
          var indexs = daiceshiId.indexOf(haveChangedId[i]);
          if (indexs > -1) {
            daiceshi.splice(indexs, 1);
          }
        }
        for (let i = 0; i < daiceshi.length; i++) {
          let testAttrIds = []; //从选中节点中去掉选中的兄弟节点
          let siblingsId = "";
          for (let m = 0; m < this.good[daiceshi[i].index].res.length; m++) {
            if (this.good[daiceshi[i].index].res[m].isSelect == true) {
              siblingsId = this.good[daiceshi[i].index].res[m].attr_id;
            }
          }
    
          if (siblingsId != "") {
            for (let j = 0; j < len; j++) {
              haveChangedId[j] != siblingsId && testAttrIds.push(haveChangedId[j]);

            }
          } else {
            testAttrIds = haveChangedId.concat();

          }
          testAttrIds = testAttrIds.concat(
            this.good[daiceshi[i].index].res[daiceshi[i].cindex].attr_id
          );
          testAttrIds.sort(function(value1, value2) {
            return parseInt(value1) - parseInt(value2);
          });

          if (!this.shopItemInfo[testAttrIds.join(";")] ) {
            this.good[daiceshi[i].index].res[
              daiceshi[i].cindex
            ].isShow = false;
            this.good[daiceshi[i].index].res[
              daiceshi[i].cindex
            ].isSelect = false;
          } else {
            this.good[daiceshi[i].index].res[
              daiceshi[i].cindex
            ].isShow = true;

            //如果库存 == 0 的时候 sku组合不可选
             if(this.shopItemInfo[testAttrIds.join(";")].inventory == 0){
            this.good[daiceshi[i].index].res[
              daiceshi[i].cindex
            ].isShow = false;
            }
                this.selectArarr =  this.shopItemInfo[testAttrIds.join(";")]    
          }
        }
      } 
      else {
        //设置默认价格
        this.sku_price = this.formatPrice(this.goods.price);
        //设置默认库存
        this.sku_stock = 0 ;
        //设置默认隐藏库存
        this.sku_stock_s = false;
        //设置属性状态
        for (let i = 0; i < this.good.length; i++) {
          for (let j = 0; j < this.good[i].res.length; j++) {
            if (this.shopItemInfo[this.good[i].res[j].attr_id]) {
              this.good[i].res[j].isShow = true;
            } else {
              this.good[i].res[j].isShow = false;
              this.good[i].res[j].isSelect = true;
            }
          }
        }
      }
    },


        //规格弹窗 减少数量
        minusNum(){
                 let le = [];
                 let sele = []
                 if(this.selectArr == ''){
                      for (let i = 0; i < this.good.length; i++) {
                        le.push(this.good[i].spec_name) 
                    }
                    Toast('请先选择商品'+le.join('-')+'噢~')
                    return 
                 }else{
                   if(this.selectArarr.inventory == 0){
                      Toast('您选中的商品已售罄噢~')
                      return
                   }
                    for (let i = 0; i < this.good.length; i++) {
                        for (let j = 0; j < this.good[i].res.length; j++) {
                          if(this.good[i].res[j].isShow){
                             if(this.good[i].res[j].isSelect){
                               sele.push(this.good[i].spec_name)
                             }
                          }
                    }    
                    }
                     for (let i = 0; i < this.good.length; i++) {
                    if(sele[i]!=this.good[i].spec_name){
                       Toast('请选择商品'+this.good[i].spec_name+'噢~')
                       return
                    }     
                    }
                 }
                   if( this.sku_num > 1){  //如果数量小于一

                      this.sku_num--;

                  }else{

                      Toast('您选中的数量不能为零噢~')

                  }
          
        },

  
        
        //规格弹窗 增加数量
        addNum(){
                let le = [];
                let sele = []
                 if(this.selectArr == ''){
                      for (let i = 0; i < this.good.length; i++) {
                        le.push(this.good[i].spec_name) 
                    }
                    Toast('请先选择商品'+le.join('-')+'噢~')
                    return 
                 }else{
                   if(this.selectArarr.inventory == 0){
                      Toast('您选中的商品已售罄噢~')
                      return
                   }
                    for (let i = 0; i < this.good.length; i++) {
                        for (let j = 0; j < this.good[i].res.length; j++) {
                          if(this.good[i].res[j].isShow){
                             if(this.good[i].res[j].isSelect){
                               sele.push(this.good[i].spec_name)
                             }
                          }
                    }    
                    }
                     for (let i = 0; i < this.good.length; i++) {
                    if(sele[i]!=this.good[i].spec_name){
                       Toast('请选择商品'+this.good[i].spec_name+'噢~')
                       return
                    }     
                    }
                 }
                  if( this.sku_num < 10){  //如果数量小于10

                      this.sku_num++;

                  }else{

                      Toast('您选中的数量不能超过10噢~')

                  }

        },

        //加入购物车
        addCart(){
            let le = [];
            let sele = []
                 if(this.selectArr == ''){
                      for (let i = 0; i < this.good.length; i++) {
                        le.push(this.good[i].spec_name) 
                    }
                    Toast('请先选择商品'+le.join('-')+'噢~')
                    return 
                 }else{
                   if(this.sku_stock == 0){
                      Toast('您选中的商品已售罄噢~')
                      return
                   }else{
                        for (let i = 0; i < this.good.length; i++) {
                        for (let j = 0; j < this.good[i].res.length; j++) {
                          if(this.good[i].res[j].isShow){
                             if(this.good[i].res[j].isSelect){
                               sele.push(this.good[i].spec_name)
                             }
                          }
                    }    
                    }
                     for (let i = 0; i < this.good.length; i++) {
                    if(sele[i]!=this.good[i].spec_name){
                       Toast('请选择商品'+this.good[i].spec_name+'噢~')
                       return
                    }     
                    }
                   }  
                
                 }
                 Toast('商品添加购物车成功~')
                 this.selectArarr.uid = 1
                 this.selectArarr.goods_num = this.sku_num
                 this.$store.commit("increment") 
        },

        //立即购买
        purchase(){

                if(this.shopItemInfo.color==""){
                 Toast("请选择商品颜色噢~")
                 return;
                }else if(this.shopItemInfo.size==""){
                    Toast("请选择商品规格噢~")
                    return;
                }
                   this.$router.push('/cart')   
        },
         //点击收藏
        onClickMinicollect(){
            this.ish!=this.ish
              Toast.success({
                message:'收藏成功',
                mask:true,
                loadingType:'spinner',
                forbidClick:true
              });
        },
        optCartCount(){
             return this.$store.getters.optCartCount;
        }
       
        },
        //获取商品规格
        created(){
          // 调用loading 
			    this.$store.commit('showLoading')
            var that = this;
            var url = "/api/goods/goodsDetail?goods_id="+this.goods_id
                that.$axios.get(url).then((res)=>{
                  if(res.status === 200){
                    that.goods = res.data.data;
                    that.good =  res.data.data.spec.spec_attr;
                    // 数据加载成功，关闭loading 
					        this.$store.commit('hideLoading')
                  }
                    
             for (var i in that.goods.spec.goods_sku) {  
             that.shopItemInfo[that.goods.spec.goods_sku[i].sku_attr1] = that.goods.spec.goods_sku[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
              }
               //初始化规格
                this.initializeSpecification();
            })
            .catch( error => {
            this.$store.commit('hideLoading')
            alert(error)
                })
            
    },
}
</script>
<style lang="stylus" scoped>
@import "../../../static/css/cart/cart.css";
    .details
       background #eee
       overflow hidden
    .rightBtn>img
       height 50px
       width 50px
    header 
        width 100%
        height 88px
        line-height 88px
        background-color #323232
        color #fff
        text-align center
        position relative
        z-index 99
        position fixed
    .homebuttom 
        background-size: 100% 100%;
        color: #fff;
        height 355px
        overflow: hidden;
        padding-top: 17px;
        position: absolute;
        right: .3rem;
        top: 80px
        width: 280px
        z-index: 2;
       .ul-arr 
            background-color: #434343;
            -webkit-transform: rotate(45deg);
            height: 42px
            position: absolute;
            right 30px
            top: .1rem;
            transform: rotate(45deg);
            width: 42px
        .homebuttom   ul 
               border-radius: .25rem;
               height: 338px
               overflow: hidden;
               padding: 1px 0;
               width:100%
               background-image: linear-gradient(#434343,#171717);
        .homebuttom   ul   li
                    float: left;
                    height: 84px
                    line-height: 84px
                    overflow: hidden;
                    padding-left:40px
                    width: 100%;
        ul   li   span
                            border-bottom: 1px solid #444;
                            color: #fff;
                            display: block;
                            float: left;
                            font-size: 30px
                            height: 83px
                            padding-left: 40px
                            width: 190px
                            text-align left
       .homebuttom ul li .iconfont
            display: block;
            float: left;
            height 40px
            width 40px
            margin-top 20px
            //vant
            .goods {
                padding-bottom: 50px;
                &-swipe {
                    img {
                    width: 100%;
                    display: block;
                    height 500px;
                    }
                }
                &-title {
                    font-size: 16px;
                }
                &-price {
                    color: #f44;
                }
                &-express {
                    color: #999;
                    font-size: 12px;
                    padding: 5px 15px;
                }
                &-cell-group {
                    margin: 15px 0;
                    .van-cell__value {
                    color: #999;
                    }
                }
                &-tag {
                    margin-left: 5px;
                }
                }
        .goods
            padding-top 88px
            padding-bottom 90px
           .goods-swipe
                    max-height 660px
                    background-color #fff
        .van-swipe-item
              display: flex;
        .van-swipe-item  img
               margin 30px auto
               height 597px

      .goods-name
                background-color: #515150; 
                color: #fff;
                padding 20px 28px
                line-height 45px
                .van-cell__value--alone
                    color: #fff; 
                    font-size 35px
                    .goods-price
                        color #d0021b
                        .original
                            text-decoration line-through
                            color #b0b0b0
                            font-size 30px
                            margin-left 10px
      .goods-express,.van-cell
         padding 20px 28px
         line-height 45px
         margin-top: 10px
     .van-cell
         font-size: 30px
    // bottom
    .van-info
        line-height 27px
        height 27px
        font-size 20px
    .van-goods-action
        height 90px
    .van-goods-action-mini-btn,.van-button--large
           height 100%  
           font-size 25px
    .van-goods-action-mini-btn__icon
        font-size 35px

    // 商品评价
      .mod_detail_info_header 
            background-color: #fff;
            position: relative;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
            margin-top: 10px;

      .evaluate .detail_info_line 
            border-bottom: 1px solid #eee
            position: relative
            padding: 30px 0 30px 20px
     .mod_detail_info_header  .icon-conpou
            background-color: #d0021b
            border-radius: .1rem
            color: #fff 
            float: left
            font-size 25px
            padding 3px
            margin-right 10px

     .mod_detail_info_header h3,.mod_detail_info_header h4
            color: #333;
            float: left;
            font-size: 30px
            font-weight: normal;
    
    .mod_detail_info_header h4
            color: #a0a0a0;
            font-size 25px
            margin-top 5px
            margin-left 10px

    .detail_switch 
            padding-left: 15px;

    .evaluate .evaluate_tag_box 
            overflow: hidden
            box-sizing: border-box
            padding: 5px 0 15px 0
            border-bottom: 1px solid #f4f4f4
            
    .evaluate .evaluate_tag_box_inner 
            height: 50px
            overflow: hidden

    .evaluate .evaluate_tag_box span.tags_span 
            display: inline-block;
            font-size: 25px
            color: #fff;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            background: #515150
            border: 2px solid #000000;
            height: 40px
            line-height: 40px
            vertical-align: middle;
            padding: 0 8px;
            margin: 10px 10px 0 0;

    .evaluate .evaluate_list_box 
            padding: 15px 0 20px 0;

    .evaluate .evaluate_list_box .evaluate_box 
            padding-right: 15px;
            background: #fff;

    .evaluate .evaluate_list_box .evaluate_box .avator_wrap 
            float: left;
            height: 50px
            line-height 50px;

    .evaluate .evaluate_list_box .evaluate_box .quality_time 
            float: right;

    .evaluate .evaluate_list_box .evaluate_box .avator_wrap img.avator_pic 
            width: 50px
            height: 50px;
            border-radius: 15px;
            -webkit-border-radius: 15px;
            display inline-block

    .evaluate .evaluate_list_box .evaluate_box .comment_time 
            color: #ccc;
            font-size: 13px;
            line-height: 50px;

    .evaluate .evaluate_list_box .evaluate_box .avator_wrap .avator_name 
            display: inline-block;
            line-height: 50px;
            margin-left: 5px;
            vertical-align: text-bottom;
            max-width: 145px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

    .evaluate .evaluate_list_box .evaluate_box p.evaluate_comment 
            font-size: 25px;
            clear: both;
            color: #747474;
            word-break: break-all;
            overflow: hidden;
            margin-top: 25px

    .evaluate .all_evaluate_btn 
            cursor: pointer;
            display: block;
            color: #0092d8;
            height: 60px
            line-height: 60px
            font-size: 25px
            text-align: center;
            border-top: 1px solid #f4f4f4;

    .evaluate .evaluate_icon
                display: inline-block;
                position: relative;
                top: -5px;
                left: 2px;
                font-size: 13px;
                font-weight: normal;
                border-bottom: 2px solid #0092d8;
                border-right: 2px solid #0092d8;

    .detail_wrap 
                display: block;
                width:100%;

    .detail_wrap    .p-info
                padding: 17px 25px 20px 25px;
                font-size: 25px
                background-color: #fff;

     .detail_wrap    .p-info>img
                display: block;
                width:100%;

    .marking_price_wrap 
                padding: 17px 25px 20px 25px;
                font-size: 25px
                background-color: #fff;

    .marking_price_wrap .marking_price__title 
                position: relative;
                height: 30px
                line-height: 30px
                padding-left: 5px;
                margin-bottom: 6px;
                font-weight: bold;
                color: #000;
                vertical-align: baseline;

    .marking_price_wrap .marking_price__content 
                padding-left: 5px;
                margin-bottom: 15px;
                color: #999;

//    sku 
     .thumb
                height 2.34rem

//     领取优惠券
     .details .coupon-drawer-dialog 
                background-color: #fff;
                bottom: -100%;
                left: 0;
                position: fixed;
                right: 0;
                transition: all .3s;
                z-index: 11;

    .details .coupon-drawer.open .coupon-drawer-dialog 
                bottom: 0;

    .details .coupon-drawer-mask 
                background-color: rgba(0,0,0,.6);
                bottom: 0;
                display: none;
                left: 0;
                position: fixed;
                right: 0;
                top: 0;
                z-index: 10;

    .details  .coupon-drawer.open .coupon-drawer-mask 
                display:block;

    .details .coupon-drawer-dialog .title 
                border-bottom: 1px solid #e0e0e0;
                font-size: 30px
                line-height: 89px
                text-align: center;

    .details .coupon-drawer-dialog .body 
                border-bottom: .5rem solid #fff;
                height: 540px
                overflow: auto;
    
    .details .coupon 
                border-bottom: 1px solid #e0e0e0;
                margin-left: 30px
                margin-right: 30px
                min-height: 119px
                padding-bottom: 15px
                padding-top: 30px

    .pull-right 
                float: right;
    
    .details .coupon-btn 
                background-color: #fff;
                border: 2px solid #b0b0b0;
                border-radius: .2rem;
                color: #b0b0b0;
                font-size: 25px
                height: 53px
                margin-top: 20px
                min-width: 128px
                padding: 0;

    .details .coupon-btn-valid 
                border-color: #d0021b;
                color: #d0021b;
    
    .details .coupon-intro 
                overflow: hidden;
                padding-right: 15px
    
    .details .coupon-price 
                color: #d0021b;
                font-size: 40px
                line-height: 1;

    .details .coupon-desc 
                color: #444;
                font-size: 26px
    .details .coupon-time 
                color: #b0b0b0;
                font-size: 25px

    .van-icon-like-1:before
                 content: "\F075";
                 color red




</style>
