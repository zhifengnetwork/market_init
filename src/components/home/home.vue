<template>
	<div class="home">
		<!--div 循环-->
		<div class="drag_box" v-for="(v,i) in backData['data']">
			<!--轮播图 box-->
			<div class="modle_box" :class="v.id+v.key_num" v-if="v.id == 'rotationId'? true:''" :key="v.id">
				<div class="slide swiper-wrapper">
					<div class="slide_item swiper-slide" v-for="(val,index) in v.data.images">
						<img :src="val.imgUrl" alt="" />
					</div>
				</div>
				<div class="slide_but swiper-pagination" :class="[v.params.butPosition,v.params.butStart]">
					<span v-for="(val,index) in v.data.images" :class="v.params.butStyle" :style="{'background':index == 0?v.params.clickColor:v.params.butColor}"></span>
				</div>
			</div>

			<!--搜索模块 box-->
			<div class="modle_box" v-if="v.id == 'searchId'? true:''" :key="v.id">
				<div class="search" :style="{'background':v.params.backColor}">
					<form action="#" :style="{'border-color':v.params.borderColor}" :class="v.params.reStyle">
						<input type="submit" class="searchBtn" value="" >
						<input type="text" class="searchText" :placeholder="v.data.tipeText" :style="{'color':v.params.textColor}">
					</form>
					<!--跳转-搜索页面-->
					<p class="mask_input" @click.stop="routing_jump('/search')"></p>
				</div>

			</div>
			<!--按钮组 模块 box-->
			<div class="modle_box" v-if="v.id == 'bottonsId'? true:''" :key="v.id">
				<div class="modle_bottons" :style="{backgroundColor:v.params.iconColor}">
					<!--四个按钮=>20%，五个按钮=>25%-->
					<div class="modle_mod_nav" v-for="item in v.data.iconList" :style="{width: v.params.iconNum == '4' ? '25%':'20%'}">
						<!--四个按钮=>margin: 0 16px; 五个按钮=>margin: 0 12px;-->
						<p class="modle_mod_img" :style="{margin: v.params.iconNum == '4' ? '0 16px':'0 12px'}">
							<img :src="item.url" :style="{borderRadius:v.params.iconStyle}">
						</p>
						<p class="modle_mod_text" :style="{color:item.siezColor}">{{item.text}}</p>
					</div>
				</div>

			</div>

			<!--单图模块 box-->
			<div class="modle_box" v-if="v.id == 'signageId'? true:''" :key="v.id">
				<div class="signage">
					<div class="signage_img" v-for="item in v['data']['images']">
						<img :src="item['imgUrl']" alt="">
					</div>
				</div>
			</div>

			<!--商品组模板 box -->
			<div class="modle_box" v-if="v.id == 'productListId'? true:''" :key="v.id">
				<div class="modle_shop clearfloat">
					<div class="modle_shop_title" :style="{color:v.params.titleColor}" v-if="v.params.titletext!=''&&v.params.title=='true'">{{v.params.titletext}}</div>
					<!-- 显示一个 ，
						传参-路由跳转:routing_jump('商品id')
					-->
					<div class="modle_shop_item" v-if="v.params.listStyle=='modle_shop_item'" v-for="item in v.data.msg" @click.stop="routing_jump('/details?goods_id=',item['goods_id'])">
						
						<div class="modle_shop_img">
							<img :src="item.img" alt="">
							<div class="modle_shop_attr" :class="v.params.attr"></div>
						</div>
						
						<div class="modle_shop_info">
							<p class="modle_shop_name">{{item.goods_name}}</p>
							<div class="modle_shop_price" :class="v.params.price">
								￥{{item.price}}<s>￥{{item.original_price}}</s>
								<div class="modle_shop_buybtn" :class="v.params.btnStyle"></div>
							</div>
						</div>
					</div>
					<!-- 显示多个 -->
					<div :class="v.params.listStyle" v-if="v.params.listStyle!='modle_shop_item'" v-for="item in v.data.msg" @click.stop="routing_jump('/details?goods_id=',item['goods_id'])">
						<div class="modle_shop_img">
							<img :src="item.img" alt="">
							<div class="modle_shop_attr" :class="v.params.attr"></div>
							<p class="modle_shop_price" :class="v.params.price">
								￥{{item.price}}<s>￥{{item.original_price}}</s>
							</p>
						</div>
						<div class="modle_shop_info" :class="v.params.name">
							<div class="modle_shop_name" :style="{width:v.params.btnStyle==''?'100%':''}">
								{{item.goods_name}}
							</div>
							<div class="modle_shop_buybtn" :class="v.params.btnStyle"></div>
						</div>
					</div>

				</div>
			</div>

			<!--公告模板 box-->
			<div class="modle_box" v-if="v.id == 'noticeId'? true:''" :key="v.id">
				<div class="notice_move"></div>
				<div class="notice" :style="{backgroundColor:v.params.bgColor}">
					<div class="notice_icon">
						<!-- <img class="vertical_centering" src="v['data']['icon']" /> -->
						<img class="vertical_centering" src="/static/img/home/notice-icon.png" />
					</div>

					<div class="scroll_notice">
						<a href="#" v-bind:href="v.data.noticeUrl" :style="{color:v.params.textColor}">
							<div class="notice_content" :class="{hide_box:v.params.rollState == 0}">
								<marquee scrollamount="3">{{v.data.content}}</marquee>
							</div>
							<div class="notice_content" :class="{hide_box:v.params.rollState == 1}">{{v.data.content}}</div>
						</a>
					</div>

					<div class="more" :class="{hide_box:v.params.moreState == 0}">
						<a v-bind:href="v.data.moreUrl">更多</a>
					</div>
				</div>

			</div>

			<!--辅助空白模块 box，拖拽的div-->
			<div class="modle_box" v-if="v.id == 'blankId'? true:''" :key="v.id">
				<p class="blank" :style="{height:v.params.height,background:v.params.background}"></p>
			</div>

			<!--辅助线模块 box，拖拽的div-->
			<div class="modle_box" v-if="v.id == 'sublineId'? true:''" :key="v.id">
				<div class="subline">
					<p :style="{'border-bottom-width':v.params.boderHeight,'border-bottom-style':v.params.borderStyle,'border-bottom-color':v.params.borderBackground,}"></p>
				</div>

			</div>

			<!--标题模块 box，拖拽的div-->
			<div class="modle_box" v-if="v.id == 'titleId'? true:''" :key="v.id">
				<div class="title" :style="{textAlign:v.params.alignPosition,color:v.params.textColor,backgroundColor:v.params.bgColor}">
					<h2 :style="{fontSize:v.params.fontSize}">{{v.data.title}}</h2>
					<h4 :class="{hide_box:v.data.subTitleState == 0}" :style="{fontSize:v.params.subfontSize}">{{v.data.subTitle}}</h4>
				</div>
			</div>

		</div>
	<menuBar></menuBar>
	</div>
