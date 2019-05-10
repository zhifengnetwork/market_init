<template>
	<div class="reg-new-page">
		       <headerView custom-title="注册"  rightNone>
				<div class="backBtn" slot="backBtn" @click="$router.go(-1)">
					<img src="../../../static/img/public/backBtn.png" />
				</div>
			</headerView> 
    <form action="" class="reg-form">
		  <div class="form-group account">
			   <i class="iconfont"></i>
			   <input type="text" name="userName" placeholder="请输入用户名" class="account-input" autocomplete="off">
		  </div>
		  <div class="form-group mobile">
			   <i class="iconfont"></i>
			   <input type="tel" name="mobile" placeholder="请输入手机号码" class="mobile-input" autocomplete="off">
			   <button id="getVerifyCodeBtn" class="get-verify-code" type="button">获取验证码</button>
		  </div>
		  <div class="form-group password">
			   <i class="iconfont"></i>
			   <input type="password" name="pwd" placeholder="请输入密码" class="password-input" autocomplete="off">
		  </div>
		  <div class="form-group password2">
			   <i class="iconfont"></i>
			   <input type="tel" name="pwd2" placeholder="请再次输入密码" class="password-input" autocomplete="off">
		  </div>
		  <div class="form-group email">
			   <i class="iconfont"></i>
			   <input type="text" name="email" placeholder="请输入电子邮箱" class="email-input" autocomplete="off">
		  </div>
		  <div class="form-group invite-code">
			   <i class="iconfont"></i>
			   <input type="text" name="inviteCode" placeholder="邀请口令（非必填）" class="invite-input" autocomplete="off">
		  </div>
		  <button id="regBtn" class="reg-btn" type="button">注册</button>
	</form>
	</div>
</template>
<script>
// 公共头部
import headerView from '../common/headerView.vue'
export default {
	data(){
		return{

		}
	},components:{
        // 公告头部
        headerView,
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
  
  .reg-new-page .reg-form>.form-group>.get-verify-code 
    background-color: #b0b0b0;
    border-radius: .625rem;
    color: #fff;
    float: right;
    font-size: 12px
    height: 50px
    line-height: 50px
    margin-top: -8px
    padding: 0 16px;
   
   .reg-new-page .reg-form .reg-btn 
    background-color: #b0b0b0;
    border-radius: .1rem;
    color: #fff;
    font-size: 20px
    height: 68px
    // margin-top:40px
    width: 588px
    display block
    margin 40px auto ;

</style>
