<template>
    <div class="binding-msg">
        <headerView custom-title="绑定用户信息"></headerView>

        <div class="content">
            <form action class="binding-form">
                <!-- 头像 -->
                <div class="avatar">
                    <div class="fl">头像</div>
                    <div class="fr">
                        <span>
                            <img class="avatar-img" src="/static/img/user/userinfo/d058ccbf6c81800aedd20eb5b43533fa828b4752.jpg" >
                        </span>
                        
                        <span class="iconfont icon-icon1"></span>
                    </div>
                </div>

                <!-- 用户名 -->
                <div class="form-group">
                    <label><i class="iconfont icon-username"></i></label>
                    <input 
                    type="text" 
                    class="userName" 
                    placeholder="请输入用户名"
                    v-model="logOnMessage.userName"
                     >
                </div>

                <!-- 手机号 -->
                <div class="form-group">
                    <label><i class="iconfont icon-shouji"></i></label>
                    <input 
                    type="text" 
                    class="phone" 
                    placeholder="请输入手机号"
                    v-model="logOnMessage.phone"
                    >
                    <button class="getCodeBtn" @click.prevent="getCode(logOnMessage.phone)">获取验证码</button>
                </div>

                <!-- 验证码 -->
                <div class="form-group">
                    <label><i class="iconfont icon-yanzhengma"></i></label>
                    <input 
                        type="number" 
                        class="phoneNumber" 
                        placeholder="请输入验证码"
                        v-model="logOnMessage.verifyCode"
                        >
                </div>

                <!-- 支付密码 -->
                <div class="form-group">
                    <label><i class="iconfont icon-mima"></i></label>
                    <input 
                    :type="isHide?'password':'text'" 
                    placeholder="请输入密码"
                    v-model="logOnMessage.password"
                    >
                    <span class="eye iconfont" :class="isHide?'icon-yanjingyincang':'icon-yanjing'" @click="eyeToggle"></span>
                </div>

                <!-- 确认支付密码 -->
                <div class="form-group">
                    <label><i class="iconfont icon-mima"></i></label>
                    <input 
                    :type="isHide?'password':'text'" 
                    placeholder="请再次输入密码"
                    v-model="logOnMessage.passwordTwo"
                    >
                </div>

            </form>

            <button class="binding-btn" type="button" @click="bindingClick">完成</button>
           
        </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView.vue'
import md5 from 'js-md5';

/* 引入 mint-ui 弹窗组件 */
import {Toast} from "vant"
import { Dialog } from 'vant'

export default {
    name:"bindingMsg",
    data(){
        return{
            isHide:true,
            logOnMessage:{
                userName:'', //用户名
                phone:'', //用户手机号
                verifyCode:'', //手机验证码
                password:'', //用户密码
                passwordTwo:'', //确认密码
            },
            tempPhone:{
                canGet: true,
                timer: null,
                waitTime: 60
		    }
        }
    },
    methods: {
        // 是否显示密码
        eyeToggle(){
            this.isHide = !this.isHide
        },

        // 绑定完成
        bindingClick(){
            var that = this
            // 用户名
            if(that.logOnMessage.userName == ""){
                Dialog.alert({
                    message: '用户名不能为空'
                })
                return
            }

            // 手机号
            if(that.logOnMessage.phone == ""){
                Dialog.alert({
                    message: '手机号不能为空'
                })
                return
            }else if(!/^1[345678]\d{9}$/.test(that.logOnMessage.phone)){
                Dialog.alert({
                    message: "请填写正确的手机号码"
                })
                return
            }

            //验证码
            if(that.logOnMessage.verifyCode == ""){
                Dialog.alert({
                    message: '验证码不能为空'
                })
                return
            }

            // 用户密码
            if(that.logOnMessage.password == ""){
                Dialog.alert({
                    message: '密码不能为空'
                })
                return
            }else if(!/^[a-zA-Z]\w{5,17}$/.test(that.logOnMessage.password)){
                Dialog.alert({
                    message: '密码长度要在6~18位之间,且必须以字母开头!'
                })
                return
            }
            
            //二次输入密码
            if(that.logOnMessage.passwordTwo == ""){
                Dialog.alert({
                    message: '请再次输入密码'
                })
                return
            }else if(that.logOnMessage.passwordTwo != that.logOnMessage.password){
                Dialog.alert({
                    message: '两次输入的密码不一致'
                })
                return
            }

        },

        //获取验证码
		getCode(code){
            var that = this
            //用户手机号
            if(that.logOnMessage.phone == ""){
                Dialog.alert({
                    message: '手机号不能为空'
                })
                return
            }else if(!/^1[345678]\d{9}$/.test(that.logOnMessage.phone)){
                Dialog.alert({
                    message: '请填写正确的手机号码'
                })
                return
            }else{
                var temp='sms_forget';
                var auth = md5( code + md5(temp+'android+app'));
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
    components:{
        headerView
    }
}
</script>

<style lang="stylus" scoped>
.content
    font-size 24px
    padding 0 .2rem
    box-sizing border-box
    form
        background-color #fff
        padding 0 .2rem
        box-sizing border-box
        .avatar 
            height 114px   
            border-bottom .01rem solid #e0e0e0
            display flex
            justify-content space-between
            align-items center
            color #444
            .fr
                display flex
                align-items center
                .avatar-img
                    width 90px
                    height 90px
                    border-radius 50% 
                    border 2px solid #eee
                    display inline-block                    
                .iconfont
                    font-size 30px
                    vertical-align middle
        .form-group
            height 76px
            display flex
            align-items center
            border-bottom .01rem solid #e0e0e0
            margin-bottom 15px
            &:last-of-type
                border-bottom none
            label 
                margin-right 50px
                .iconfont
                    font-size 30px
                    color #444444
            input
                flex 1
                height 50px
                line-height 50px 
                background-color transparent
                border none
                -webkit-box-shadow none
                box-shadow none
            .getCodeBtn
                height 50px
                line-height 50px
                font-size 22px
                background-color #444
                border-radius 8px
                color #fff
                float right
                padding 0 10px
            .eye
                font-size 30px
                color #444444
    .binding-btn
        width 80%
        height 60px
        line-height 60px
        text-align center
        color #ffffff
        background-color #323232
        border-radius 8px
        margin 50px auto
        display block

            

</style>
