<template>
    <div class="coupont">
           <headerView custom-title="我的优惠券" custom-fixed rightNone>
				<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
					<img src="../../../../static/img/public/backBtn.png" />
				</div>
			</headerView>
        <div class="coupon-box">
                <div class="coupon-tabr">
                    <ul>
                        <li class="item-tabr" v-for="(item,index) in tabr" @click="tabrs(index)" :class="{active:index==indexx}">{{item.name}}</li>
                        <!-- <li class="item-tabr">已使用 (5)</li>
                        <li class="item-tabr">已过期 (5)</li> -->
                    </ul>
                </div>
                <div class="coupon-tabr-box">
					<!-- 未使用 -->
                    <div class="coupon-list unused">
						<!-- 未使用 -->
                        <section class="coupon-section"  v-if="indexx==0"  v-for="item in list" :key="item.id">
                            <div class="coupon">
                                <div class="coupon-left coupon-left-activity">
                                    <p class="value"><span>{{parseInt(item.price)}}</span></p>
                                </div>
                                <div class="coupon-right">
                                    <p class="title">
                                        <span class="type-activity">[活动券]</span> 【周年庆】{{parseInt(item.price)}}元现金券
                                     </p>
                                     <p class="title">
                                        <span class="type-activity">{{parseInt(item.threshold)===0?'无门槛':"满"+item.threshold+'可使用'}}</span> 
                                     </p>
                                    <p class="time">{{item.start_time | formatDate}}一{{item.end_time | formatDate}}</p>
                                    
                                    <p class="use-intro" @click="frost(item)">
                                        <span class="show-intro-btn">使用说明</span>
                                        <span class="iconfont" :class="item.arrows?'icon-up':'icon-down'"></span>
                                    </p>
                                    <span class="tip"></span>
                                </div>
                                    <router-link :to="'/details?goods_id='+item.goods_id" href="" class="use-now">立即使用</router-link>
                            </div>
                            <ul class="coupon-intro" v-show="item.arrows">
                                <li>特例商品不支持使用优惠券</li>
                            </ul>
                        </section>
						
						<!-- 已使用 -->
						<section class="coupon-section"  v-if="indexx==1" v-for="item in list" :key="item.id">
							<div class="coupon coupon-have">
								<div class="coupon-left have">
									<p class="value"><span>{{parseInt(item.price)}}</span></p>
								</div>
								<div class="coupon-right rightHave">
									<p class="title">
										<span class="type-activity">[活动券]</span> 【周年庆】{{parseInt(item.price)}}元现金券</p>
                                    <p class="title">
                                        <span class="type-activity">{{parseInt(item.threshold)===0?'无门槛':"满"+item.threshold+'可使用'}}</span> 
                                     </p>
									<p class="time">{{item.start_time | formatDate}}一{{item.end_time | formatDate}}</p>
									<p class="use-intro"  @click="frost(item)">
										<span class="show-intro-btn">使用说明</span>
										<span class="iconfont" :class="item.arrows?'icon-up':'icon-down'"></span>
									</p>
									<span class="tip"></span>
								</div>
										<div class="stamp used-stamp"></div>
							</div>
							<ul class="coupon-intro " v-show="item.arrows">
								<li>特例商品不支持使用优惠券</li>
							</ul>
					    </section>
						<!-- 已失效 -->
						<section class="coupon-section"  v-if="indexx==2" v-for="item in list" :key="item.id">
							<div class="coupon coupon-have">
								<div class="coupon-left have">
									<p class="value"><span>{{parseInt(item.price)}}</span></p>
									<!-- <p class="threshold">满149元可用</p> -->
								</div>
								<div class="coupon-right rightHave">
									<p class="title">
										<span class="type-activity">[活动券]</span> 【周年庆】{{parseInt(item.price)}}元现金券</p>
                                    <p class="title">
                                        <span class="type-activity">{{parseInt(item.threshold)===0?'无门槛':"满"+item.threshold+'可使用'}}</span> 
                                     </p>
									<p class="time">{{item.start_time | formatDate}}一{{item.end_time | formatDate}}</p>
									<p class="use-intro"  @click="frost(item)">
										<span class="show-intro-btn">使用说明</span>
										<span class="iconfont" :class="item.arrows?'icon-up':'icon-down'"></span>
									</p>
									<span class="tip"></span>
								</div>
										<div class="stamp overtime-stamp"></div>
							</div>
							<ul class="coupon-intro " v-show="item.arrows">
								<li>特例商品不支持使用优惠券</li>
							</ul>
					    </section>
                    </div>
					<!-- 近期使用或已失效 -->
					<div class="used-tip" :class="{hide:indexx==0}">
						<hr>
						<span class="used" :class="{hide:indexx==0||indexx==2}">以上是近期已使用的优惠券</span>
						<span class="invalid" :class="{hide:indexx==0||indexx==1}">以上是近期已失效的优惠券</span>
						<hr>
					</div>
					<!-- 暂无优惠卷 -->
					<div class="no-conpon-now " v-if="list.length===0">
					  <div class="icon-not"></div>
					   <p>暂无优惠券</p>
					</div>
                </div>
        </div>
    </div>
