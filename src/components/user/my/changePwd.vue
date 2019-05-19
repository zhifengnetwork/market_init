<template>
<!-- 修改密码 -->
    <div class="change-box">
        <div class="change" v-show="alter==0">
                <headerView custom-title="账号安全">
                    <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                            <img src="../../../../static/img/public/backBtn.png" />
                    </div>
                </headerView>
                <div class="main_wrap js_wxapp_hide"  >
                    <div class="mod_list mod_list_onclick">
                        <div class="mod_list_item js_wxapp_hide" @click="alter=1" >
                            <div class="list_item_bd" id="edit_psw">
                                <div class="list_item_label"></div>
                                <div class="list_item_cnt">
                                    登录密码
                                </div>
                                <div class="list_item_extra" id="mainPsw"></div>
                                <i class="right-arrow"></i>
                            </div>
                        </div>
                        <div class="mod_list_item" @click="alter=2">
                            <div class="list_item_bd" id="edit_telephone">
                                <div class="list_item_label"></div>
                                <div class="list_item_cnt">
                                    手机
                                </div>
                                <div class="list_item_extra js_mainTel" id="mainTel">{{userList.mobile}}<i class="right-arrow"></i></div>
                            </div>
                        </div>
                        <div class="mod_list_item js_wxapp_hide" @click="alter=3">
                            <div class="list_item_bd area_edit" id="edit_email">
                                <div class="list_item_label"></div>
                                <div class="list_item_cnt">
                                    邮箱
                                </div>
                                <div class="list_item_extra" id="mainEmail">
                                {{userList.mailbox!=''?userList.mailbox:'未设置'}}
                                    <i class="right-arrow"></i></div>
                            </div>
                        </div>
                        <div class="mod_list_item js_wxapp_hide" @click="alter=4">
                            <div class="list_item_bd" id="edit_payPsw">
                                <div class="list_item_label"></div>
                                <div class="list_item_cnt">
                                    商城支付密码
                                </div>
                                <div class="list_item_extra" id="payPsw">设置支付密码<i class="right-arrow"></i></div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
                <!-- 登录密码 -->
                <div class="pwd" v-if="alter==1">
                    <headerView custom-title="修改密码">
                        <div class="backBtn" slot="backBtn" @click="alter=0">
                                <img src="../../../../static/img/public/backBtn.png" />
                        </div>
                   </headerView>
                   
                   <div class="main_wrap_inner" >
                       
                        <div class="mod_list">
                                <div class="mod_list_item" id="modifyPswDiv" style="display: none">
                                    <div class="list_item_bd">
                                        <div class="list_item_label"></div>
                                        <div class="list_item_cnt ">
                                            <input id="pwdOld" class="list_item_input" name='pwd0' type="password" placeholder="输入旧密码 " autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        
                                        <div class="list_item_cnt">
                                            <input style="background-color: #fff; color:#999" disabled="" id="bind_mobile" class="list_item_input js_bind_mobile" type="text" v-model="userList.mobile">
                                        </div>
                                        <div class="list_item_extra"></div>
                                    </div>
                                </div>
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                       
                                        <div class="list_item_cnt">
                                            <input id="pay_code" class="list_item_input js_verifyCode" type="text" placeholder="验证码"  v-model="getpwd.newCode">
                                        </div>
                                        <div class="list_item_extra" @click="getCode()">
                                             <button type="submit" id="pay_getcode1" class="list_item_extra_btn js_getcode" v-show="!pwd.canGet" disabled="disabled">{{pwd.waitTime+"s后重新获取"}}</button>
                                             <button type="submit" id="pay_getcode" class="list_item_extra_btn js_getcode"  v-show="pwd.canGet" @click="getCode">获取手机验证码</button>
                                            </div>
                                    </div>
                                </div>
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        
                                        <div class="list_item_cnt ">
                                            <input id="pwdInput" class="list_item_input" name='pwd' type="password" placeholder="输入新密码" autocomplete="off" v-model="getpwd.pwd">
                                        </div>
                                    </div>
                                </div>
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        
                                        <div class="list_item_cnt ">
                                            <input id="pwdConfirm" class="list_item_input" name='pwd1' type="password" placeholder="确认新密码" autocomplete="off" v-model="getpwd.pwd1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="comment">密码由6-20位英文字母、数字或符号组成</div>
                            <div class="mod_btn_group mod_btn_group_block" @click="setNewPwd(getpwd.newCode)">
                                <a id="btnOperatePwd" class="mod_btn mod_btn_block mod_btn_primary" href="javascript:void(0)">确定</a>
                            </div>
                            
                     </div>
                    
                   </div>
                <!-- 手机 -->
                <div class="phone" v-if="alter==2">
                    <headerView custom-title="重新绑定手机">
                        <div class="backBtn" slot="backBtn" @click="alter=0">
                                <img src="../../../../static/img/public/backBtn.png" />
                        </div>
                    </headerView>
                    <div class="main_wrap_inner">
                        <!--新建联系方式-->
                        <div class="mod_list mod_list_onclick">

                            <div class="mod_list_item">
                                <div class="list_item_bd">
                                    <div class="list_item_label"></div>
                                    <div class="list_item_cnt">已绑定手机
                                    </div>
                                    <div class="list_item_extra js_mainTel">{{userList.mobile}}</div>
                                </div>
                            </div>

                            <div class="mod_list_item">
                                <div class="list_item_bd">
                                    <div class="list_item_label"></div>
                                    <div class="list_item_cnt">
                                        <input id="telephone" class="list_item_input" type="text" placeholder="更换绑定手机"  v-model="newPhone">
                                    </div>
                                    <div class="list_item_extra">
                                        <!-- <i class="right-arrow"></i> -->
                                    </div>
                                </div>
                            </div>
                            <div class="mod_list_item">
                                <div class="list_item_bd">
                                    <div class="list_item_label"></div>
                                    <div class="list_item_cnt item_cnt">
                                        <input id="code" class="list_item_input" type="text" placeholder="验证码" v-model="newCode">
                                    </div>
                                    <div class="list_item_extra" @click="getPhoneCode(newPhone)">
                                        <button id="getcode" class="list_item_extra_btn" v-show="!phone.canGet" disabled="disabled">{{phone.waitTime+"s后重新获取"}}</button>
                                         <button id="getcode" class="list_item_extra_btn"  v-show="phone.canGet" >获取手机验证码</button>
                                        </div>
                                </div>
                            </div>

                        </div>
                        <div class="mod_btn_group mod_btn_group_block">
                            <a id="btnOperateTel" class="mod_btn mod_btn_block mod_btn_primary" href="javascript:void(0)" @click="changePhone(newPhone,newCode)">完成</a>
                        </div>
                    </div>
                 </div>
                <!-- 邮箱 -->
                <div class="mailbox" v-if="alter==3">   
                        <headerView custom-title="填写邮箱地址">
                            <div class="backBtn" slot="backBtn" @click="alter=0">
                                取消
                            </div>
                        </headerView>
                        <div class="main_wrap_inner">
                            <div class="mod_list ">
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        <div class="list_item_label"></div>
                                        <div class="list_item_cnt">
                                            <input class="list_item_input" id="editEmailTxt" type="text" v-model="emile">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mod_btn_group mod_btn_group_block" @click="setEmile(emile)">
                                <a id="btnOperateTel" class="mod_btn mod_btn_block mod_btn_primary" href="javascript:void(0)">完成</a>
                            </div>
                        </div>
                    </div>
                <!-- 商城支付密码 -->
                <div class="paymentPwd" v-if="alter==4">
                    <headerView custom-title="设置支付密码">
                        <div class="backBtn" slot="backBtn" @click="alter=0">
                                <img src="../../../../static/img/public/backBtn.png" />
                        </div>
                    </headerView>
                    <div class="main_wrap_inner">
                            <!--验证手机-->
                            <div class="mod_list mod_list_onclick">
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        <div class="list_item_label"></div>
                                        <div class="list_item_cnt">
                                            <input style="background-color: #fff; color:#999" disabled="" id="bind_mobile" class="list_item_input js_bind_mobile" type="text" v-model="userList.mobile">
                                        </div>
                                        <div class="list_item_extra"></div>
                                    </div>
                                </div>
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        <div class="list_item_label"></div>
                                        <div class="list_item_cnt">
                                            <input id="pay_code" class="list_item_input js_verifyCode" type="text" placeholder="验证码" v-model="getpayment.newCode">
                                        </div>
                                        <div class="list_item_extra" @click="getCode()">
                                             <button id="pay_getcode" class="list_item_extra_btn js_getcode" href="javascript:void(0)" v-show="!pwd.canGet" :disabled="disabled">{{pwd.waitTime+"s后重新获取"}}</button>
                                             <button id="pay_getcode" class="list_item_extra_btn js_getcode" href="javascript:void(0)" v-show="pwd.canGet" @click="getCode">获取手机验证码</button>
                                            </div>
                                    </div>
                                </div>

                            </div>

                            <!--更新密码-->
                            <form action="" >
                            <div class="mod_list">
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        <div class="list_item_label"></div>
                                        <div class="list_item_cnt ">
                                            <input class="list_item_input js_payPswInput" type="password" placeholder="输入新密码" autocomplete="off" maxlength="6" v-model="getpayment.pwd">
                                        </div>
                                        <div class="list_item_extra"></div>
                                    </div>
                                </div>
                                <div class="mod_list_item">
                                    <div class="list_item_bd">
                                        <div class="list_item_label"></div>
                                        <div class="list_item_cnt ">
                                            <input class="list_item_input js_payPswConfirm" type="password" placeholder="确认新密码" autocomplete="off" maxlength="6"  v-model="getpayment.pwd1">
                                        </div>
                                        <div class="list_item_extra"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="comment">密码由6位英文字母数字组成</div>
                            <div class="mod_btn_group mod_btn_group_block" @click="paymentCode(getpayment.newCode)" >
                                <a class="mod_btn mod_btn_block mod_btn_primary js_operPayPsw" href="javascript:void(0)">确定</a>
                            </div>
                            </form >
                        </div>
                 
                 </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView.vue'
		/* md5 */
    import md5 from 'js-md5';
    	/* 引入 mint-ui 弹窗组件 */
	import {Toast} from "vant"
    import { Dialog } from 'vant';
    import store from '../../../store/store'
