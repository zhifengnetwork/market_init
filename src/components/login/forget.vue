<template>
	<div>
		<!--最大边框P-->
		<div class="warpperP">
			<!--头部Title,背景颜色class="headWrapColor"-->
			<div class="headWrap headWrapColor">
				<span class="returnImg" @click="$router.back(-1)"><img src="/static/img/headWrap/topReturnKey.png"/></span>
				<span>找回密码</span>
			</div>
			<!--内容 wrpa P-->
			<div class="contentWrapP">
				<!--public 隔开上线 box-->
				<p class="publicSeptum"></p>
				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapP publicButtomLIne">
					<!--公共的class=>项box-->
					<div class="publicTermBoxP">
						<!--左-->
						<p class="publicTermLeftP">账号<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightP">
							<!--input-->
							<input type="text" v-model="userData.userName" class="publicTRPInput" placeholder="请输入账号">
						</div>
					</div>
				</div>
				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapP">
					<!--公共的class=>项box-->
					<div class="publicTermBoxP">
						<!--左-->
						<p class="publicTermLeftP">邮箱验证码<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightP shortWidthBox">
							<!--input-->
							<input type="text" class="publicTRPInput shortInputWidth" v-model="userData.mailboxCode" placeholder="请输入验证码">
						</div>																		
						<!--'获取验证码'按钮-->
						<div v-bind:class="{obtainCodeBut:clickState, obtainCodeNoBut:!clickState}" @click="obtainCode">{{codeText}}</div>

					</div>
				</div>
				<!--public 隔开上线 box-->
				<p class="publicSeptum"></p>
				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapP publicButtomLIne">
					<!--公共的class=>项box-->
					<div class="publicTermBoxP">
						<!--左-->
						<p class="publicTermLeftP">登录密码<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightP">
							<!--input-->
							<input type="text" class="publicTRPInput" v-model="userData.passOne" placeholder="请输入新密码">
						</div>
					</div>
				</div>
				<!--公共的class=>项Wrap，class="publicButtomLIne"=>(伪类)'底边框线'-->
				<div class="pblicTermWrapP">
					<!--公共的class=>项box-->
					<div class="publicTermBoxP">
						<!--左-->
						<p class="publicTermLeftP">确认密码<span class="importantColor">*</span></p>
						<!--右-->
						<div class="publicTermRightP">
							<!--input-->
							<input type="text" class="publicTRPInput" v-model="userData.passTwo" placeholder="重复输入新密码">
						</div>
					</div>
				</div>

			</div>

			<!--修改 按钮 box，样式-->
			<div class="modifyButBox">
				<p class="modifyButton" @click="modifyBut">确认修改</p>
			</div>
			<!--请求'loading'-->
			<loading-request></loading-request>
			<!--提示对话框-->
			<tips-alert></tips-alert>
		</div>	
		
	</div>
</template>

