<template>
    <div class="userinfo">
        <div class="basic" v-show="amend">
           <headerView custom-title="基本资料">
                    <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../../static/img/public/backBtn.png" />
                      </div>
        </headerView>
          <div class="user-page">
               <ul>
                   <li>
                       <span>头像</span>
                       <span>
                           <img src="../../../../static/img/user/userinfo/d058ccbf6c81800aedd20eb5b43533fa828b4752.jpg" alt="" class="userImg">
                       </span>
                   </li>
                   <li @click="amend=false">
                       <span>昵称</span>
                       <span>
                            王思聪
                       </span>
                       <i class="right-arrow"></i>
                   </li>
                   <li>
                       <span>性别</span>
                       <span>
                            <select name="" id="selGender" title="选择性别">
                            <option value="3" selected="selected">保密</option>
                            <option value="2">男</option>
                            <option value="1">女</option>
                        </select>
                       </span>
                       <i class="right-arrow"></i>
                   </li>
                   <li>
                       <span>生日</span>
                       <span   @click="openPicker">{{birthday}}</span>
                        <i class="right-arrow"></i>
                   </li>
               </ul>
               <ul>
                    <router-link to="/my/site">
                   <li>
                       <span>地址管理</span>
                       <span><i class="right-arrow"></i></span>
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
                   <!-- 我的生日 -->
                    <mt-datetime-picker
                    ref="picker"
                    v-model="pickerVisible"
                    type="date"
                    @confirm="getTime">
                    </mt-datetime-picker>
        
      </div>
      <!-- 修改昵称 -->
      <div class="amend-name" v-if="amend==false">
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
                        <input id="nickname" class="list_item_input" type="text" maxlength="10" value="7159" v-model="userName" placeholder="请输入你要修改的昵称哦~">
                    </div>
                    <div class="list_item_extra">
                        <i class="ico_form_del"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment_1"><a id="btnOperateNickname" href="javascript:void(0)" @click="complete">完成</a> </div>
      </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView.vue'
export default {
    data(){
        return{
              pickerVisible: new Date(),
              birthday:'请填写生日',
              amend:true,

              //修改昵称
              userName:''

        }
    },components:{
        headerView
    },methods: {
        //打开修改生日
          openPicker() {
            this.$refs.picker.open();
          },
        
        //点击修改生日后确定
          getTime(){
              console.log(123)
              let y = this.pickerVisible.getFullYear() //年
              let m = this.pickerVisible.getMonth()+1 //月
              let d = this.pickerVisible.getDate()    //日    
              this.birthday =y+'-'+m+'-'+d
          },

          /* 修改昵称 */
          complete(){

          }
    },
}
</script>
<style lang="stylus" scoped>
    .userinfo
        background #ffffff

    .user-page
        background-color: #f0f0f0;
        border-bottom: 2px solid #e0e0e0;
        height: auto;
        margin-top: 20px;
        overflow: hidden;
        width: 100%;

    .user-page ul
        background: #fff;
        float: right;
        height: auto;
        margin-bottom: 10px;
        overflow: hidden;
        padding-left: 30px
        width: 100%;

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
    
    


</style>