</template>

<script>
	import menuBar from "@/components/common/menuBar.vue";
	import Swiper from "swiper";
	import "swiper/dist/css/swiper.css";
	export default {
		name: "home",
		components: {
			menuBar,
		},
		data() {
			return {
				//图片路径
				/*baseUrl: '',*/
				/*页面渲染data 对象形式*/
				backData: {
					/*页面名字*/
					page_name: "",
					data: [
						/**axios=>页面渲染数据（请求成功-清除第一条数据(初始数据-双向绑定)）**/
						// {
						//   params: {},
						//   data: {}
						// },
					]
				},
				/*加载页面=>隐藏变量{{变量}}*/
				hide_var: false
			};
		},
		/*组件实例创建完成，属性已绑定，但DOM还未生成*/
		created: function() {
			//图片路径
			/*this.baseUrl = this.url*/
			/*swiper分页*/
			let res = [];
			var that = this;
			console.log('token: '+localStorage.getItem('Authorization'));
			/*axios=>请求-页面数据 -s*/
			that.$axios.post("/shop/getShopData")
				.then(function(response) {
					if(response["data"]["code"] == 1) {
						/*alert(response['data']['msg']);*/
						console.log('页面数据:',response["data"]["data"]["data"]);
						/*页面名字*/
						that.backData["page_name"] = response["data"]["data"]["page_name"];
						/*页面渲染数据*/
						that.backData["data"] = response["data"]["data"]["data"];
						/*获取轮播图数据*/
						for(let i = 0; i < response.data.data.data.length; i++) {
							if(response.data.data.data[i].id == "rotationId") {
								/*轮播图设置*/
								res.push({
									'data': response.data.data.data[i],
									'key': response.data.data.data[i].key_num
								});
								that.$nextTick(function() {
									that.carousel(res);
								});
							}
						}
					} else {
						/*保存失败*/
						alert(response["data"]["msg"]);
					}
				})
				.catch(function(error) {
					alert(error);
					console.log(error);
				});
			/*axios=>请求-页面数据 -e*/
		},
		methods: {
			/*（轮播图）根据传过来的data=>创建 swiper 的分页器*/
			carousel(res) {
				for(let l = 0; l < res.length; l++) {
					var swiper = new Swiper('.' + res[l].data.id + res[l].key, {
						autoplay: { //自动播放
							delay: 3000,
							disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
						},
						loop: true, // 循环模式选项
						pagination: {
							el: '.swiper-pagination',
							// 自定义分页器，必须的type类型
							type: 'custom',
							renderCustom: function(swiper, current, total) {
								var paginationHtml = "";
								for(var i = 0; i < total; i++) {
									// 判断是不是激活焦点
									if(i === (current - 1)) {
										paginationHtml += '<span class="' + res[l].data.params.butStyle + '" style="background:' + res[l].data.params.clickColor + '"></span>';
									} else {
										paginationHtml += '<span class="' + res[l].data.params.butStyle + '" style="background:' + res[l].data.params.butColor + '"></span>';
									}
								}
								return paginationHtml;
							}
						}
					});
				}
			},
			/*路由-跳转*/
			routing_jump(_router,_id){
				console.log(_router,_id);
				/*商品-路由跳转*/
				if(_router && _id){
					console.log('商品-路由:',_router,'传的id:',_id);
					this.$router.push('/details?goods_id=' +_id);
					return false;
				}
				/*搜索-路由跳转*/
				if(_router && !_id){
					console.log('搜索-路由:',_router);
					this.$router.push(_router);
					return false;
				}
			},
			
		},
	};
