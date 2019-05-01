<template>
	<div>
		<!--登录=>最大边框 U-->
		<div class="warpperU">
			<!--语言 box，100%-->
			<div class="languageBoxU">
				<!--<p class="languageButtonU">语言</p>-->
			</div>
			<!--头像 wrap-->
			<div class="headPortraitWrap">
				<!--头像 box-->
				<div class="headPortraitBox">
					<!--头像 icon-->
					<img class="headPortraitIcon" src="/static/img/0001.png" />
				</div>
			</div>
			<!--内容 wrpa-->
			<div class="contentWrapU">
				<!--登录public输入框=>项-->
				<div class="loginPublicTermU">
					<!--左-->
					<p class="loginPTLeftU">账号</p>
					<!--右-->
					<div class="loginPTRightU">
						<!--input-->
						<input type="text" v-model="landData.userName" @blur="obtainInp()" @focus="loseInp()" class="loginPTRInput" placeholder="请输入账号" />
					</div>
				</div>
				<!--登录public输入框=>项-->
				<div class="loginPublicTermU">
					<!--左-->
					<p class="loginPTLeftU">密码</p>
					<!--右-->
					<div class="loginPTRightU">
						<!--input-->
						<input type="password" v-model="landData.userPass" @blur="obtainInp()" @focus="loseInp()" class="loginPTRInput" placeholder="请输入密码" />
					</div>
				</div>
				<!--登录public输入框=>项-->
				<div class="loginPublicTermU">
					<!--左-->
					<p class="loginPTLeftU">验证码</p>
					<!--输入框-->
					<div class="loginPTRightU">
						<!--验证码 input-->
						<input type="text" v-model="landData.thisCode" @blur="obtainInp()" @focus="loseInp()" class="loginCode" placeholder="请输入右图验证码" />
						<!--验证码组件，1、接受数据, 2、调用子组件的函数-->
						<verify-code v-on:collectCode="collectCode" ref="mychildFun"></verify-code>
					</div>
				</div>

			</div>
			<!--记住账号 wrap-->
			<div class="rememberAccountWrap">
				<!--记住账号 '按钮'-->
				<div class="rememberAccountBox"  @click="retainBut">
					<p class="rememberAccountBoxL">
						<!--选中=>rememberYes.png;未选择=>rememberNo.png-->
						<img class="rememberAccountBoxLIcon" v-if="passState" src="/static/img/loginIcon/rememberYes.png" />
						<img class="rememberAccountBoxLIcon" v-else src="/static/img/loginIcon/rememberNo.png" />
					</p>
					<p class="rememberAccountBoxR">记住账号</p>
				</div>

			</div>
			<!--'登录' 按钮-->
			<div class="loginButtonBox">
				<p class="loginButton" @click="loginBut">登录</p>
			</div>

			<!--'快捷'登录，功能 wrap-->
			<div class="quickLoginWrap">
				<div class="quickLoginBox">
					<!--刷脸登录-->
					<!--<div class="faceSwipingButton">刷脸登录</div>-->
					<!--指纹登录-->
					<!--<div class="fingerprintButton">指纹登录</div>-->
				</div>
			</div>
			<!--用户:'注册账号、忘记密码'，功能 wrap-->
			<div class="userLoginWrap" v-show="$store.state.inpShowEle">
				<div class="userLoginBox">
					<router-link to="/register">
						<div class="registerButton">注册账号</div>
					</router-link>
					<router-link to="/forget">
						<div class="forgetButton">忘记密码</div>
					</router-link>
				</div>
			</div>

		</div>
		<!--请求'loading'-->
		<!--<div class="loadingSWrap" v-show="$store.state.loadingState" >
			<div class="loadingWrapRq">
				<img class="loadingWrapGif" src="/static/img/loadIcon.gif" />
				<span>正在发送请求</span>
			</div>
		</div>-->
		<!--对话框-->
		<tips-alert></tips-alert>
		<!--请求'loading'-->
		<loading-request></loading-request>
	</div>
</template>

