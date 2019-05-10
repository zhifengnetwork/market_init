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
                 <div class="pblicTermWrapP publicButtomLIne">
					<!--公共的class=>项box-->
					<div class="publicTermBoxP">
						<!--左-->	
						<p class="publicTermLeftP">手机验证码<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightP shortWidthBox">
							<!--input-->
							<input type="text" class="publicTRPInput shortInputWidth" v-model="userData.phone" placeholder="请输入验证码">
						</div>																		
						<!--'获取验证码'按钮-->
						<div v-bind:class="{obtainCodeBut:clickState, obtainCodeNoBut:!clickState}" @click="obtainCode">{{codeText}}</div>

					</div>
				</div>
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
	/* 引入 mint-ui 弹窗组件 */
	import {Toast} from "vant"
	/* md5 */
	import md5 from 'js-md5';
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
				/*定时器Id*/
				timer: null,
				/*获取验证码-倒计时的'时间'*/
				timerNum: 60,
				/*'获取验证码的状态'点击，默认:true,同时=>控制'获取验证码'按钮color颜色*/
				clickState: true,
				/*获取验证码-text*/
				codeText: '获取验证码',
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
					/* 手机号 */
					phone:'',
				}
			}
		},
		/*钩子函数=> 方法*/
		methods: {
			/*获取验证码=>button*/
			obtainCode(){
				var temp='sms_reg';
				var auth = md5( this.userData.phone + md5(temp+'android+app') );
				if (this.clickState) {
					var url = "/api/PhoneAuth/verifycode?mobile="+this.userData.phone+'&temp='+temp+'&auth='+auth;
					this.codeText = '再次获取' + this.timerNum + 's';
					this.timer = setInterval(this.countDown,1000);
					/*不能=>获取验证码,同时=>改变'获取验证码'按钮color颜色*/
					this.clickState = false;
					// console.log('获取验证码');
					return false;
				}
			},
			/*(倒计时)获取验证码期间60S=>执行的函数*/
			countDown(){
				this.timerNum--;
				this.codeText = '再次获取' + this.timerNum + 's';
				console.log('找回密码=>获取验证码=>定时器:',this.timerNum);
				if(this.timerNum == 0){
					/*清除定时器*/
					clearInterval(this.timer); 
					/*可以=>再次获取验证码*/
					this.clickState = true; 
					this.codeText = '获取验证码';
					/*初始化，倒计时'时间'*/
					this.timerNum = 60; 
					// console.log('可以-获取验证。')
					return false;
				}
			},
			/*注册按钮*/
			registerBut(){
				/*保存指向*/
				var that = this;
				console.log('用户数据:',that.userData);
				/*账号*/
				var uName = /^\w{3,10}$/;
				if(that.userData['userName'] == ''){
					Toast('账号不能为空！');
					return false;
				}else if(!uName.test(that.userData['userName'])){
					Toast('账号格式:3-10个字母、数字、下划线！');
					return false;
				}
				/*邮箱*/
				var mailbox = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
				if(that.userData['mailbox'] == ''){
					Toast('邮箱不能为空！');
					return false;
				}else if(!mailbox.test(that.userData['mailbox'])){
					Toast('邮箱格式错误，请输入正确邮箱！');
					return false;
				}
				/*新密码*/
				var pass = /^[a-zA-Z]\w{5,17}$/;
				if(that.userData['passOne'] == ''){
					Toast('登陆密码不能为空！');
					return false;
				}else if(!pass.test(that.userData['passOne'])){
					Toast('密码长度要在6~18位之间,且必须以字母开头！');
					return false;
				}
				/*重复密码*/
				if(that.userData['passTwo'] != that.userData['passOne']){
					Toast('密码不一致！');
					return false;
				}
				/*邀请码*/
				if(that.userData['invitationCode'] == ''){
					Toast('邀请码不能为空');
					return false;
				}

				// userData: {
				// 	/*账号*/
				// 	userName: '',
				// 	/*邮箱*/
				// 	mailbox: '',
				// 	/*新密码*/
				// 	passOne: '',
				// 	/*确认密码*/
				// 	passTwo: '',
				// 	/*邀请码*/
				// 	invitationCode: '',
				// 	/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
				// 	tipsText: '注册成功',
				// 	/*提示弹窗的url*/
				// 	tipsUrl: '/login',
				// }
				//注册接口
				var url =  "/api/User/register?mobile="+that.userData.userName+"&code="+that.userData.invitationCode+"&password"+that.userData.passOne+"&uid="+that.userData.invitationCode;
				/*出现请求loading(更改vuex里的数据)*/
				this.$store.state.loadingState = true;
				/*ajax*/
//				if(!null){
//					console.log('register',that.userData);
//					/*获取数据=> 插入表格*/
//					that.$store.commit('insertData',that.userData);
//					/*初始化，用户信息*/
//					that.userData = {
//						/*账号*/
//						userName: '',
//						/*邮箱*/
//						mailbox: '',
//						/*新密码*/
//						passOne: '',
//						/*确认密码*/
//						passTwo: '',
//						/*邀请码*/
//						invitationCode: '',
//						/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
//						tipsText: '注册成功',
//						/*提示弹窗的url*/
//						tipsUrl: '/login',
//					}
//				}
				
			},
			
		},
		/** 钩子函数
		 *  挂载结束状态
		 * **/
		mounted() {
			
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
		line-height: 67px;
	}
	/*input*/
	
	.publicTROInput {
		outline: none;
		border: none;
		width: 500px;
		/* height: 67px; */
		height: 40px;
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

	.pblicTermWrapP {
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
	
	.publicTermBoxP {
		position: relative;
		padding: 24px 0 0 30px;
		box-sizing: border-box;
		width: 100%;
		height: 110px;
		font-size: 30px;
		background-color: #fff;
	}
	/*左*/
	
	.publicTermLeftP {
		float: left;
		width: 230px;
		height: 67px;
		color: #666;
		font: 30px/67px "微软雅黑";
		text-indent: 3px;
		letter-spacing: 4px;
	}
	/*右*/
	
	.publicTermRightP {
		float: left;
		width: 460px;
		height:67px;
	}
	/*input*/
	
	.publicTRPInput {
		outline: none;
		border: none;
		width: 450px;
		height: 67px;
		font-size: 30px;
		color: #666;
		letter-spacing: 1px;
		background-color: #fff;
	}
	/*input=>提示文本=>.publicTRPInput::-webkit-input-placeholder*/
	
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #bbb;
		font-size: 26px;
		font-family: "微软雅黑";
	}
	/*'输入验证码box'和'input'*/
	
	.shortWidthBox,
	.shortInputWidth {
		width: 230px;
	}
	/* 输入框'|'获取验证码 的竖线=>伪元素 */
	
	.shortWidthBox:after {
		content: " ";
		width: 1px;
		height: 70px;
		border-right: 1px solid #d2d2d2;
		position: absolute;
		top: 20px;
		right: 220px;
	}
	/*'获取验证码'按钮*/
	.obtainCodeBut {
		position: absolute;
		bottom: 11px;
		right: 30px;
		width: 174px;
		height: 87px;
		font: 30px/87px "微软雅黑";
		letter-spacing: 2px;
		color: #1e82d2;
		text-align: center;
	}
	/*'获取验证码'倒计时-按钮*/
	.obtainCodeNoBut {
		position: absolute;
		bottom: 11px;
		right: 30px;
		width: 174px;
		height:87px;
		font: 26px/87px "微软雅黑";
		letter-spacing: 2px;
		color: #bbb;
		text-align: center;
	}
</style>