<script>
	/*引入vuex商店*/
	import store from '../../vuex/vueShop.js'
	/*引用loading蒙版*/
	import loadingRequest from '../publicComponents/loadingRequest.vue'
	/*引用提示对话框*/
	import tipsAlert from '../publicComponents/tipsAlert.vue'
	export default {
		name: 'forget',
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
				/*登陆成功跳转*/
				timerUrl: null,
				/*存储(找回密码)，用户信息*/
				userData: {
					/*账号*/
					userName: '',
					/*邮箱验证码=> 创建数据库时，写死了邮箱验证码*/
					mailboxCode: 'hlb999',
					/*新密码*/
					passOne: '',
					/*确认密码*/
					passTwo: '',
					/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
					tipsText: '密码重置成功',
					/*提示弹窗的url*/
					tipsUrl: '/login',
				}
			}
		},
		
		/*模板渲染成html后调用*/
		methods:{
			/*获取验证码=>button*/
			obtainCode(){
				if (this.clickState) {
					this.codeText = '再次获取' + this.timerNum + 's';
					this.timer = setInterval(this.countDown,1000);
					/*不能=>获取验证码,同时=>改变'获取验证码'按钮color颜色*/
					this.clickState = false;
					console.log('获取验证码');
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
					console.log('可以-获取验证。')
					return false;
				}
			},
			/*'确认修改'按钮_(追加标签)*/
			modifyBut(){
				/*保存指向*/
				var that = this;
				/*账号*/
				var uNameF = /^\w{3,10}$/;
				if(that.userData['userName'] == ''){
					alert('账号不能为空！');
					return false;
				}else if(!uNameF.test(that.userData['userName'])){
					alert('账号格式:3-10个字母、数字、下划线！');
					return false;
				}
				/*新密码*/
				var passF = /^[a-zA-Z]\w{5,17}$/;
				if(that.userData['passOne'] == ''){
					alert('登陆密码不能为空！');
					return false;
				}else if(!passF.test(that.userData['passOne'])){
					alert('密码长度要在6~18位之间,且必须以字母开头！');
					return false;
				}
				/*重复密码*/
				if(that.userData['passTwo'] != that.userData['passOne']){
					alert('密码不一致！');
					return false;
				}
				/*loading(vuex) => 出现*/
//				that.$store.state.loadingState = true;
				console.log("获取用户输入信息(当前组件):",that.userData);
//				if (!null) {
//					console.log('找回密码!!!');
//					/*整理数据=>后台*/
//					var uDataObj = {
//						/*账号*/
//						userName: that.userData['userName'],
//						/*邮箱验证码*/
//						mailboxCode: that.userData['mailboxCode'],
//						/*新密码*/																		
//						pass: that.userData['passOne'],
//						/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
//						tipsText: that.userData['tipsText'],
//						/*提示弹窗的url*/
//						tipsUrl: that.userData['tipsUrl'],
//					}
//					that.$store.commit('retrievePass',uDataObj);
//					console.log('定时器');
//					var count = 3;
//					/*定时器*/
////					that.timerUrl = setInterval(function(){
////						count--;
////						console.log(count);
////						if(!count == 0){
////							$('#rAndWBText').html(count+"秒后自动跳转到-登录页面");
////						}else {
////							$('#rAndWBText').html(count+"秒后自动跳转到-登录页面");
////							/*清除定时器*/
////							clearInterval(timerUrl);
////							window.location.href = '登录.html';
////						}
////					},1000);
//					
//					/*存储，用户信息=> 初始化*/
//					that.userData = {
//						/*账号*/
//						userName: '',
//						/*邮箱验证码*/
//						mailboxCode: 'hlb999',
//						/*新密码*/
//						passOne: '',
//						/*确认密码*/
//						passTwo: '',
//						/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
//						tipsText: '密码重置成功',
//						/*提示弹窗的url*/
//						tipsUrl: '/login',
//					}
//					return false;
//					
//				} else{
//					
////					/*判断是否'修改密码'成功*/
////					var failS = sAFail('img/failIcon.png','找回密码失败','请重新提交正确数据');
////					/*loading => 隐藏*/
////					$('.loadingSWrap').hide();
////					/*放在最外边框的第一位*/
////					$('.warpperP').prepend(failS);
////					/*获取遮罩层，屏幕高宽*/
////					console.log('找回密码失败');
////					$('.maskWrap').css({
////						'height': $(window).height(),
////					});
//					
//					return false;
//				}
			},
			
		},
		/*模板渲染成html前调用*/
		created: function() {
			
        },
        /*页面挂载完，执行钩子函数*/
		mounted: function () {
			
		},
        /*销毁监听事件*/
        destroyed: function () {
            // 每次离开当前界面时，清除定时器
            clearInterval(this.timer);
            this.timer = null;
        }
	}
</script>

<style scoped>
	/*最大边框 P*/
	.warpperP {
		padding: 88px 0 98px 0;
		box-sizing: border-box;
		width: 100%;
		height: auto;
	}
	/*public 隔开上线 box*/
	
	.publicSeptum {
		width: 100%;
		height: 20px;
	}
	/*内容*/
	
	.contentWrapP {
		width: 100%;
		height: auto;
	}
	/*公共的class=>项Wrap*/
	
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
	/*确认 box*/
	
	.modifyButBox {
		padding-top: 120px;
		box-sizing: border-box;
		width: 100%;
		height: auto;
	}
	/*确认 按钮*/
	
	.modifyButton {
		margin: 0 auto;
		width: 690px;
		height: 91px;
		font: 30px/91px "微软雅黑";
		color: #fff;
		text-align: center;
		border-radius: 7px;
		background-color: #1e82d2;
	}
</style>