</script>

<style lang="stylus" scoped>
	.home {
		width: 100%;
		overflow: hidden;
		margin-bottom: 100px;
		font-size: 34px;
		text-align: center;
	}
	/*public=>包着组件div*/
	
	.modle_box {
		position: relative;
	}
	/*inout的提示文字 样式修改*/
	
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #c6c6c6;
		font-size: 24px;
		letter-spacing: 1px;
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #c6c6c6;
		font-size: 24px;
		letter-spacing: 1px;
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #c6c6c6;
		font-size: 24px;
		letter-spacing: 1px;
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #c6c6c6;
		font-size: 24px;
		letter-spacing: 1px;
	}
	/* 轮播图 -s */
	
	.slide {
		position: relative;
		width: 100%;
		height: 500px;
	}
	
	.slide_item,
	.slide_item>img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.slide_but {
		position: absolute;
		left: 0;
		bottom: 20px;
		z-index: 100;
		width: 100%;
		height: 20px;
		line-height: 20px;
	}
	
	.slide_but>span {
		display: inline-block;
		background: black;
		margin-right: 15px;
		-moz-opacity: .5;
		-khtml-opacity: .5;
		opacity: .5;
	}
	/* 长方形按钮 */
	
	.slide_but .rectangle {
		width: 20px;
		height: 4px;
	}
	/* 正方形按钮 */
	
	.slide_but .square {
		width: 10px;
		height: 10px;
	}
	/* 线形按钮 */
	
	.slide_but .linetype {
		width: 24px;
		height: 2px;
	}
	/* 圆形按钮 */
	
	.slide_but .roundness {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	/* 按钮位置 靠左 */
	
	.slide .left {
		text-align: left;
	}
	/* 按钮位置 居中 */
	
	.slide .center {
		text-align: center;
	}
	/* 按钮位置 靠右 */
	
	.slide .right {
		text-align: right;
	}
	/* 轮播图 -e */
	/* 搜索 -s */
	
	.search {
		position: relative;
		height: 80px;
		padding: 10px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.search form {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		align-items: center;
		background: #fff;
		border: 1px solid #c0c0c0;
		border-radius: 3px;
	}
	
	.search .searchBtn {
		position: absolute;
		margin: auto;
		padding: 0;
		width: 40px;
		height: 40px;
		background: url(/static/img/home/searchObj/search_ico.png) no-repeat center;
		background-size: 80%;
		border: 0;
	}
	
	.search .searchText {
		width: 85%;
		height: 100%;
		font-size: 30px;
		border: 0px;
		padding: 0px 8px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		margin-left: 40px;
		outline: none;
		color: #999;
		float: left;
	}
	/*inout的提示文字 样式修改*/
	.searchText::-webkit-input-placeholder { /* WebKit browsers */ 
		line-height: 44px;		
		letter-spacing: 1px;
	} 
	.searchText:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		line-height: 44px;	
		letter-spacing: 1px;
	} 
	.searchText:-moz::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		line-height: 44px;	
		letter-spacing: 1px;
	} 
	.searchText:-moz:-ms-input-placeholder { /* Internet Explorer 10+ */ 
		letter-spacing: 1px;
	}
	.style2, .style1 {
		height: 100%;
	}
	/* 搜索样式一 */
	.search .style1 .searchBtn {
		top: 0;
		left: 5px;
		bottom: 0;
	}
	/* 搜索样式二 */
	.search .style2 .searchBtn {
		top: 0;
		right: 5px;
		bottom: 0;
	}
	/*搜索-遮罩层*/
	.mask_input {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0);
	}
	/* 搜索 -e */
	/* 按钮组 -s*/
	.modle_bottons {
		padding-top: 10px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		width: 100%;
		height: auto;
	}
	/*四个按钮=>20%，五个按钮=>25%*/
	.modle_mod_nav {
		display: inline-block;
		/*width: 25%;*/
		height: 100%;
	}
	.modle_mod_img img {
		width: 100%;
		height: 100%;
	}
	.modle_mod_text {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #999999;
		font-size: 24px;
		overflow: hidden;
	}
	/* 按钮图片 圆形样式 */
	
	.modle_mod_garden {
		border-radius: 100%;
	}
	/* 按钮组 -e*/
	/* 单图-s */
	
	.signage {
		width: 100%;
		height: auto;
	}
	
	.signage_img {
		width: 100%;
		height: auto;
	}
	
	.signage_img img {
		display: block;
		width: 100%;
		height: 100%;
	}
	/* 单图-e */
	/* 商品组-s */
	
	.modle_shop {}
	
	.modle_shop_title {
		line-height: 30px;
		font-size: 28px;
	}
	/* 显示一个 */
	
	.modle_shop_item {
		background: #fff;
		padding: 5px;
		height: 150px;
		margin: 2px 0;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	
	.modle_shop_item .modle_shop_img {
		float: left;
		width: 25%;
		height: 100%;
	}
	
	.modle_shop_item .modle_shop_img img {
		width: 100%;
	}
	
	.modle_shop_item .modle_shop_info {
		text-align: left;
		position: relative;
		float: left;
		width: 73.6%;
		height: 100%;
		margin-left: 10px;
	}
	
	.modle_shop_item .modle_shop_info .modle_shop_name {
		font-size: 28px;
		height: 90px;
		margin-top: 5px;
		margin-bottom: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.modle_shop_item .modle_shop_info .modle_shop_price {
		position: relative;
		width: 100%;
		font-size: 24px;
	}
	
	.modle_shop_item .modle_shop_info .modle_shop_price s {
		font-size: 22px;
	}
	
	.modle_shop_item .modle_shop_info .modle_shop_buybtn {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 50px;
		height: 30px;
	}
	/* 显示俩个 */
	
	.modle_shop_item2 {
		background: #fff;
		text-align: left;
		float: left;
		margin: 0 5px 5px;
		width: 48.6%;
	}
	
	.modle_shop_item2 .modle_shop_img {
		height: 300px;
	}
	/* 显示三个 */
	
	.modle_shop_item3 {
		background: #fff;
		text-align: left;
		float: left;
		margin: 0 5px 5px;
		width: 31.9%;
	}
	
	.modle_shop_img {
		position: relative;
		width: 100%;
	}
	
	.modle_shop_item3 .modle_shop_img {
		height: 200px;
	}
	
	.modle_shop_item2 .modle_shop_img img,
	.modle_shop_item3 .modle_shop_img img {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.modle_shop_attr {
		position: absolute;
		left: 0;
		top: 0;
		width: 100px;
		height: 100px;
	}
	
	.modle_shop_item2 .modle_shop_price,
	.modle_shop_item3 .modle_shop_price {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		font-size: 24px;
		color: #f3f3f3;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		background: rgba(0, 0, 0, .3);
	}
	
	.modle_shop_item2 .modle_shop_price s,
	.modle_shop_item3 .modle_shop_price s {
		font-size: 22px;
	}
	
	.modle_shop_item2 .modle_shop_info,
	.modle_shop_item3 .modle_shop_info {
		position: relative;
		height: 40px;
	}
	
	.modle_shop_item2 .modle_shop_name,
	.modle_shop_item3 .modle_shop_name {
		float: left;
		font-size: 28px;
		line-height: 40px;
		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.modle_shop_item2 .modle_shop_name {
		width: 84%;
	}
	
	.modle_shop_item3 .modle_shop_name {
		width: 75%;
	}
	
	.modle_shop_item2 .modle_shop_buybtn,
	.modle_shop_item3 .modle_shop_buybtn {
		display: none;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 50px;
		height: 30px;
	}
	/* 商品价格显示 */
	
	.modle_shop_item .show,
	.modle_shop_item2 .show,
	.modle_shop_item3 .show {
		display: block;
	}
	/* 商品价格隐藏 */
	
	.modle_shop_item .none,
	.modle_shop_item2 .none,
	.modle_shop_item3 .none {
		display: none;
	}
	/* 只显示原价 */
	
	.modle_shop_item .price s,
	.modle_shop_item2 .price s,
	.modle_shop_item3 .price s {
		display: none;
	}
	/* 显示名字 */
	
	.modle_shop_item2 .no,
	.modle_shop_item3 .no {
		display: none;
	}
	/* 隐藏名字 */
	
	.modle_shop_item2 .sw,
	.modle_shop_item3 .sw {
		display: block;
	}
	/* 商品属性-s */
	/* 热销 */
	
	.sale_rx {
		background: url(/static/img/home/sale-rx.png) no-repeat;
		background-size: contain;
	}
	/* 推荐 */
	
	.sale_tj {
		background: url(/static/img/home/sale-tj.png) no-repeat;
		background-size: contain;
	}
	/* 新上 */
	
	.sale_xp {
		background: url(/static/img/home/sale-xp.png) no-repeat;
		background-size: contain;
	}
	/* 包邮 */
	
	.sale_by {
		background: url(/static/img/home/sale-by.png) no-repeat;
		background-size: contain;
	}
	/* 限时 */
	
	.sale_xs {
		background: url(/static/img/home/sale-xs.png) no-repeat;
		background-size: contain;
	}
	/* 促销 */
	
	.sale_cx {
		background: url(/static/img/home/sale-cx.png) no-repeat;
		background-size: contain;
	}
	/* 商品属性-e */
	/* 商品组-按钮样式-s */
	
	.buy_1 {
		display: block !important;
		background: url(/static/img/home/ico_buy_1.png) no-repeat;
		background-size: contain;
	}
	
	.buy_2 {
		display: block !important;
		background: url(/static/img/home/ico_buy_2.png) no-repeat;
		background-size: contain;
	}
	
	.buy_3 {
		display: block !important;
		background: url(/static/img/home/ico_buy_3.png) no-repeat;
		background-size: contain;
	}
	
	.buy_4 {
		display: block !important;
		background: url(/static/img/home/ico_buy_4.png) no-repeat;
		background-size: contain;
	}
	/* 商品组-按钮样式-e */
	/* 商品组-e */
	/* 公告 -s */
	
	.edit_modle .tips {
		font-size: 12px;
		margin-left: 10px;
		letter-spacing: 1px;
	}
	/* (公告)移动层 */
	
	.notice_move {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1;
		background: rgba(0, 0, 0, 0);
		z-index: 99;
	}
	
	.notice {
		position: relative;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		-webkit-align-items: center;
		box-align: center;
		-moz-box-align: center;
		-webkit-box-align: center;
		height: 80px;
		background: #fff;
		color: #525252;
		padding: 10px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		overflow: hidden;
		white-space: nowrap;
		background: red;
		/**/
	}
	
	.notice .notice_icon {
		margin-right: 4px;
		position: relative;
		width: 60px;
		height: 100%;
	}
	
	.notice .notice_icon img {
		width: 90%;
	}
	
	.notice .scroll_notice {
		flex: 1;
		box-flex: 1;
		-webkit-box-flex: 1;
		-moz-box-flex: 1;
		flex: 1;
		-webkit-flex: 1;
		font-size: 30px;
		height: 100%;
		line-height: 60px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.notice a {
		color: #666;
	}
	
	.notice .scroll_notice .notice_content {
		width: 100%;
	}
	
	.notice .scroll_notice marquee {
		height: 100%;
		line-height: 60px;
	}
	
	.notice .more {
		position: relative;
		width: 100px;
		height: 100%;
		margin-top: -5px;
		padding: 0 10px 0 30px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		font-size: 28px;
		line-height: 66px;
		text-align: right;
	}
	
	.notice .more::after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 2px;
		height: 60%;
		background #ddd;
	}
	/* 公告 -e */
	/* 辅助空白label 辅助线label -s*/
	
	.edit_blank .edit_content_label,
	.edit_subline .edit_content_label {
		margin-right: 5px;
		font-size: 12px;
	}
	
	.edit_blank .edit_content_label .text,
	.edit_subline .edit_content_label .text {
		margin-left: 4px;
		padding-left: 8px;
		width: 50px;
		height: 22px;
		line-height: 20px;
		color: #aaa;
		border-radius: 3px;
		border: 1px solid #ddd;
		outline: none;
	}
	/* 辅助空白label 辅助线label -e*/
	/* 辅助线 -s */
	
	.subline {
		padding: 10px 0;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	/* 辅助线 -e */
	/* 标题 -s */
	
	.title {
		height: auto;
		text-align: left;
		padding: 10px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		overflow: hidden;
	}
	
	.title h2 {
		font-size: 18px;
		padding: 0;
		margin: 0;
		font-weight: 100;
	}
	
	.title h4 {
		margin: 0;
		padding: 0;
		padding-top: 3px;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		font-size: 14px;
		font-weight: 100;
	}
	/* 标题 -e */
	/*publi -s*/
	/* 隐藏 */
	
	.hide_box {
		display: none;
	}
	/* 隐藏 */
	
	.show_box {
		display: block;
	}
	/*public -e*/
</style>
<style>
	/* 轮播图样式 */
	
	.slide_but>span {
		display: inline-block;
		background: black;
		margin-right: 15px;
		-moz-opacity: .5;
		-khtml-opacity: .5;
		opacity: .5;
	}
	/* 长方形按钮 */
	
	.slide_but .rectangle {
		width: 20px;
		height: 4px;
	}
	/* 正方形按钮 */
	
	.slide_but .square {
		width: 10px;
		height: 10px;
	}
	/* 线形按钮 */
	
	.slide_but .linetype {
		width: 24px;
		height: 2px;
	}
	/* 圆形按钮 */
	
	.slide_but .roundness {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	/* 按钮位置 靠左 */
	
	.slide .left {
		text-align: left;
	}
	/* 按钮位置 居中 */
	
	.slide .center {
		text-align: center;
	}
	/* 按钮位置 靠右 */
	
	.slide .right {
		text-align: right;
	}
</style>