<script>
	// 引入 管理数据商店
    import store from '../../vuex/vueShop.js'
	/**
     * Verify 验证码组件
     * @description 分发验证码使用
     * */
    import VerifyCode from '../Verify/VerifyCode'
  	/*对话框（确认）*/
    import tipsAlert from '../publicComponents/tipsAlert.vue'
    /*引用loading蒙版*/
	import loadingRequest from '../publicComponents/loadingRequest'
	
	export default {
		name: 'login',
		/*注册*/
		store,
		/*引入模块*/
		components: {
            VerifyCode,
            tipsAlert,
            loadingRequest,
        },
		data(){
			return {
				/*当前记住密码状态*/
				passState: false,
				/*验证码（组件=>VerifyCode.vue=>子传父）*/
				numberCode: null,
				/*收集，登陆data*/
				landData: {
					/*账号*/
					userName: '',
					/*密码*/
					userPass: '',
					/*当前输入=>验证码*/
					thisCode: '',
					/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
					tipsText: '登陆成功',
					/*提示弹窗的url*/
					tipsUrl: '/home',
				}
				
			}
		},
		methods:{
			/*点击记住密码*/
			retainBut(){
				/*改变状态*/
				this.passState = !this.passState;
				if(this.passState){
					console.log('yse-记住密码！');
				}else {
					console.log('no-记住密码！');
				}
			},
			/*接受子组件传过来=>验证码*/
			collectCode(collectCode) {
		       // codeValue => 子组件传过来的值
		       this.numberCode = collectCode;
		    },
			/*登陆-按钮*/
			loginBut(){
				/*保存指向*/
				var that = this;
				/*账号*/
				var uNameL = /^\w{3,10}$/;
				if(that.landData['userName'] == ''){
					alert('账号不能为空！');
					return false;
				}else if(!uNameL.test(that.landData['userName'])){
					alert('账号格式:3-10个字母、数字、下划线！');
					return false;
				}
//				/*邮箱*/
//				var mailbox = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
//				if(that.landData['mailbox'] == ''){
//					alert('邮箱不能为空！');
//					return false;
//				}else if(!mailbox.test(that.userData['mailbox'])){
//					alert('邮箱格式错误，请输入正确邮箱！');
//					return false;
//				}
				/*密码*/
				var passL = /^[a-zA-Z]\w{5,17}$/;
				if(that.landData['pass'] == ''){
					alert('登陆密码不能为空！');
					return false;
				}else if(!passL.test(that.landData['pass'])){
					alert('密码长度要在6~18位之间,且必须以字母开头！');
					return false;
				}
				/*大写转小写*/
				console.log('验证码组件=>验证码:',that.numberCode.toLowerCase());
				console.log('当前组件=>验证码:',that.landData['thisCode'].toLowerCase());
				/*验证码*/
				if(that.landData['thisCode'] == ''){
					alert('验证码不能为空！');
					return false;
				}else if(that.landData['thisCode'].toLowerCase() != that.numberCode.toLowerCase()){
					alert('验证码不正确！');
					/*调用组件的函数=> 更新-验证码*/
					that.$refs.mychildFun.setCode();
					/*清掉当前input，验证码*/
					that.landData['thisCode'] = '';
					return false;
				}
				
				/*出现请求loading(更改vuex里的数据)*/
				that.$store.state.loadingState = true;
				/*ajax*/
				if(!null){
					console.log(that.landData);
					/**获取数据=> 校验数据
					 * 参数1:校验的数据。
					 * 参数2:（数组形式）['提示文字','跳转的路径（路由跳转）']
					 * **/
					that.$store.commit('checkUserData',that.landData);
					/*初始化，用户信息*/
					that.landData = {
						/*账号*/
						userName: '',
						/*密码*/
						userPass: '',
						/*当前输入=>验证码*/
						thisCode: '',
						/*提示弹窗的text(vuex里面的方法只能接受一个参数，所以传个'对象'过去)*/
						tipsText: '登陆成功',
						/*提示弹窗的url*/
						tipsUrl: '/home',
					}
					/*调用组件的函数=> 更新-验证码*/
					that.$refs.mychildFun.setCode();
				}
				console.log("初始化数据:",that.landData)
			},
			/*监听input => 获取焦点(防止键盘把底部（注册密码|忘记密码顶上去
			 * 	
			 * 
			 * ）)*/
			obtainInp(){
				/*改变vuex里的状态=>true*/
				this.$store.commit('obtainInputX');
				console.log('获取焦点！');
			},
			/*监听input => 失去焦点*/
			loseInp(){
				/*改变vuex里的状态=>false*/
				this.$store.commit('loseInputX');
				console.log('失去焦点！');
				
			},
		},
		/*钩子函数*/
		mounted(){
			/*初始化数据库*/
			this.$store.commit('createDb');
		}
		
	}
</script>

<style>

body {
	background-color: #edf1f7;
}

/*登录=>最大边框*/
.warpperU {
	/*position: absolute;
	top: 0;
	left: 0;*/
	padding-bottom: .98rem;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 100%;
	height: auto;
}

