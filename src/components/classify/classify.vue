<template>
	<div class="Classify">
		<div class="container">
			<!-- 头部组件 -->
			<headerView custom-title="分类" custom-fixed rightNone>
				<!-- <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
					<img src="static/img/public/backBtn.png" />
				</div> -->
			</headerView>
			
			<div class="scroll">
				<div class="scroll-menu" ref="menuBox">
					
					<ul>
						<li
							v-for="(item,index) of resData"
							:key="index"
							@click="handleClick(index)"
							:class="{on:currentIndex === index }"
							>{{item.cat_name}}</li>
					</ul>
				</div>
				<div class="scroll-prolist" ref="proBox">
					<ul class="pro">
						<li class="pro-classify" ref="proClassify"
							v-for="(items,index) of resData"
							:key="index"
							>	
							<!-- 热门种类 -->
							<div v-for="item in items.children">
								<h3 class="title">{{item.cat_name}}</h3>
								<ul class="pro-items">
									<router-link
										tag="li"
										v-for="(it,index) of item.children"
										:to="'/productLsit?cat_id='+item.cat_id"
										:key="index"
									>
									<div class="picture">
											<img :src="baseUrl + it.img">
										</div>
										<p>{{it.cat_name}}</p>
									</router-link>
								</ul>
							</div>

							<!-- 热销商品 -->
							<div v-if="items.goods">
								<h3 class="title">热销商品</h3>
								<ul class="singleList">
									<router-link 
										tag="li"
										:to="'/details?goods_id='+item.goods_id"
										v-for="(item,index) in items.goods"
										:key="index"
										>
										<div class="img-wrap">
											<img :src="baseUrl + item.img">
										</div>
										<div class="text">
											<h3>{{item.goods_name}}</h3>
											<span class="sign" v-for="items in item.attr_name" :key="items">{{items}}</span>
											<div class="line3">
												<span class="price">¥{{item.price}}</span>
												<span class="commentNum">评论{{item.comment}}条</span>
											</div>
										</div>
									</router-link>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		  
		<!-- 底部导航组件 -->
		<menuBar></menuBar>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import headerView from '../common/headerView'
	import menuBar from '../common/menuBar.vue'
	export default {
	 	name:"Classify",
	 	data(){
	 		return{
	 			menuBar:[],
				goods:[],
				resData:[],
	 			listHeight:[],
				scrollY:0,
				baseUrl:''
	 		}
		},
		 
	 	computed:{
			// 当前索引值 
	 		currentIndex(){
	 			for(let i = 0;i < this.listHeight.length-1;i++){
	 				let height1 = this.listHeight[i]
					let height2 = this.listHeight[i+1]					 
	 				if(!height2 || (this.scrollY >= height1 && this.scrollY< height2) ){
						 return i;
	 				}
	 			}
	 			return 0;
	 		}
		},
		 
	 	methods:{
			// 后退
            backBtn:function(){
                this.$router.go(-1);
			},
			// 初始化Better-Scroll实例
	 		initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuBox,{
					click:true
				})
	 			this.proScroll = new BScroll(this.$refs.proBox,{
					click:true,
	 				probeType : 3
	 			})
	 			this.proScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y))
	 			})
			 },
			// 根据索引点击跳至对应内容
	 		handleClick(i){
	 			let proList = this.$refs.proClassify
				let el = proList[i]
				this.proScroll.scrollToElement(el,300);
			 },
			// 获取内容高度 
	 		getHeight(){
				let proList = this.$refs.proClassify
				let height = 0
				 
				this.listHeight.push(height)
				
	 			for(let i = 0; i < proList.length; i++ ){
					
					let item = proList[i]
					 
					height += item.clientHeight
					
	 				this.listHeight.push(height)
				 }
	 		}
		 },
		// dom节点渲染完成后请求接口数据 
	 	mounted(){

			// 调用loading 
			this.$store.commit('showLoading')
			
	 		this.$axios.get("/goods/categoryList")
	 		// this.axios.get("/api/classify.json")
	 		.then((res)=>{
				 if(res.status === 200){
					// 数据加载成功，关闭loading 
					this.$store.commit('hideLoading')

					let resData = res.data.data
					this.resData = resData
					this.$nextTick(()=>{
						this.initScroll()
						this.getHeight()
					})
				 }
			 })
			.catch( error => {
				this.$store.commit('hideLoading')
				alert(error)
            })
			 
		 },
		 created() {
			 //图片路径
           this.baseUrl=this.url
		 },
		// 注册组件 
		components:{
			headerView,
			menuBar
        }
		 
	}
</script>

<style lang="stylus" scoped="scoped">
.Classify
	background-color #fff
	height 100vh
	overflow hidden
	.container
		.scroll
			display flex
			padding-top 88px
			.scroll-menu
				width 234px
				background #fafafa
				ul
					li
						height 93px
						line-height 93px
						text-align center
						font-size 28px
					li.on
						color #ff9900
						background url("~/static/img/classify/menu-bg.jpg") no-repeat
			.scroll-prolist
				width 516px	
				height calc(100vh - 100px)
				padding 0 20px
				.pro
					padding-bottom 100px
					.pro-classify
						.title
							line-height 100px
							font-size 28px						
						.pro-items
							display flex
							flex-wrap wrap
							li
								width 31%
								height 274px
								margin 10px 15px 10px 0
								&:last-child
									margin-right 0
								.picture
									width 100%;
									height 215px;
									overflow hidden
									position relative
									img
										width 100%
										position absolute
										left 50%
										top 50%
										transform translate(-50%,-50%)
										z-index 3
										height 100%
								p
									text-align center
									height 60px
									line-height 60px
									font-size 26px
									color #000000 
									overflow: hidden;/*超出部分隐藏*/
									white-space: nowrap;/*不换行*/
									text-overflow:ellipsis;/*超出部分文字以...显示*/
						.singleList
							li
								display flex
								align-items center
								border-bottom 1px solid #eeeeee
								padding 10px 0
								height 200px
								.img-wrap
									width 160px
									height 100%
									margin-right 10px
									img 
										width 100%
										height 100%
								.text
									flex 1
									h3
										font-size 26px
										color #000
										font-weight normal
										line-height 32px
										display: -webkit-box
										overflow hidden
										-webkit-line-clamp 2
										-webkit-box-orient vertical
									.sign
										padding 0 4px
										box-sizing border-box
										height 35px
										line-height 35px
										color #ffffff
										font-size 22px
										background-color #ff6600
										margin 15px 0
										display inline-block
										margin-right 4px
									.price
										font-size 20px
										color #ff6600
									.commentNum
										font-size 20px	
										color #999999							

			
		
					

		
</style>