</template>
<script>
import headerView from '../../common/headerView.vue'
import { Dialog,Toast } from 'vant'
export default {
    data(){
        return{
            //图片路径
           baseUrl:'',
			// 使用说明
			 arrows:false,
			 tabr:[
				 {name:'未使用',num:1},{name:'已使用',num:5},{name:'已过期',num:4}
			 ],
			 //默认为零 默认显示第一个未使用
             indexx:0,
             list:[]
        }
    },components:{
        headerView
    },methods: {
		    // 使用说明
		frost(item){
            
            //    this.arrows=!this.arrows
                if(typeof item.arrows == "undefined"){
                this.$set(item,"arrows",true)
            }else{
                item.arrows=!item.arrows;
            }
            
		},  
			//tabr
		tabrs(index){
			this.indexx=index
            this.arrows=false
            var t = index+1;
            var url = 'coupon/my_coupon'
        // 我的优惠券	coupon/my_coupon
        // 参数：
        // token
        // type	//1未使用，2已使用，3已过期
        var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value
            params.append('type', t); //你要传给后台的参数值 key/value
			    this.$axios({
							method:"post",
                            url:url,
                            data: params
				}).then((res)=>{
					if(res.data.status===1){
                      this.list = res.data.data
					}else{
					    Dialog.alert({
						message:res.data.msg
                        })	
                        
					}
			})
		}
    },
    created() {
        //图片路径
        this.baseUrl=this.url
        var url = 'coupon/my_coupon'
        // 我的优惠券	coupon/my_coupon
        // 参数：
        // token
        // type	//1未使用，2已使用，3已过期
        var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value
            params.append('type', '1'); //你要传给后台的参数值 key/value
			    this.$axios({
							method:"post",
                            url:url,
                            data: params
				}).then((res)=>{
					if(res.data.status===1){
                      this.list = res.data.data
					}else{
					    Dialog.alert({
						message:res.data.msg
						})	
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
                return y + '-' + MM + '-' + d 
            }
    }
}
</script>
<style lang="stylus" scoped> 
    .coupon-box
      padding-top 88px   
      .coupon-tabr
        padding 20px
        background-color  #fff
    .coupont
      .coupon-tabr
          ul
            display flex
           .item-tabr
              width 33.3%
              text-align center
              font-size 30px
              height 50px
              color #b0b0b0
              line-height 50px
           .active
                color #444 
           .item-tabr:nth-child(2)
               border-right  1px solid #dddddd
               border-left   1px solid #dddddd
    //   优惠券
    .coupon-list
        padding 20px
    .coupon-list  .coupon-section 
        margin-bottom 20px
    .coupon-list  .coupon-section  .coupon 
        height 200px
        position relative
        width 100%
        display flex
     .coupon-list  .coupon-section  .coupon  .coupon-left        
        align-items center
        background-image url(../../../../static/img/user/coupon/activity.29021f7015.png)
        background-size 100% 100%
        display flex
        flex-direction column
        float left
        height 200px
        justify-content center
        width 30%
        p
          color #fc5960
          font-size: 20px;
          span 
           font-size 63px
           font-weight 600
     .coupon .coupon-right
                background-color #fff
                border-bottom-right-radius .2rem
                border-top-right-radius .2rem
                color #b0b0b0
                float left
                font-size 33px
                height 200px
                padding 22px
                position relative
                width 70%
                flex 1
                .title
                    color: #444;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    font-size: 20px;
                    overflow: hidden;
                    width: 370px;
                    .type-activity
                        color: #fc5960;
                        font-weight: 500;
                .time 
                    -webkit-transform: translateY(-50%);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 15px;
                .use-intro
                    bottom: 22px;
                    position: absolute;
                    font-size 20px
       .coupon-list 
         .coupon 
          .use-now
            background-color #fff
            border 2px solid #444
            border-radius 20px
            bottom 22px
            color #444
            font-size 15px
            height 50px
            line-height 50px
            position absolute
            right .5rem
            text-align center
            width 130px
         .coupon-intro  
            background: hsla(0,0%,100%,.7)
            margin-top: -12px
            padding: 36px 22px 22px
          li 
            color: #444
            font-size: 15px
        .icon-down
            background url(../../../../static/img/user/coupon/cc-down.png) no-repeat 50%
            background-size 100%
            width 42px
            height 27px
            display inline-block
            vertical-align sub
		.icon-up
		    background url(../../../../static/img/user/coupon/cc-up.png) no-repeat 50%
		    background-size 100%
		    width 42px
		    height 27px
		    display inline-block
		    vertical-align sub
	  .coupon-tabr-box
		 	.no-conpon-now
			    color #b0b0b0
			    padding-top 461px
			    text-align center
			    .icon-not
			       background-image url('../../../../static/img/user/coupon/not.png')
			       background-size 100% 100%
			       height 130px
			       margin auto auto 30px
			       width 208px
	  .coupon-tabr-box
	      .used-tip
	         display flex
	         justify-content center
	         hr
	          border none
	          border-bottom 1px solid #e0e0e0
	          width 160px
	          margin 14px 35.5px
	         span
	          color #b0b0b0
	          font-size 15px
	      .hide
	         display none
    // 已使用
	 .coupon-list  .coupon-section  .coupon  .have
	        background-image url(../../../../static/img/user/coupon/overtime.3f1295738c.png)
	 .coupon-list .coupon-section .coupon .have p,.coupon .rightHave  .title .type-activity,.coupon .rightHave  .title 
	        color: #b0b0b0;
	.coupon-box .coupon-list .coupon .stamp 
    -webkit-transform: translateY(-50%);
    background-size: 100% 100%;
    height: 114px
    position: absolute;
    right: .5rem;
    top: 60%;
    transform: translateY(-50%);
    width: 126px;
	.coupon-box .coupon-list .coupon .used-stamp 
    background-image: url(../../../../static/img/user/coupon/used.622e9d2c81.png);
	.coupon-box .coupon-list .coupon .overtime-stamp
	background-image url('../../../../static/img/user/coupon/timeout.53da2df638.png');
</style>
