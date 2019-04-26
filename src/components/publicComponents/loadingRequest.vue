<template>
	<div>
		<!--请求'loading'-->
		<div class="loadingSWrap" v-show="$store.state.loadingState">
			<!--加载中-->
			<div class="loadingWrapRq">
				<img class="loadingWrapGif" src="/static/img/loadIcon.gif" />
				<span>正在保存数据</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'loadingRequest',
		data(){
			return {
				
			}
		},
	}
</script>

<style scoped>
	/*蒙版,loading弹框*/
	.loadingSWrap {
		/*display: none;*/
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100vh;
		background-color: rgba(255, 255, 255, .7);
	}
	/*发送请求 wrap*/
	.loadingWrapRq {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		padding: .25rem 0 0 2.8rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		width: 100%;
		height: .8rem;
		font-size: .24rem;
		line-height: .3rem;
		color: #000;
		letter-spacing: .02rem;
	}
	/*gif图*/
	.loadingWrapGif {
		float: left;
		display: block;
		margin-right: .1rem;
		width: .3rem;
		height: .3rem;
	}
</style>