export default {
    data(){
        return{
            userList:'',
            
            //用户新手机号
            newPhone:'',
            //用户名手机code
            newCode:'',
            //用户修改密码
            getpwd:{
                 pwd:'',
                 pwd1:'',
                 newCode:'',
            },
            password:/^[a-zA-Z]\w{5,17}$/,             //用户密码正则
            pwdd:/^[a-zA-Z0-9]{6}$/,                   //支付密码
            email:/^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/,               //用户邮箱正则
            mobile:/^[1]([3-9])[0-9]{9}$/,              //用户手机号正则
            alter:0,
            //用户修改支付密码
            getpayment:{
                 pwd:'',
                 pwd1:'',
                 newCode:'',
            },
            //邮箱
            emile:'',
           //商城支付
            tempPwd:{ //定义一个临时对象
            canGet: true,
            timer: null,
            waitTime: 60
         },
           //手机
          tempPhone:{
            canGet: true,
            timer: null,
            waitTime: 60
          }
        }
    },components:{
        headerView
    },
    methods: {

         //获取验证码  商城支付
         getCode(){
                    //倒计时开始
                     var that = this
                     var temp='sms_forget';
						var auth = md5( this.userList.mobile + md5(temp+'android+app') );
						var url = "/Phone_auth/verifycode"
						var params = new URLSearchParams();
						params.append('mobile', this.userList.mobile);       //你要传给后台的参数值 key/value
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
							 this.timeCountdown(this.pwd);  //参数为最终对象
						}else{
								Dialog.alert({
								message:res.data.msg
								})
						}
				})

         },
         setNewPwd(code){
                     if(code === ''){
                         Toast('验证码不能为空!')
                         return
                     }
                     //用户密码
				  if(this.getpwd.pwd==""){
						 Dialog.alert({
						 message: '密码不能设置为空噢~!'
						 })
						 return
				  }else if(!this.password.test(this.getpwd.pwd)){
                        Dialog.alert({
						message: '密码长度要在6~18位之间,且必须以字母开头!'
						})
						return
                  }
                  if(this.getpwd.pwd!=this.getpwd.pwd1){
                      Dialog.alert({
						message: '输入的密码不一致噢!'
						})
						return
                  }
                     var that = this
                     
						var url = "/user/reset_pwd"
						var params = new URLSearchParams();
						params.append('password1', this.getpwd.pwd);       //你要传给后台的参数值 key/value
						params.append('password2', this.getpwd.pwd1);
                        params.append('code', code);
                        params.append('type', 1);
                        params.append('token', this.$store.getters.optuser.Authorization);
						that.$axios({
							method: 'post',
							url:url,
							data: params
						}).then((res)=>{
							if(res.data.status === 1){
                                // this.alter=0;
                                Toast(res.data.msg)
                                store.commit('del_token'); //token，清除它;
                                 setTimeout(() => {
								this.$router.push("/login");
			                    }, 1000);
						}else{
								Dialog.alert({
								message:res.data.msg
								})
						}
				})

         },
         //支付密码
         paymentCode(code){
                   if(code === ''){
                         Toast('验证码不能为空!')
                         return
                     }
                     //用户密码
				  if(this.getpayment.pwd==""){
						 Dialog.alert({
						 message: '密码不能设置为空噢~!'
						 })
						 return
				  }else if(!this.pwdd.test(this.getpayment.pwd)){
                        Dialog.alert({
						message: '密码由6位英文字母数字组成!!'
						})
						return
                  }
                  if(this.getpayment.pwd!=this.getpayment.pwd1){
                      Dialog.alert({
						message: '密码不一致!'
						})
						return
                  }else{
                          var that = this
						var url = "/user/reset_pwd"
						var params = new URLSearchParams();
						params.append('password1', this.getpayment.pwd);       //你要传给后台的参数值 key/value
						params.append('password2', this.getpayment.pwd1);
                        params.append('code', code);
                        params.append('type', 2);
                        params.append('token', this.$store.getters.optuser.Authorization);
						that.$axios({
							method: 'post',
							url:url,
							data: params
						}).then((res)=>{
							if(res.data.status === 1){
                                Toast(res.data.msg)
                                this.alter=0;
						}else{
								Dialog.alert({
								message:res.data.msg
								})
							
						}
				})
                  }
                        
         },
         //邮箱
         setEmile(code){
             if(code===''){
                 Toast('邮箱不能为空')
                 return
             }else if(!this.email.test(code)){
                 Toast('邮箱格式错误！')
                 return
             }else{
                 var url = 'user/reset_mailbox '
                 var params = new URLSearchParams();
						params.append('mailbox', code);       //你要传给后台的参数值 key/value
                        params.append('token', this.$store.getters.optuser.Authorization);
                 this.$axios({
							method: 'post',
							url:url,
							data: params
						}).then((res)=>{
							if(res.data.status === 1){
                                Toast(res.data.msg)
                                this.userList.mailbox = code
                                this.alter=0;
						}else{
								Dialog.alert({
								message:res.data.msg
								})
                }  
                })   
             }
                   
         },
         //更换手机
         changePhone(phone,newCode){
                 if(phone === ''){
                            Toast('手机号不能为空!')
                            return
                     }
                     //用户手机
				
				  else if(!this.mobile.test(phone)){
                        Dialog.alert({
						message: '手机号格式错误!!'
						})
						return
                  }else{
                        var that = this
						var url = "/user/reset_pwd"
						var params = new URLSearchParams();
						params.append('mobile', phone);       //你要传给后台的参数值 key/value
                        params.append('token', this.$store.getters.optuser.Authorization);
                        params.append('code', newCode);
						that.$axios({
							method: 'post',
							url:url,
							data: params
						}).then((res)=>{
							if(res.data.status === 1){
                                Toast(res.data.msg)
                                this.alter=0;
                                this.userList.mobile = phone
						}else{
								Dialog.alert({
								message:res.data.msg
								})
							
						}
				})
                  }
                   
         },

         //获取验证码  手机
         getPhoneCode(code){
                      //倒计时开始
                      if(code === ''){
                            Toast('手机号不能为空!')
                            return
                     }
                     //用户手机
				
				  else if(!this.mobile.test(code)){
                        Dialog.alert({
						message: '手机号格式错误!!'
						})
						return
                  }else{
                        var that = this
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
        
    },computed:{
        pwd(){ //最终对象  商城
            if(!this.tempPwd.canGet){
                return this.timeCountdown(this.tempPwd);
            }else{
                return this.tempPwd;
            }
         },
         //手机
        phone(){
            if(!this.tempPhone.canGet){
                return this.timeCountdown(this.tempPhone);
            }else{
                return this.tempPhone;
            }
        }

    },
    created() {
        this.userList = JSON.parse(this.$store.getters.optuser.usin)
        this.emile  = this.$store.getters.optuser.usin.mailbox
    },
}
</script>
<style lang="stylus" scoped>
   .change-box
        overflow hidden

   .main_wrap 
        position: relative;


  .main_wrap 
        margin: 44px auto 0 auto;
        max-width: 1424px;
   
  .mod_list 
        margin-bottom: 15px;

  .mod_list_item:first-child 
        border-top: #e3e3e3 solid 1px;

    .mod_list_item 
        display: block;
        min-height: 46px;
        vertical-align: middle;
        background: #fff;

  .mod_list_item .list_item_bd 
        display: table
        width: 100%;
        position: relative;

  .mod_list_item .list_item_bd>.list_item_label 
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        min-width: 20px;
        white-space: nowrap;
  .mod_list_item .list_item_bd>.list_item_cnt 
        display: table-cell;
        width: 90%;
        padding: 20px 20px 20px 15px;
        border-top: #e3e3e3 solid 1px;
        vertical-align: middle;
        font-size: 30px

  .mod_list_item .list_item_bd>.list_item_extra 
        position: relative;
        display: table-cell;
        padding: 20px 40px 20px  0;
        vertical-align: middle;
        border-top: #e3e3e3 solid 2px;
        text-align: right;
        white-space: nowrap;
        color: #999999;
        font-size 25px

   .right-arrow
        right 15px

    // 更该密码
    .mod_list_item .list_item_bd .list_item_input 
        width: 100%;
        border: none;
        outline: none;
    
    .comment 
        font-size: 25px
        padding-left: 15px;
        color: #ccc;
        margin-top: -9px;
        margin-bottom: 15px;
    
    .mod_btn_group_block 
        padding: 0 10px;
    
    .mod_btn_primary 
        background-color:#323232
        border: #323232 solid 2px;
        color: #fff !important;
        text-align: center;

    .mod_btn_block 
        display: block;
        height: 80px
        line-height: 80px
        font-size: 25px
 
//    手机
    .main_wrap_inner 
        margin-top: 20px;
    
    .mod_list_item .list_item_bd .list_item_extra_btn::before 
        content: '';
        position: absolute;
        top: 0px;
        left: 0;
        width: 2px;
        height: 100%;
        background: #e3e3e3;
    .mod_list_item .list_item_bd .list_item_extra_btn 
        display: block;
        min-width: 100px;
        padding-left: 35px;
        text-align: center;
        color #000;
.mod_list_item .list_item_bd>.list_item_cnt.item_cnt
     width 50%

</style>
