<template>
	<div class="reg-new-page">
		       <headerView custom-title="注册"  >
				<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
					<img src="../../../static/img/public/backBtn.png" />
				</div>
				<span class="rightBtn" slot="rightBtn" @click="$router.push('/login')">登录</span>
			</headerView> 
    <form action="" class="reg-form">
		  <!-- <div class="form-group account">
			   <i class="iconfont label">&#xe60f;</i>
			   <input type="text" name="userName" placeholder="请输入用户名" class="account-input" autocomplete="off" v-model="logOnMessage.userName">
		  </div> -->
		  <div class="form-group mobile">
			   <i class="iconfont label">&#xe62c;</i>
			   <input type="tel" name="mobile" placeholder="请输入手机号" class="mobile-input" autocomplete="off" v-model="logOnMessage.mobile" :disabled="!clickState">
		  </div>
		  <div class="form-group verifyCode">
			   <i class="iconfont label">&#xe645;</i>
			   <input type="text" name="verifyCode" placeholder="请输入验证码" class="verify-input" autocomplete="off" v-model="logOnMessage.verifyCode" >
			   <button id="getVerifyCodeBtn" class="get-verify-code" type="button" @click="getCode(logOnMessage.mobile)" :disabled="!clickState"  :class="{active:clickState}">{{codeText}}</button>
		  </div>
		  <div class="form-group password">
			   <i class="iconfont label">&#xe60e;</i>
			   <input :type="isHide?'password':'text' " name="pwd" placeholder="请输入密码" class="password-input" autocomplete="off" v-model="logOnMessage.password">
			   <span id="passwordEyeIcon" class="eye" @click="hideShow">
				   <i class="iconfont eye-close" :class="{hide:isHide==false}">&#xe6f2;</i>
				   <i class="iconfont eye-open"  :class="{hide:isHide==true}">&#xe657;</i>
				</span>
		  </div>
		  <div class="form-group password2">
			   <i class="iconfont label">&#xe60e;</i>
			   <input :type="isHide?'password':'text' " name="pwd2" placeholder="请再次输入密码" class="password-input" autocomplete="off" v-model="logOnMessage.passwordTwo">
		  </div>
		  <div class="form-group email">
			   <i class="iconfont label">&#xe61c;</i>
			   <input type="text" name="email" placeholder="请输入电子邮箱" class="email-input" autocomplete="off" v-model="logOnMessage.email">
		  </div>
		  <div class="form-group invite-code">
			   <i class="iconfont label">&#xe670;</i>
			   <input type="text" name="inviteCode" placeholder="邀请口令（非必填）" class="invite-input" autocomplete="off" v-model="logOnMessage.invite">
		  </div>
		  <button id="regBtn" class="reg-btn" type="button" @click="registerBut">注册</button>
	</form>
	</div>
</template>
<script>
// 公共头部
import headerView from '../common/headerView.vue'

	/* 引入 mint-ui 弹窗组件 */
	import {Toast} from "vant"
	import { Dialog } from 'vant';

		/* md5 */
	import md5 from 'js-md5';
