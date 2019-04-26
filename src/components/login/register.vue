<template>
	<div>
		<!--最大边框O-->
		<div class="warpperO">
			<!--头部Title,背景颜色class="headWrapColor"-->
			<div class="headWrap headWrapColor">
				<span class="returnImg" @click="$router.back(-1)"><img src="/static/img/headWrap/topReturnKey.png"/></span>
				<span>注册</span>
			</div>
			<!--内容 wrpa O-->
			<div class="contentWrapO">
				<!--public 隔开上线 box-->
				<p class="publicSeptum"></p>

				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapO">
					<!--公共的class=>项box-->
					<div class="publicTermBoxO">
						<!--左-->
						<p class="publicTermLeftO">账号<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightO">
							<!--input-->
							<input type="text" class="publicTROInput" v-model="userData.userName" placeholder="请输入帐号">
						</div>
					</div>
				</div>

				<!--public 隔开上线 box-->
				<p class="publicSeptum"></p>

				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapO publicButtomLIne">
					<!--公共的class=>项box-->
					<div class="publicTermBoxO">
						<!--左-->
						<p class="publicTermLeftO">绑定邮箱<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightO">
							<!--input-->
							<input type="text" class="publicTROInput" v-model="userData.mailbox" placeholder="请输入邮箱帐号">
						</div>
					</div>
				</div>
				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapO publicButtomLIne">
					<!--公共的class=>项box-->
					<div class="publicTermBoxO">
						<!--左-->
						<p class="publicTermLeftO">登录密码<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightO">
							<!--input-->
							<input type="text" class="publicTROInput" v-model="userData.passOne" placeholder="请输入登录密码">
						</div>
					</div>
				</div>
				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapO">
					<!--公共的class=>项box-->
					<div class="publicTermBoxO">
						<!--左-->
						<p class="publicTermLeftO">重复密码<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightO">
							<!--input-->
							<input type="text" class="publicTROInput" v-model="userData.passTwo" placeholder="请重复输入密码">
						</div>
					</div>
				</div>

				<!--public 隔开上线 box-->
				<p class="publicSeptum"></p>

				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapO">
					<!--公共的class=>项box-->
					<div class="publicTermBoxO">
						<!--左-->
						<p class="publicTermLeftO">邀请码<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightO">
							<!--input-->
							<input type="text" class="publicTROInput" v-model="userData.invitationCode" placeholder="请输入邀请人账号">
						</div>
					</div>
				</div>

			</div>

			<!--注册 按钮 box，样式=>public.css-->
			<div class="registerButBox">
				<p class="registerButton" @click="registerBut">注册</p>
			</div>

			<!--请求'loading'-->
			<loading-request></loading-request>
			<!--提示对话框-->
			<tips-alert></tips-alert>
		</div>
	</div>
</template>

