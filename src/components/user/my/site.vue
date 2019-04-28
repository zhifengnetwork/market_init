
<template>
<!-- 地址管理 -->
    <div class="location">
          <headerView custom-title="地址管理">
                    <div class="backBtn" slot="backBtn" @click="($router.go(-1))">
                        <img src="../../../../static/img/public/backBtn.png" />
                      </div>
        </headerView>
        <div class="my-address-page yoho-page">
                <div class="page-wrap" style="min-height: 913px;">
                        <input type="hidden" name="_csrf" value="jT1UUoB2-sPizk8OZFoN4vtGpJDsinvqovSo">
                        <div class="address-item">
                            <span class="name">谢</span>
                            <span class="tel">166****7159</span>
                            <p class="address-info">广东省 广州市 白云区 均禾街道 232**</p>
                            <div class="action iconfont">
                                <a class="edit" href="/home/addressAct?id=VLD0OLtvm0OxTBWLg7Uklg%3D%3D">
                                    <img src="../../../../static/img/user/userinfo/xiugai.png" alt="">
                                </a>
                                <span class="del" data-id="VLD0OLtvm0OxTBWLg7Uklg%3D%3D">
                                    <img src="../../../../static/img/user/userinfo/laji.png" alt="">
                                </span>
                            </div>
                        </div>
                    <div class="tip">为提高配送时效，请您尽量准确填写四级地址。</div>
                    <!-- <a class="add-address" data-href="/user/addressAct" href="/user/addressAct"> -->
                    <router-link class="add-address" to="/my/addressAct"> 添加新地址</router-link>
                    <!-- </a> -->

                    <div class="confim-mask hide">
                        <div class="confim-box">
                            <div class="content">
                                您确定要删除地址？
                            </div>
                            <div class="action">
                                <span class="cancel">
                                    取消
                                </span>
                                <span class="confim">
                                    确认
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="address-list">
            </ul>
       </div>
    </div>
</template>
<script>
// 公共头部
import headerView from '../../common/headerView.vue'
export default {
    data(){
        return{

        }
    },components:{
        headerView
    }
}
</script>
<style lang="stylus" scoped>
     
     .my-address-page 
        background: #f0f0f0;
        width: 100%;
    
    .my-address-page .address-item 
        background: #fff;
        border-bottom: 2px solid #e0e0e0;
        color: #b0b0b0;
        display: block;
        padding: 20px 30px;

    .my-address-page .address-item .name 
        display: inline-block;
        max-width: 380px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    
    .my-address-page .address-item .tel 
        float: right;

    .my-address-page .address-item .name, .my-address-page .address-item .tel 
        color: #444;
        font-size: 30px
        font-weight: 700;
        line-height: 56px;
    
    .my-address-page .address-item .address-info 
        font-size: 25px
        line-height: 38px;
    
    .my-address-page .address-item .action 
        font-size: 30px;
        line-height: 60px;
        text-align: right;
    
    .my-address-page .address-item .action .del, .my-address-page .address-item .action .edit 
        color: #999;
        display: inline-block;
        height: 60px
        text-align: center;
        width: 60px

    
    .my-address-page .tip 
        color: #aeaeae;
        padding: 20px
        text-align: center;
        font-size: 25px;
    
    .my-address-page .add-address 
        background: #fff;
        border-bottom: 2px solid #e0e0e0;
        border-top: 2px solid #e0e0e0;
        color: #444;
        display: block;
        font-size: 30px
        font-weight: 700;
        line-height: 88px
        margin-bottom: 30px
        text-align: center;
    
    .my-address-page .address-item .action .edit 
        margin-right: 20px
    
    .my-address-page .address-item .action .edit>img,.del>img
        width 32px
        height 32px  

</style>
