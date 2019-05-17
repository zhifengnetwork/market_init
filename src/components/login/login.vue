<template>
	<div class="sms-login-new-page">
		<headerView custom-title="登录"  >
				<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
					<img src="../../../static/img/public/backBtn.png" />
				</div>
				<span class="rightBtn" slot="rightBtn" @click="$router.push('/register')">注册</span>
			</headerView> 
		 <div class="headPortraitWrap">
				<!--头像 box-->
				<div class="headPortraitBox">
					<!--头像 icon-->
					<img class="headPortraitIcon" src="/static/img/0001.png" />
				</div>
		</div>
		 <form action="" class="sms-login-form">
		  <div class="form-group mobile">
			   <i class="iconfont label">&#xe62c;</i>
			   <input type="tel" name="mobile" placeholder="请输入手机号" class="mobile-input" autocomplete="off" v-model="logOnMessage.mobile" :disabled="!phone.canGet">
		  </div>
		  <div class="form-group verifyCode">
			   <i class="iconfont label">&#xe645;</i>
			   <input type="text" name="verifyCode" placeholder="请输入验证码" class="verify-input" autocomplete="off" v-model="logOnMessage.verifyCode" >
			   <div @click="getCode(logOnMessage.mobile)" class="btns clearfloat">
			   <button id="getVerifyCodeBtn" class="get-verify-code" type="button"  :disabled="!phone.canGet"  v-if="!phone.canGet">{{phone.waitTime+"s后重新获取"}}</button>
               <button id="getVerifyCodeBtn" class="get-verify-code active" type="button"    v-if="phone.canGet">获取手机验证码</button>
			   </div>
		  </div>
		  <div class="form-group password">
			   <i class="iconfont label">&#xe60e;</i>
			   <input :type="isHide?'password':'text' " name="pwd" placeholder="请输入密码" class="password-input" autocomplete="off" v-model="logOnMessage.password">
			   <span id="passwordEyeIcon" class="eye" @click="hideShow">
				   <i class="iconfont eye-close" :class="{hide:isHide==false}">&#xe6f2;</i>
				   <i class="iconfont eye-open"  :class="{hide:isHide==true}">&#xe657;</i>
				</span>
		  </div>
		  <div class="form-group invite-code">
			   <i class="iconfont label">&#xe645;</i>
			   <input type="text" v-model="logOnMessage.thisCode"  class="verify-input" placeholder="请输入右图验证码" />
						<!--验证码组件，1、接受数据, 2、调用子组件的函数-->
						<verify-code v-on:collectCode="collectCode" ref="mychildFun"></verify-code>
		  </div>
		  <button id="regBtn" class="login-btn" type="button" @click="login">登录</button>
	</form>
	      <div class="other-info clearfloat">
            <!-- <a href="/passport/login">账号密码登录</a> -->
			<rout-link  id="getPswrdBtn" to="/forget">忘记密码?</rout-link>
        </div>
	</div>
</template>
<script>
	/* 引入 mint-ui 弹窗组件 */
	import {Toast} from "vant"
	import { Dialog } from 'vant';

		/* md5 */
	import md5 from 'js-md5';
	// 公共头部
	import headerView from '../common/headerView.vue'
	// 引入 管理数据商店
    import store from '../../vuex/vueShop.js'
	/**
     * Verify 验证码组件
     * @description 分发验证码使用
     * */
	import VerifyCode from '../Verify/VerifyCode'
	

 	import { mapMutations } from 'vuex';
