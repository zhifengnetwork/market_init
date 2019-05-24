<template>
    <div class="userinfo">
        <div class="basic" v-show="amend">
           <headerView custom-title="基本资料">
                    <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="/static/img/public/backBtn.png" />
                      </div>
        </headerView>
          <div class="user-page" >
               <ul>
                   <li>
                       <van-uploader :after-read="onRead">
                            <van-icon name="photograph" />
                            <span>头像</span>
                            <span>
                                <img :src="userImg" alt="" class="userImg">
                            </span>
                       </van-uploader>
                   </li>
                   <li @click="amend=false">
                       <span>昵称</span>
                       <span>
                            {{userName}}
                       </span>
                       <i class="right-arrow"></i>
                   </li>
                   <li >
                       <span>性别</span>
                       <span>
                            <select name="" id="selGender" title="选择性别" v-model="gender"  @change="selectGender(gender)">
                            <option :value="0">未设置</option>
                            <option :value="1">男</option>
                            <option :value="2">女</option>
                        </select>
                       </span>
                       <i class="right-arrow"></i>
                   </li>
                   <li>
                       <span>生日</span>
                       <span   @click.passive="openPicker" >{{birthday}}</span>
                        <i class="right-arrow"></i>
                          <mt-datetime-picker
                            ref="picker"
                            v-model="pickerVisible"
                            type="date"
                            @confirm="getTime"
                            >
                    </mt-datetime-picker>
                   </li>
               </ul>
               <ul>
                    <router-link to="/my/site">
                   <li>
                       <span>地址管理</span>
                       <span>
                           {{address===0?'未设置':'已设置'}}
                           <i class="right-arrow"></i></span>
                   </li>
                   </router-link>
               </ul>
               <ul>
                     <router-link to="/my/changePwd">
                   <li>
                       <span>账号安全</span>
                       <span>可修改密码</span>
                       <i class="right-arrow"></i>
                   </li>
                    </router-link>
               </ul>              
          </div>

            <div class="quitOut-box" @click="quitOut">
                <button class="quitOut">退出登录</button>
            </div>
                   <!-- 我的生日 -->
                    <mt-datetime-picker
                    ref="picker"
                    v-model="pickerVisible"
                    type="date"
                    @confirm.passive="getTime"
                    >
                    </mt-datetime-picker>
        
      </div>
      <!-- 修改昵称 -->
      <div class="amend-name" v-if="amend==false" >
          <headerView custom-title="昵称"  >
                    <div class="backBtn" slot="backBtn" @click="amend=true">
                       取消
                    </div>
          </headerView>
          <div class="mod_list">
            <div class="mod_list_item ">
                <div class="list_item_bd">
                    <div class="list_item_label"></div>
                    <div class="list_item_cnt">
                        <input id="nickname" class="list_item_input" type="text" maxlength="10" value="7159" v-model="userName" placeholder="请输入你要修改的昵称哦~" >
                    </div>
                    <div class="list_item_extra">
                        <i class="ico_form_del"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment_1"><a id="btnOperateNickname" href="javascript:void(0)" @click="complete(userName)" >完成</a> </div>
      </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '@/components/common/headerView.vue'
