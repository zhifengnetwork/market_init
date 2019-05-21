<template>
		<!--最大边框P-->
		<div class="warpperP">
				<headerView custom-title="找回密码"  >
				<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
					<img src="../../../static/img/public/backBtn.png" />
				</div>
				<span class="rightBtn" slot="rightBtn" @click="$router.push('/register')"></span>
			</headerView> 
				<form action="" class="sms-login-form">
				<div class="form-group mobile">
					<i class="iconfont label">&#xe62c;</i>
					<input type="tel" name="mobile" placeholder="请输入手机号" class="mobile-input" autocomplete="off" v-model="logOnMessage.mobile" :disabled="!phone.canGet">
				</div>
				<div class="form-group verifyCode">
					<i class="iconfont label">&#xe645;</i>
					<input type="number" name="verifyCode" placeholder="请输入验证码" class="verify-input" autocomplete="off" v-model="logOnMessage.verifyCode" >
					<div @click="getCode(logOnMessage.mobile)" class="btns clearfloat">
					<button id="getVerifyCodeBtn" class="get-verify-code" type="button"  :disabled="!phone.canGet"  v-if="!phone.canGet">{{phone.waitTime+"s后重新获取"}}</button>
					<button id="getVerifyCodeBtn" class="get-verify-code active" type="button"    v-if="phone.canGet">获取手机验证码</button>
					</div>
				</div>
				<div class="form-group password">
					<i class="iconfont label">&#xe60e;</i>
					<input :type="isHide?'password':'text' " name="pwd" placeholder="请输入新密码" class="password-input" autocomplete="off" v-model="logOnMessage.password">
					<span id="passwordEyeIcon" class="eye" @click="hideShow">
						<i class="iconfont eye-close" :class="{hide:isHide==false}">&#xe6f2;</i>
						<i class="iconfont eye-open"  :class="{hide:isHide==true}">&#xe657;</i>
						</span>
				</div>
				<div class="form-group password">
					<i class="iconfont label">&#xe60e;</i>
					<input :type="isHide?'password':'text' " name="pwd" placeholder="请确认新密码" class="password-input" autocomplete="off" v-model="logOnMessage.passwordTwo">
				</div>
				
				<button id="regBtn" class="login-btn" type="button" @click="back">确认</button>
			</form>
		
	</div>
</template>

<script>
		// 公共头部
	import headerView from '../common/headerView.vue'
			/* md5 */
	import md5 from 'js-md5';
	/* 引入 mint-ui 弹窗组件 */
	import {Toast} from "vant"
	import { Dialog } from 'vant';
	export default {
		name: 'forget',
		/*注册*/
		data(){
			return {
				isHide:true,  //是否显示密码

             	logOnMessage:{
				// userName:'', 			//用户账号

				mobile:'',              //用户手机号

				verifyCode:'',          //手机验证码

				password:'',            //用户密码
				
				passwordTwo:'',         //确认密码


			},
			         //手机
          tempPhone:{
            canGet: true,
            timer: null,
            waitTime: 60
		  },

		  			//正则
			regular:{

				mobile:/^[1]([3-9])[0-9]{9}$/,              //用户手机号正则

				password:/^[a-zA-Z]\w{5,17}$/,             //用户密码正则

			},

			}
		},
		
		/*模板渲染成html后调用*/
		methods:{
			//是否显示密码
			hideShow(){ 
				 if(this.isHide==true){
					 this.isHide=false
				 }else{
					 this.isHide=true
				 }
			},
			back(){
				 var that = this
				 		 //用户手机号
                 if(that.logOnMessage.mobile==""){
						 
						 Toast('手机号不能为空噢~!')
						 return
				  }else if(!that.regular.mobile.test(that.logOnMessage.mobile)){
                        
						Toast('手机号码输入不规范,请输入正确的手机格式!')
						return
				  }
			
					   if(that.logOnMessage.verifyCode==""){
												
											Toast('验证码不能为空，请获取验证码!')
												return
				   }

				  //用户密码
				  if(that.logOnMessage.password==""){
						 
						 Toast('密码不能为空噢~!')
						 return
				  }else if(!that.regular.password.test(that.logOnMessage.password)){
                        
						Toast('密码长度要在6~18位之间,且必须以字母开头!')
						return
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
						 
						 Toast('确认密码不能为空噢~!')
						 return
				  }else if(that.logOnMessage.passwordTwo != that.logOnMessage.password){
                        
						Toast('输入的密码不一致噢~!')
						return
				  }
                        // mobile
						// password1
						// password2
						// code
					var params = new URLSearchParams();
						params.append('mobile', this.logOnMessage.mobile);       //你要传给后台的参数值 key/value
						params.append('password1', this.logOnMessage.password);
						params.append('password2', this.logOnMessage.passwordTwo);
						params.append('code', this.logOnMessage.verifyCode);
					var url =  "/user/zhaohuipwd"

				 this.$axios({
					        method: 'post',
							url:url,
							data: params
				}).then((res)=>{
							if(res.data.status === 1){
							
							Toast('修改成功~')
					
							setTimeout(() => {
								that.$router.push("/login");
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
			
				 var that = this
				 		 //用户手机号
                 if(that.logOnMessage.mobile==""){
						
						 Toast('手机号不能为空噢!')
						 return
				  }else if(!that.regular.mobile.test(that.logOnMessage.mobile)){
                        
						Toast('手机号码输入不规范,请输入正确的手机格式!')
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

    },	/*引入模块*/
		components: {
			headerView
		},
	}
</script>

<style  lang="stylus" scoped>
.warpperP
    background: #fff;
    height: 100vh;
.warpperP .sms-login-form
    margin-top 100px
    padding 0 75px
.warpperP .sms-login-form>.form-group 
    border-bottom: 1px solid #e0e0e0
    height: 49px
    margin-bottom: 56px
   
.warpperP .sms-login-form>.form-group>label 
    font-size: 12px
    margin-right: 36px
	
.warpperP .sms-login-form>.form-group>input 
    background-color: transparent;
    border: none;
    box-shadow: none;
    width: 400px;
    font-size 30px

.warpperP .sms-login-form>.form-group>input.verify-input
    width: 260px

.warpperP .sms-login-form>.form-group .btns
    float: right;
	
.warpperP .sms-login-form>.form-group .get-verify-code 
    background-color: #b0b0b0;
    border-radius: .625rem;
    color: #fff;
    float: right;
    font-size: 30px
    height: 50px
    line-height: 50px
    margin-top: -8px
    padding: 0 16px;

.warpperP .sms-login-form>.form-group.password>.eye 
    float: right;
    text-align: center;
    width: 30px

.warpperP .sms-login-form>.form-group.password>.eye>i 
    color: #000000;
    font-size 40px

.warpperP .sms-login-form .login-btn
    background-color: #323232;
    border-radius: .1rem;
    color: #fff;
    font-size: 25px
    height: 68px
    width: 588px
    display block
    margin 40px auto 

.cerify-code-panel
    float: right;
    height: 50px
.warpperP .active 
    background-color: #444!important;

.iconfont
    font-size 30px
</style>