/*语言 box，100%;*/
.languageBoxU {
	width: 100%;
	height: .77rem;
	background-color: #fff;
}
/*语言=>button*/
.languageButtonU {
	float: right;
	width: 1.3rem;
	height: .77rem;
	font: .25rem/.77rem "微软雅黑";
	color: #1e82d2;
	text-align: center;
	letter-spacing: .04rem;
}
/*头像 wrap*/
.headPortraitWrap {
	padding-top: .29rem;
	box-sizing: border-box;
	width: 100%;
	height: 2.17rem;
	font-size: .2rem;
	background-color: #fff;
}
/*头像 box*/
.headPortraitBox {
	position: relative;
	margin: 0 auto;
	box-sizing: border-box;
	width: 140px;
	height: 140px;
	border-radius: 50%;
	border: 1px solid #dcdcdc;

}
/*头像 icon*/
.headPortraitIcon {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: auto;
	width: 138px;
	height: 138px;
	border-radius: 50%;
}
/*内容*/
.contentWrapU {
	padding-left: 30px;
	box-sizing: border-box;
	width: 100%;
	height: auto;
	background-color: #fff;
}
/*登录public输入框=>项*/
.loginPublicTermU {
	position: relative;
	padding-top:15px;
	width: 690px;
	height: 96px;
	align-items: center;
	font-size: 30px;
	border-bottom: 2px solid #dcdcdc;
}
/*兄弟元素=>最后一个*/
.loginPublicTermU:last-child {
	border-bottom: none;
}
/*左*/
.loginPTLeftU {
	float: left;
	width: 140px;
	line-height: 75px;
	color: #666;
	font-size: 30px;
	text-indent: 3px;
	letter-spacing: 4px;
}
/*右*/
.loginPTRightU {
	float: left;
	width: 549px;
	line-height: 40px;
	padding: 17px 0;
}
/*input*/
.loginPTRInput {
	outline: none;
	border: none;
	width: 540px;
	font-size: 30px;
	color: #666;
	letter-spacing: 1px;
	background-color: #fff; 
}
/*input=>提示文本*/
input::-webkit-input-placeholder { /* WebKit browsers */ 
	color: #bbb; 
	font-size: 26px;
	font-family: "微软雅黑";
} 
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
	color: #bbb; 
	font-size: 30px;
	font-family: "微软雅黑";
} 
input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
	color: #bbb; 
	font-size: 30px;
	font-family: "微软雅黑";
} 
input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
	color: #bbb; 
	font-size: 30px;
	font-family: "微软雅黑";
} 
/*验证码 input*/
.loginCode {
	float: left;
	outline: none;
	border: none;
	width: 300px;
	height: 40;
	line-height: 40px;
	font-size: 30px;
	color: #666;
	letter-spacing: .01rem;
}
/*验证码 icon*/
.loginCodeImg {
	width: 248px;
	height: 96px;
}

/*记住账号 wrap*/
.rememberAccountWrap {
	padding: .27rem 0 0 .3rem;
	box-sizing: border-box;
	width: 6.9rem;
	height: auto;
	font-size: .25rem;
	color: #666;
}
.rememberAccountBox {
	width: 180px;
	height: 48px;
}
.rememberAccountBoxL {
	float: left;
	width: 48px;
	height: 48px;
	line-height: 48px;
}
/*记住账号 icon*/
.rememberAccountBoxLIcon {
	width: 28px;
	height: 28px;	
}
.rememberAccountBoxR {
	float: left;
	width: 130px;
	height: 48px;
	line-height: 48px;
	font: 24px/40px "微软雅黑";
	letter-spacing: 2px;
}
/*'登录'按钮 box*/
.loginButtonBox {
	padding-top: 1.08rem;
	box-sizing: border-box;
	width: 100%;
	height: auto;
}
.loginButton {
	margin: 0 auto;
	width: 690px;
	height: 90px;
	font: 30px/90px "微软雅黑";
	color: #fff;
	text-align: center;
	border-radius: 8px;
	letter-spacing: 3px;
	background-color: #1e82d2;
}
/*'快捷'登录 =>功能wrap*/
.quickLoginWrap {
	position: relative;
	padding-top: .15rem;
	box-sizing: border-box;
	width: 100%;
	height: .64rem;
	
}
/*'快捷'登录 =>功能 box*/
.quickLoginBox {
	margin: 0 auto;
	width: 3.43rem;
	height: .49rem;
}
/*刷脸、指纹=>登录*/
.faceSwipingButton, .fingerprintButton {
	width: 1.7rem;
	height: .49rem;
	font: .25rem/.49rem "微软雅黑";
	text-align: center;
	letter-spacing: .04rem;
	color: #1e82d2;
}
.faceSwipingButton {
	float: left;
}
.fingerprintButton {
	float: right;
}
/*刷脸登录 |指纹登录 =>伪类:after=>'|'的样式*/
.fingerprintButton:after {
	content: " ";
	display: block;
	width: .02rem;
	height: .29rem;
	background-color: #e1e2e3;
	position: absolute;
	top: .25rem;
	left: 3.74rem;
}
/*用户:'注册账号、忘记密码？'=>功能 wrap*/
.userLoginWrap {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: .76rem;
	
}
/*用户:'注册账号、忘记密码' =>功能 box*/
.userLoginBox {
	margin: 0 auto;
	width: 3.43rem;
	height: .49rem;
}
/*用户:'注册账号、忘记密码'=>按钮*/
.registerButton, .forgetButton {
	width: 1.7rem;
	height: .49rem;
	font: 26px/30px "微软雅黑";
	text-align: center;
	letter-spacing: .04rem;
	color: #1e82d2;
}
.registerButton {
	float: left;
}
.forgetButton {
	float: right;
}
/*用户:忘记密码 =>伪类:after=>'|'的样式*/
.forgetButton:after {
	content: " ";
	display: block;
	width: .02rem;
	height: .28rem;
	background-color: #e1e2e3;
	position: absolute;
	top: .1rem;
	left: 3.74rem;
}
/*验证码,在style中不能添加 私有属性scoped */
.verify-code {
	float: right;
	
}
/*.oginCode {
	float: left;
	display: block;
	outline: none;
	border: none;
	width: 3rem;
	height: .67rem;
	font-size: .3rem;
	color: #666;
	letter-spacing: .01rem;
}*/

</style>