import { MessageBox } from 'mint-ui'
import store from '@/store/store'
import { Dialog} from 'vant'
/* 引入 mint-ui 弹窗组件 */
import {Toast} from "mint-ui"
export default {
    data(){
        return{
              pickerVisible: new Date(),
              birthday:'请填写生日',
              amend:true,
              //性别
              gender:0,

              //修改昵称
              userName:'',
              baseUrl:'',
            //   userItem:'',
            //用户头像
            userImg:'',
            //是否设置地址
            address:'',
        }
    },components:{
        headerView
    },
    methods: {
        //打开修改生日
        openPicker() {
        this.$refs.picker.open();
        },
        
        //点击修改生日后确定
        getTime(){
            //生日接口传 birthyear  birthmonth  birthday  type传2
            var url = 'user/set_reabir'
            let y = this.pickerVisible.getFullYear() //年
            let m = this.pickerVisible.getMonth()+1 //月
            let d = this.pickerVisible.getDate()    //日    
            var params = new URLSearchParams();
                params.append('type', 2);       //你要传给后台的参数值 key/value         //收货人
                params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value   //token
                params.append('birthyear', y);       //你要传给后台的参数值 key/value   //token
                params.append('birthmonth', m);       //你要传给后台的参数值 key/value   //token
                params.append('birthday', d);       //你要传给后台的参数值 key/value   //token
                this.$axios({
                        method:"post",
                        url:url,
                        data:params
                    }).then((res)=>{
                    if(res.data.status===1){
                        this.birthday =y+'-'+m+'-'+d;
                        var usin = JSON.parse(window.localStorage.getItem('usin'))   //获取localStorage用户信息
                        usin.birthyear = y                                            //赋值修改的年份
                        usin.birthmonth = m                                           //赋值修改的月份
                        usin.birthday = d                                             //赋值修改的日份
                        window.localStorage.setItem('usin', JSON.stringify(usin));    //从新覆盖用户信息
                        Toast(res.data.msg)
                        this.amend=true
                    }else{
                        Toast(res.data.msg)
                    }
            })
        },

        /* 修改昵称 */
        complete(name){
            if(name===''){
                Toast('用户昵称不能为空!')
                return
            }else{
                var url="user/set_reabir"
                var params = new URLSearchParams();
                params.append('type', 1);       //你要传给后台的参数值 key/value         //收货人
                params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value   //token
                params.append('realname', name);       //你要传给后台的参数值 key/value   //token
                this.$axios({
                        method:"post",
                        url:url,
                        data:params
                    }).then((res)=>{
                    if(res.data.status===1){
                        this.userName = name;
                        var usin = JSON.parse(window.localStorage.getItem('usin'))   //获取localStorage用户信息
                        usin.realname = name                                         //赋值修改的姓名
                        window.localStorage.setItem('usin', JSON.stringify(usin));   //从新覆盖用户信息
                        Toast(res.data.msg)
                        this.amend=true
                    }else{
                        Toast(res.data.msg)
                    }
                })
            }
                
        },

        onRead(file) {
        // update_head_pic 传head_img 头像编辑
        var url = "user/update_head_pic"
        var params = new URLSearchParams();
            params.append('head_img', file.content);       //你要传给后台的参数值 key/value         //收货人
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value   //token
            this.$axios({
                method:"post",
                url:url,
                data:params
            })
            .then((res)=>{
                if(res.data.status===1){
                    this.userImg = res.data.data;                                //回显头像
                    var usin = JSON.parse(window.localStorage.getItem('usin'))   //获取localStorage用户信息
                    usin.avatar = res.data.data                                  //赋值修改的头像
                    window.localStorage.setItem('usin', JSON.stringify(usin));   //从新覆盖用户信息
                    Toast(res.data.msg)
                }else{
                    Toast(res.data.msg)
                }
            })
            
        },
        //性别选择
        selectGender(val){
            //   接口
            // user/set_reabir
            var url = 'user/set_reabir'
            var params = new URLSearchParams();
            params.append('token', this.$store.getters.optuser.Authorization);       //你要传给后台的参数值 key/value         //token
            params.append('type', 3);       //你要传给后台的参数值 key/value         
            params.append('gender', val);       //你要传给后台的参数值 key/value  
            this.$axios({
                method:"post",
                url:url,
                data:params
            })
            .then((res)=>{
                if(res.data.status===1){    
                var usin = JSON.parse(window.localStorage.getItem('usin'))   //获取localStorage用户信息
                usin.gender = val                                            //赋值修改的性别
                window.localStorage.setItem('usin', JSON.stringify(usin));   //从新覆盖用户信息
                    Toast(res.data.msg)
                }else{
                    Toast(res.data.msg)
                }
            })
        },
     
        //退出登录
        quitOut(){
            Dialog.confirm({
                title: '提示',
                message: '你确定要退出登录吗?'
            }).then(() => {
               Toast('退出成功')
               store.commit('del_token'); //token，清除它;
               setTimeout(() => {
					this.$router.push("/login");
			   }, 1000);
            }).catch(() => {
                // on cancel
            })
        }

    },
    created() {
        //图片路径
        this.baseUrl=this.url
        console.log(JSON.parse(this.$store.getters.optuser.usin))
        this.userImg = JSON.parse(this.$store.getters.optuser.usin).avatar   //头像
        this.userName = JSON.parse(this.$store.getters.optuser.usin).realname  //昵称
        this.birthday = JSON.parse(this.$store.getters.optuser.usin).birthyear+'-'+JSON.parse(this.$store.getters.optuser.usin).birthmonth+'-'+JSON.parse(this.$store.getters.optuser.usin).birthday  //生日
        this.gender = JSON.parse(this.$store.getters.optuser.usin).gender
        //是否设置地址
        this.address = JSON.parse(this.$store.getters.optuser.usin).is_address
    },
}
</script>
<style lang="stylus" scoped>

    .user-page
        background-color: #f0f0f0;
        border-bottom: 2px solid #e0e0e0;
        height: auto;
        margin-top: 20px;
        overflow: hidden;
        width: 100%;
    .quitOut-box
        background  #323232;
        height 80px;
        width 500px;
        border-radius 10px
        margin 50px auto 
        line-height 80px
        text-align center
        .quitOut
            color #ffffff
    .user-page ul
        background: #fff;
        height: auto;
        margin-bottom: 10px;
        overflow: hidden;
        padding-left: 30px
        width: 100%;

    .user-page ul:last-child
        margin-bottom: 0px;

    .user-page ul:first-child li:first-of-type 
        height: 100px
        line-height: 100px

    .user-page ul li 
        border-bottom: 2px solid #e0e0e0
        height: 80px
        position relative

    .user-page ul li>span 
        float: left;
        font-size: 26px
        height: 100%;
        line-height:80px
        margin-right: 8%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 42%;

    .user-page ul li>span:first-of-type 
        color: #444;

    .user-page ul li>span:last-of-type 
        color: #b0b0b0;
        text-align: right;

    .user-page ul li:last-of-type 
        border-bottom: none;

    .user-page ul li .userImg
        width 90px
        height 90px
        border: 2px solid #eee
        border-radius: 50%
        float: right
        overflow: hidden
        margin-right 30px
    
    select
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        outline: none;
        border: none;
        background-color: white;
        text-align: right;
        color: #999;
    
    select .option 
        color: #000
    
    .right-arrow
        top 2px  

    // 修改昵称
    .amend-name
        background-color: #eeeeee;
    .mod_list
         padding-top: 30px;
         margin-bottom: 30px;
         position: relative;
    
    .mod_list_item:last-child 
         border-bottom: #e3e3e3 solid 1px;

    .mod_list_item:first-child 
         border-top: #e3e3e3 solid 1px;

    .mod_list_item 
        display: block;
        min-height: 100px
        vertical-align: middle;
        background: #fff;

    .mod_list_item .list_item_bd 
        display: table;
        width: 100%;
    
    .mod_list_item .list_item_bd>.list_item_label 
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        min-width: 15px;
        white-space: nowrap;
    
    .mod_list_item .list_item_bd>.list_item_cnt 
        display: table-cell;
        width: 90%;
        padding: 20px 30px 20px 15px;
        border-top: #e3e3e3 solid 1px;
        vertical-align: middle;
        font-size: 15px;
    
    .mod_list_item .list_item_bd>.list_item_extra 
        position: relative;
        display: table-cell;
        padding: 13px 17px 13px 0;
        vertical-align: middle;
        border-top: #e3e3e3 solid 1px;
        text-align: right;
        white-space: nowrap;
        color: #999999;
    
    .mod_list_item .list_item_bd .list_item_input 
        width: 100%;
        border: none;
        outline: none;
        min-height: 100px
        font-size: 30px;

    .comment_1 
        text-align: right;
        padding-right: 15px;
        font-size: 30px;
    
    .van-uploader
        width 100%;
    .van-icon
        font-size 40px
        vertical-align: middle
   

</style>