export default {
	data(){
		 return{
			  isHide:true,  //是否显示密码

              logOnMessage:{
				// userName:'', 			//用户账号

				mobile:'',              //用户手机号

				verifyCode:'',          //手机验证码

				password:'',            //用户密码

				thisCode:'',            //图片验证

			},
			//正则
			regular:{

				mobile:/^[1]([3-9])[0-9]{9}$/,              //用户手机号正则

				password:/^[a-zA-Z]\w{5,17}$/,             //用户密码正则

			},
			
		           //手机
          tempPhone:{
            canGet: true,
            timer: null,
            waitTime: 60
		  },
		  numberCode: null,

          //用户token
		  userToken:''
		
		 }
	},
	methods: {
        ...mapMutations(['changeLogin',]),
		//获取验证码
		getCode(code){
			
				 var that = this
				 		 //用户手机号
                 if(that.logOnMessage.mobile==""){
						 Dialog.alert({
						 message: '手机号不能为空噢~!'
						 })
						 return
				  }else if(!that.regular.mobile.test(that.logOnMessage.mobile)){
                        Dialog.alert({
						message: '手机号码输入不规范,请输入正确的手机格式!'
						})
						return
				  }else{
                        var temp='sms_forget';
						var auth = md5( code + md5(temp+'android+app') );
						var url = "/Phone_auth/verifycode"
						var params = new URLSearchParams();
						params.append('mobile', code);       //你要传给后台的参数值 key/value
						params.append('temp', temp);
						params.append('auth', auth);
						that.$axios({
							method: 'post',
							url:url,
							data: params
						}).then((res)=>{
							if(res.data.status === 1){
							Toast(res.data.msg)
							//倒计时开始
							this.timeCountdown(this.phone);  //参数为最终对象
						}else{
							
								Dialog.alert({
								message:res.data.msg
								})
							
						}
				})
				}
						
		},

	

		
		//是否显示密码
			hideShow(){ 
				 if(this.isHide==true){
					 this.isHide=false
				 }else{
					 this.isHide=true
				 }
			},
		/*接受子组件传过来=>验证码*/
			collectCode(collectCode) {
		       // codeValue => 子组件传过来的值
		       this.numberCode = collectCode;
		},

		//用户登录
		    login(){
				 var that = this
				 		 //用户手机号
                 if(that.logOnMessage.mobile==""){
						 Dialog.alert({
						 message: '手机号不能为空噢~!'
						 })
						 return
				  }else if(!that.regular.mobile.test(that.logOnMessage.mobile)){
                        Dialog.alert({
						message: '手机号码输入不规范,请输入正确的手机格式!'
						})
						return
				  }

				  //验证码
				//    if(that.phone.canGet==true){
				// 	                        	Dialog.alert({
				// 								message: '请获手机取验证码!'
				// 							})
				// 								return
				//    }else{
					   if(that.logOnMessage.verifyCode==""){
												Dialog.alert({
												message: '验证码不能为空，请获取验证码!'
											})
												return
				   }
				//    }

				  //用户密码
				  if(that.logOnMessage.password==""){
						 Dialog.alert({
						 message: '密码不能为空噢~!'
						 })
						 return
				  }else if(!that.regular.password.test(that.logOnMessage.password)){
                        Dialog.alert({
						message: '密码长度要在6~18位之间,且必须以字母开头!'
						})
						return
				  }

				 // 验证码
				if(that.logOnMessage.thisCode== ''){
					Dialog.alert({
						message: '验证码不能为空！!'
						})
					return 
				}else if(that.logOnMessage.thisCode.toLowerCase() != that.numberCode.toLowerCase()){
					Dialog.alert({
						message: '验证码不正确！!'
					})
					/*调用组件的函数=> 更新-验证码*/
					that.$refs.mychildFun.setCode();
					/*清掉当前input，验证码*/
					that.logOnMessage.thisCode = '';
					return 
				}

					var params = new URLSearchParams();
						params.append('mobile', this.logOnMessage.mobile);       //你要传给后台的参数值 key/value
						params.append('password', this.logOnMessage.password);
						params.append('code', this.logOnMessage.verifyCode);
					var url =  "/User/login"

				 this.$axios({
					        method: 'post',
							url:url,
							data: params
				}).then((res)=>{
							if(res.data.status === 1){
							
							Toast('登录成功~')
							that.userToken = res.data.data.token;  //token
							that.mobile = res.data.data.mobile                 //phone
							that.uid = res.data.data.id
      						localStorage.removeItem('Authorization');
							 // 将用户token保存到vuex中
							that.changeLogin({ Authorization: that.userToken,
							mobile:that.mobile,
							uid:that.uid
							});
							 // 将用户手机号保存到vuex中
							
					
							setTimeout(() => {
								that.$router.push("/home");
							}, 1000);

						}else{
							Dialog.alert({
								message: res.data.msg
							})
						}
				})
			},
		
	},
			/*引入模块*/
		components: {
			VerifyCode,
			headerView
		},
		computed:{
         //手机
        phone(){
            if(!this.tempPhone.canGet){
                return this.timeCountdown(this.tempPhone);
            }else{
                return this.tempPhone;
            }
        }

    }
}
</script>
<style lang="stylus" scoped>

.sms-login-new-page
    background #ffffff
    height 100vh

.sms-login-new-page .sms-login-form
    margin-top 100px
    padding 0 75px
/*头像 wrap*/
.headPortraitWrap 
	padding-top: 100px;
	box-sizing: border-box;
	width: 100%;
	height: 240px;
	font-size: .2rem;
	background-color: #fff;

/*头像 box*/
.headPortraitBox 
	position: relative;
	margin: 0 auto;
	box-sizing: border-box;
	width: 140px;
	height: 140px;
	border-radius: 50%;
	border: 1px solid #dcdcdc;


/*头像 icon*/
.headPortraitIcon 
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

.sms-login-new-page .sms-login-form>.form-group 
    border-bottom: 1px solid #e0e0e0
    height: 49px
    margin-bottom: 56px
   
.sms-login-new-page .sms-login-form>.form-group>label 
    font-size: 12px
    margin-right: 36px
	
.sms-login-new-page .sms-login-form>.form-group>input 
    background-color: transparent;
    border: none;
    box-shadow: none;
    width: 400px;
    font-size 25px

.sms-login-new-page .sms-login-form>.form-group>input.verify-input
    width: 260px

.sms-login-new-page .sms-login-form>.form-group .btns
    float: right;
	
.sms-login-new-page .sms-login-form>.form-group .get-verify-code 
    background-color: #b0b0b0;
    border-radius: .625rem;
    color: #fff;
    float: right;
    font-size: 20px
    height: 50px
    line-height: 50px
    margin-top: -8px
    padding: 0 16px;

.sms-login-new-page .sms-login-form>.form-group.password>.eye 
    float: right;
    text-align: center;
    width: 30px

.sms-login-new-page .sms-login-form>.form-group.password>.eye>i 
    color: #000000;
    font-size 40px

.cerify-code-panel
    float: right;
    height: 50px

.sms-login-new-page .sms-login-form .login-btn
    background-color: #323232;
    border-radius: .1rem;
    color: #fff;
    font-size: 25px
    height: 68px
    width: 588px
    display block
    margin 40px auto 

.sms-login-new-page .other-info 
    color: #444;
    font-size: 20px
    line-height: 1.33;
    margin-top: 30px
    padding 0 75px

.sms-login-new-page  .other-info a 
    float: left;
    text-align: center;
    width: 200px

.sms-login-new-page  .other-info a:first-child 
    text-align: left;

.sms-login-new-page  .other-info #getPswrdBtn
    float: right;
    text-align: right;

.sms-login-new-page .active 
    background-color: #444!important;

</style>
