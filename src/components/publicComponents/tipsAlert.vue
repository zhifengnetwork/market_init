<template>
	<div>
		<div class="maskWrap" v-show="$store.state.showTAlert">
			<div class="signOutBox">
				<div class="signOutBox-text">
					<p class="alertBoxTipsText">{{$store.state.tipsData.tipsText}}</p>
				</div>
				<div class="signOutBox-button">
					<p class="signOut-confirm sure-middle" @click="callTipsAlert($store.state.tipsData.tipsUrl)">确认</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
    /*引入 管理数据商店*/
    import store from '../../vuex/vueShop.js'
	export default {
		name: 'tipsAlert',
		data() {
			return {
				/*渲染文本和需要跳转路径（vuex）=>公共组件，用的时候需要传参:text和url*/
			}
		},
		/*存放-方法*/
		methods:{
			/*提示-弹框(确认按钮)*/
			callTipsAlert(){
				/*调用vuex-mutations的方法*/
				this.$store.commit('tipsAlertFun');
				/*判断是否有路由，切换*/
				if(this.$store.state.tipsData['tipsUrl']){
					//你需要接受路由的参数再跳转
					/*window.location.href = 'http://192.168.3.77:8888/'+ this.$store.state.tipsData['tipsUrl'];*/
					this.$router.push({path:this.$store.state.tipsData['tipsUrl']});
					return;
				}
			},
		}
	}
</script>

<style scoped>
	/*蒙版,弹框*/
	.maskWrap {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, .3);
	}
	/*对话框*/
	.maskWrap .signOutBox {
		display: table;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		width: 5.4rem;
		height: auto;
		/*height: 3.66rem;*/
		border-radius: .25rem;
		text-align: center;
		letter-spacing: .02rem;
		background: #fff;
	}
	
	.signOutBox-text {
		padding-top: .8rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		width: 100%;
		height: 2rem;
		font-size: .28rem;
		color: #666;
	}
	/*提示文本*/
	.alertBoxTipsText {
		width: 100%;
		height: .52rem;
		font-size: .28rem;
		line-height: .52rem;
		color: #666;
		text-align: center;
	}
	.signOutBox-button {
		padding: 0 .4rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		width: 100%;
		height: 1.25rem;
	}
	/*确定对话框=>确定*/
	.sure-middle {
		margin: 0 auto;
		width: 2.55rem;
		height: .82rem;
		border-radius: .15rem;
		font-size: .27rem;
		line-height: .82rem;
		color: #fff;
		background: #3d73f9;
	}
</style>