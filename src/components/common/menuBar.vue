<template>
 	<div class="menuBar">
 		<ul>
 			<li>
 				<router-link to="/home">
 					<i class="iconfont">&#xe64e;</i>
 					<span>首页</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/classify">
 					<i class="iconfont">&#xe615;</i>
 					<span>分类</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/cart">
 					<i class="iconfont">&#xe600;</i>
 					<span>购物车</span>
 				</router-link>
 			</li>
 			<li>
 				<router-link to="/user">
 					<i class="iconfont">&#xe670;</i>
 					<span>我的</span>	
 				</router-link>
 			</li>
 		</ul>
 	</div>
</template>

<script>
export default {
  name: 'menuBar',
 
}
</script>


<style lang="stylus" scoped>
.menuBar
	width 100%
	height 100px
	border-top 2px solid #eee
	background #fff
	z-index 999
	position fixed
	bottom 0
	ul
		display flex
		height inherit
		li
			width 25%
			a
				width 100%
				height 100%
				display flex
				flex-direction column
				align-items center 
				justify-content center
				i
					display block
					margin 7px 0 
				.iconfont
					font-size 38px
					color #666
				span{
					margin-top: 7px
					font-size 24px;
					color #666
				}
			.router-link-exact-active
				.iconfont
					color #ff9900
				span
					color #ff9900	
</style>
