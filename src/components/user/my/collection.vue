<template>
	<div class="container">
		<!--头部-->
		<HeaderView custom-title="我的收藏" custom-fixed rightNone>
			<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
				<img src="../../../../static/img/public/backBtn.png" />
			</div>
		</HeaderView>
		<!--内容-->
		<div class="yoho-page">
			<ul class="fav-tab">
				<!--<li class="active">收藏的商品</li>
				<li>收藏的品牌</li>-->
				<li class="item-tabr" v-for="(item,index) in tabr" @click="tabrs(index)" :class="{active:index==indexx}">{{item.name}}</li>
			</ul>
			<div class="fav-content">
				<div class="fav-type fav-product-list" v-if="indexx==0">
					<div class="fav-box" v-for="(item,index) in list" :key="index" v-show="list!=''">
						<div class="fav-img-box">
							<img :src="baseUrl+item.img" />
						</div>
						
						<div class="fav-info-list">
							<p class="fav-pr">{{item.goods_name}}</p>
							<p class="fav-ice">¥{{item.price}}</p>
							<p class="remove" @click="tellUs(item.goods_id,index)"></p>
						</div>
						
					</div>	
					<!--商品为空时显示-->
					<div class="null-box" style="width: 100%;" v-show="list.length===0">
						<div class="fav-null-box">
							<div class="fav-null" style="margin: 5px 0 15px 135px;"></div>
							<p class="p-tit">您暂无收藏任何品牌</p>
						</div>
						<router-link to="/classify" class="go-shopping">随便逛逛</router-link>
					</div>
				</div>
				    <div class="fav-type" v-if="indexx==1">
					<!--商品为空时显示-->
					<div class="fav-null-box">
						<div class="fav-null"></div>
						<p class="p-tit ">您暂无收藏任何品牌</p>
					</div>
					
					<router-link to="/classify" class="go-shopping">随便逛逛</router-link>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderView from '../../common/headerView.vue'
	import { Dialog,Toast } from 'vant'
	export default {
		data(){
	        return{
				//商品图片路径
           		 baseUrl:'',
				// 使用说明
				arrows:false,
				show: false,
				tabr:[
					{name:'收藏的商品'},{name:'收藏的品牌'}
				],
				 //默认为零 默认显示第一个未使用
				indexx:0,
				list:[],
	        }
	   	},
		components:{
			HeaderView
	  	},
	  	methods: {
		    // 使用说明
			frost(){
				this.arrows=!this.arrows
			},  
				//tabr
			tabrs(index){
				this.indexx=index
				this.arrows=false
			},
			tellUs(id,index) {
                Dialog.confirm({
                    message: '您确定要取消收藏吗？'
                }).then(() => {
	                var url = 'Collection/collection'
					var params = new URLSearchParams();
						params.append('token', this.$store.getters.optuser.Authorization);           //token
						params.append('goods_id',id);                                   //商品ID
					this.$axios({
							method:"post",
							url:url,
							data: params
					}).then((res)=>{
						if(res.data.status === 1){
						this.list.splice(index,1)
						Toast.success({
						message:res.data.msg,
						mask:true,
						loadingType:'spinner',
						forbidClick:true
						});
						}
					})
                }).catch(() => {
                    // on cancel
                });
            },
		},
		created(){
			//图片路径
           this.baseUrl=this.url
			   //请求收藏列表
			    // 收藏列表 Collection/collection_list
				// 参数：
				// token
			   var url = 'Collection/collection_list';
               var params = new URLSearchParams();
				   params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value
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
	}
</script>

<style lang="stylus" scoped>
	.yoho-page {
		position: relative;
		padding-top 88px 		
		background:#ffffff
		height 100%
	}
	.fav-tab {
		padding: 25px 0;
		border-bottom: 1px solid #e0e0e0;
		font-size:0;
		color:#b0b0b0;
	}
	.fav-tab li:nth-child(1) {
		border-right:1px solid #b0b0b0;
	}
	.fav-tab li {
		display: inline-block;
		width: 49.9%;
		text-align: center;
		line-height: 65px;
		font-size: 25px;
	}
	.active {
		color: #444;
	}
	.fav-box {
		width: 100%;
	}
	.fav-product-list {
		padding: 25px 0 25px 25px;
	}
	.fav-product-list div {
		display: inline-block;
		vertical-align: top;
		color: #444;
	}
	.fav-product-list div img {
		display: block;
		margin: 0 auto;
		height 100%;
		max-width: 100%;
	}
	.fav-img-box {
		width: 150px;
		height: 150px;
	}
	.fav-info-list {
		margin-left: 20px;
		width: 75%;
		height: 175px;
		border-bottom: 1px solid #e0e0e0;
	}
	.fav-pr {
		width: 75%;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    line-height: 45px;
	}
	.fav-ice {
		line-height: 65px;
	}
	.remove {
		margin: 0 0 0 445px;
		width: 50px;
		height: 55px;
		background: url(../../../../static/img/my/remove.png) no-repeat;
		background-size: 100% 100%;
	}
	.fav-null {
		margin: 55px auto 35px;
		width: 200px;
		height: 200px;
		background: url(../../../../static/img/my/fav-null.png);
		background-size: 100% 100%;
	}
	.fav-null-box {
		width: 100%;
	}
	.p-tit {
		text-align: center;
		line-height: 45px;
	}
	.go-shopping {
		margin: 55px auto;
		display: block;
		width: 475px;
		height: 100px;
		background: #444;
		color: #fff;
		font-size: 20px;
		text-align: center;
		line-height: 100px;
		border-radius: 15px;
		letter-spacing: 3px;
	}			
			    			
</style>