export default {
	data(){
		return{
			isHide:true,  //是否显示密码

            logOnMessage:{
				// userName:'', 			//用户账号

				mobile:'',              //用户手机号

				verifyCode:'',          //手机验证码

				password:'',            //用户密码

				passwordTwo:'',         //确认密码 二次输入

				email:'',               //用户邮箱

				invite:'',              //用户邀请码

			},
			//正则
			regular:{
				// userName:/^\w{3,10}$/, 			             //用户账号正则

				mobile:/^[1]([3-9])[0-9]{9}$/,              //用户手机号正则

				password:/^[a-zA-Z]\w{5,17}$/,             //用户密码正则

				email:/^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/,               //用户邮箱正则
			},

			    /*定时器Id*/
				timer: null,
				/*获取验证码-倒计时的'时间'*/
				timerNum: 60,
				/*'获取验证码的状态'点击，默认:true,同时=>控制'获取验证码'按钮color颜色*/
				clickState: true,
				/*获取验证码-text*/
				codeText: '获取验证码',
		}
	},
	methods: {
		   //用户注册
		   registerBut(){
				  var that = this;

				  //用户名
				//   if(that.logOnMessage.userName==""){
				// 		 Dialog.alert({
				// 		 message: '用户名不能为空噢~!'
				// 		 })
				// 		 return
				//   }else if(!that.regular.userName.test(that.logOnMessage.userName)){
                //         Dialog.alert({
				// 		message: '用户名格式:3-10个字母、数字、下划线!'
				// 		})
				// 		return
				//   }
				 
				 //用户手机号
                 if(that.logOnMessage.mobile==""){
						 
						 Toast('手机号不能为空噢!')
						 return
				  }else if(!that.regular.mobile.test(that.logOnMessage.mobile)){
                  
						Toast('手机号码输入不规范,请输入正确的手机格式!')
						return
				  }

				  //验证码
				//    if(that.clickState==true){
				// 	                        	Dialog.alert({
				// 								message: '请获手机取验证码!'
				// 							})
				// 								return
				//    }else{
					   if(that.logOnMessage.verifyCode==""){
											
											Toast('验证码不能为空，请获取验证码!')
												return
				//    }
				   }

				  //用户密码
				  if(that.logOnMessage.password==""){
						
						 Toast('密码不能为空噢~!')
						 return
				  }else if(!that.regular.password.test(that.logOnMessage.password)){
               
						Toast('密码长度要在6~18位之间,且必须以字母开头!')
						return
				  }

				  //二次输入密码
				  if(that.logOnMessage.passwordTwo==""){
						
						 Toast('确认密码不能为空噢')
						 return
				  }else if(that.logOnMessage.passwordTwo != that.logOnMessage.password){
                       
						Toast('输入的密码不一致噢！')
						return
				  }

				  //邮箱
				//   if(that.logOnMessage.email==""){
				// 		 Dialog.alert({
				// 		 message: '邮箱不能为空噢~!'
				// 		 })
				// 		 return
				//   }else
				   if(that.logOnMessage.email!=""){
						if(!that.regular.email.test(that.logOnMessage.email)){
												Dialog.alert({
												message: '邮箱格式错误，请输入正确邮箱!'
											})
												return
										}
				   }

				//注册接口
					var params = new URLSearchParams();
						params.append('mobile', that.logOnMessage.mobile);       //你要传给后台的参数值 key/value
						params.append('code', that.logOnMessage.verifyCode);
						params.append('password', that.logOnMessage.password);
						params.append('uid', that.logOnMessage.invite);
					var url =  "/User/register"
				// ?mobile="+that.logOnMessage.mobile+"&code="+that.logOnMessage.verifyCode+"&password="+that.logOnMessage.password+"&uid="+that.logOnMessage.invite;
				that.$axios({
					        method: 'post',
									url:url,
									data: params
				}).then((res)=>{
					if(res.data.status === 1){
							Toast('注册成功~')
							setTimeout(() => {
								this.$router.push("/login");
							}, 1000);
							
					}else{
						   	Dialog.alert({
												message: res.data.msg
							})
					}
				})
				   
		   },

		   //获取验证码
		   getCode(code){

                  if(code==""){
						 
						 Toast('请填写手机号码~!')
						 return
				  }else if(!this.regular.mobile.test(code)){
               
						 Toast('手机号码输入不规范,请输入正确的手机格式!')
						return
				  }else{
					    let that = this;
						var temp='sms_reg';
						var auth = md5( code + md5(temp+'android+app') );
						var url = "/Phone_auth/verifycode"
						var params = new URLSearchParams();
						params.append('mobile', code);       //你要传给后台的参数值 key/value
						params.append('temp', temp);
						params.append('auth', auth);
                        if (that.clickState) {
						that.$axios({
							method: 'post',
							url:url,
							data: params
						}).then((res)=>{
							if(res.data.status == 1){
							Toast(res.data.msg)
							that.timer = setInterval(that.countDown,1000);
							/*不能=>获取验证码*/
							this.clickState = false;
						    }else{
							Dialog.alert({
							message: res.data.msg
							})
						}
						})
					}
				  }
		   },

		   /*(倒计时)获取验证码期间60S=>执行的函数*/
			countDown(){
				// this.setStorage(this.timerNum);   //localstorage
				this.timerNum--;
				this.codeText = '重新获取' + (this.timerNum + 's');
				// console.log('找回密码=>获取验证码=>定时器:',this.timerNum);

				if(this.timerNum <= 0){
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
// 			//写入和读取localstorage:
// 			setStorage(parm) {
// 	            localStorage.setItem("dalay", parm);
// 	            localStorage.setItem("_time", new Date().getTime());
//         	},

//         	getStorage() {
// 	            let localDelay = {};
// 	            localDelay.delay = localStorage.getItem("dalay");
// 	            localDelay.sec = localStorage.getItem("_time");
// 	            return localDelay;
//             },

// 			judgeCode() {
// 			            let that = this;
// 			            let localDelay = that.getStorage();
// 			            let secTime = parseInt(
// 			                (new Date().getTime() - localDelay.sec) / 1000
// 			);
// 					let _delay = localDelay.delay - secTime; 
// 					that.timerNum = _delay;
// 					that.timer = setInterval(function() { 
// 					if (_delay > 1) { 
// 					that.clickState = false; 
// 					_delay--; 
// 					that.setStorage(_delay);
// 					that.timerNum = _delay; 
// 					that.codeText = '重新获取' + (that.timerNum + 's');
// 					} else { 
// 								 that.clickState = true;
// 								 that.codeText = '获取验证码'
// 								 that.timerNum = 60; 
// 								 window.clearInterval(that.timer);
// 					} 
// 						 }, 1000) 
// 				},
			
			//是否显示密码
			hideShow(){ 

				 if(this.isHide==true){
					 this.isHide=false
				 }else{
					 this.isHide=true
				 }

			}
	}
	,components:{
        // 公告头部
        headerView,
	},
	mounted() {
			// this.judgeCode()
	}
}
</script>
<style lang="stylus" scoped>
  .reg-new-page
    background #ffffff
    height 100vh
  .reg-new-page .reg-form
    margin-top 100px
    padding 0 75px

  .reg-new-page .reg-form>.form-group 
    border-bottom: 1px solid #e0e0e0
    height: 49px
    margin-bottom: 56px
   
   .reg-new-page .reg-form>.form-group>label 
    font-size: 12px
    margin-right: 36px

  
  .reg-new-page .reg-form>.form-group>input 
    background-color: transparent;
    border: none;
    box-shadow: none;
    width: 400px;
    font-size 30px

  .reg-new-page .reg-form>.form-group>input.verify-input
    width: 260px

  .reg-new-page .reg-form>.form-group>.get-verify-code 
    background-color: #b0b0b0;
    border-radius: .625rem;
    color: #fff;
    float: right;
    font-size: 30px
    height: 50px
    line-height: 50px
    margin-top: -8px
    padding: 0 16px;

   .reg-new-page .active 
    background-color: #444!important;

   
   .reg-new-page .reg-form .reg-btn 
    background-color: #323232;
    border-radius: .1rem;
    color: #fff;
    font-size: 25px
    height: 68px
    width: 588px
    display block
    margin 40px auto 

   .reg-new-page .reg-form>.form-group>.label
    font-size 30px
    color #000000
    margin-right 30px

   .reg-new-page .reg-form>.form-group.password>.eye 
    float: right;
    text-align: center;
    width: 30px

   .reg-new-page .reg-form>.form-group.password>.eye>i 
    color: #000000;
    font-size 40px



</style>