<script>
	// 引入 管理数据商店
	import store from '../../vuex/vueShop.js';
	/*引用loading蒙版*/
	import loadingRequest from '../publicComponents/loadingRequest'
	/*引用提示对话框*/
	import tipsAlert from '../publicComponents/tipsAlert.vue'
	export default {
		name: 'register',
		/*注册*/
		store,
		components: {
			loadingRequest,
			tipsAlert,
		},
		data(){
			return {
				/*收集=>用户输入的数据*/
				userData: {
					/*账号*/
					userName: '',
					/*邮箱*/
					mailbox: '',
					/*新密码*/
					passOne: '',
					/*确认密码*/
					passTwo: '',
					/*邀请码*/
					invitationCode: '',
					/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
					tipsText: '注册成功',
					/*提示弹窗的url*/
					tipsUrl: '/login',
				}
			}
		},
		/*钩子函数=> 方法*/
		methods: {
			/*注册按钮*/
			registerBut(){
				/*保存指向*/
				var that = this;
				console.log('用户数据:',that.userData);
				/*账号*/
				var uName = /^\w{3,10}$/;
				if(that.userData['userName'] == ''){
					alert('账号不能为空！');
					return false;
				}else if(!uName.test(that.userData['userName'])){
					alert('账号格式:3-10个字母、数字、下划线！');
					return false;
				}
				/*邮箱*/
				var mailbox = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
				if(that.userData['mailbox'] == ''){
					alert('邮箱不能为空！');
					return false;
				}else if(!mailbox.test(that.userData['mailbox'])){
					alert('邮箱格式错误，请输入正确邮箱！');
					return false;
				}
				/*新密码*/
				var pass = /^[a-zA-Z]\w{5,17}$/;
				if(that.userData['passOne'] == ''){
					alert('登陆密码不能为空！');
					return false;
				}else if(!pass.test(that.userData['passOne'])){
					alert('密码长度要在6~18位之间,且必须以字母开头！');
					return false;
				}
				/*重复密码*/
				if(that.userData['passTwo'] != that.userData['passOne']){
					alert('密码不一致！');
					return false;
				}
				/*邀请码*/
				if(that.userData['invitationCode'] == ''){
					alert('邀请码不能为空');
					return false;
				}
				/*出现请求loading(更改vuex里的数据)*/
				this.$store.state.loadingState = true;
				/*ajax*/
				if(!null){
					console.log('register',that.userData);
					/*获取数据=> 插入表格*/
					that.$store.commit('insertData',that.userData);
					/*初始化，用户信息*/
					that.userData = {
						/*账号*/
						userName: '',
						/*邮箱*/
						mailbox: '',
						/*新密码*/
						passOne: '',
						/*确认密码*/
						passTwo: '',
						/*邀请码*/
						invitationCode: '',
						/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
						tipsText: '注册成功',
						/*提示弹窗的url*/
						tipsUrl: '/login',
					}
				}
				
			},
			
		},
		/** 钩子函数
		 *  挂载结束状态
		 * **/
		mounted() {
			/*初始化数据库*/
			this.$store.commit('createDb');
		}
	}
</script>

<style scoped>
	/*最大边框*/
	.warpperO {
		padding: 88px 0 98px 0;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		width: 100%;
		height: auto;
	}
	/*public 隔开上线 box*/
	
	.publicSeptum {
		width: 100%;
		height: 20px;
	}
	/*内容*/
	
	.contentWrapO {
		width: 100%;
		height: auto;
	}
	/*公共的class=>项Wrap*/
	
	.pblicTermWrapO {
		position: relative;
		width: 100%;
		height: 110px;
	}
	/*公共的class=>项(伪类)'底边框线'*/
	
	.publicButtomLIne:after {
		content: " ";
		width: 690px;
		height: 2px;
		border-bottom: 2px solid #dcdcdc;
		position: absolute;
		bottom: 0;
		left: 30px;
	}
	/*公共的class=>项box*/
	
	.publicTermBoxO {
		padding: 27px 0 0 30px;
		box-sizing: border-box;
		width: 100%;
		height: 110px;
		font-size: 30px;
		background-color: #fff;
	}
	/*左*/
	
	.publicTermLeftO {
		float: left;
		width: 179px;
		height: 67px;
		color: #666;
		font: 30px/67px "微软雅黑";
		text-indent: 3px;
		letter-spacing: 4px;
	}
	/*右*/
	
	.publicTermRightO {
		float: left;
		width: 511px;
		height: 67px;
	}
	/*input*/
	
	.publicTROInput {
		outline: none;
		border: none;
		width: 500px;
		height: 67px;
		font-size: 30px;
		color: #666;
		letter-spacing: 1px;
		background-color: #fff;
	}
	/*input=>提示文本*/
	
	.publicTROInput::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	
	.publicTROInput:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	
	.publicTROInput::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	
	.publicTROInput:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	/*注册 box*/
	
	.registerButBox {
		padding-top: 112px;
		box-sizing: border-box;
		width: 100%;
		height: auto;
	}
	/*注册 按钮*/
	
	.registerButton {
		margin: 0 auto;
		width: 690px;
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;		
		font: 30px "微软雅黑";
		color: #fff;
		border-radius: 7px;
		background-color: #1e82d2;
	}
</style>