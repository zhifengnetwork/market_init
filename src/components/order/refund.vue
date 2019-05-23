<template>
    <div class="refund">
        <headerView custom-title="退款原因" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="static/img/public/backBtn.png" />
            </div>
        </headerView>

        <div class="content">

            <!-- 退款原因 -->
            <div class="dispatch-row">
                <van-cell-group class="goods-cell-group">
                    <van-cell is-link  @click="showReason" >
                        <template slot="title">
                            <span style="margin-right: 10px;">退款原因:</span>
                            <span class="reasonText gray" style="float:right">{{this.reason}}</span>
                        </template>
                    </van-cell>
                    <!-- 上拉菜单，选择退款原因 -->
                    <van-actionsheet v-model="show" title="请选择退款原因" class="select-wrap">
                        <van-radio-group v-model="reason">
                            <van-cell-group>
                                <van-cell v-for="(item,index) in refund.refund_reason" :key="index" :title="item" clickable @click="selectReason($event,index)">
                                    <van-radio :name="item"/>
                                </van-cell>
                            </van-cell-group>    
                        </van-radio-group>
                    </van-actionsheet>
                </van-cell-group>
            </div>

            <!-- 退款方式 -->
            <div class="dispatch-row">
                <van-cell-group class="goods-cell-group">
                    <van-cell is-link @click="showReasonType"> 
                        <template slot="title">
                            <span style="margin-right: 10px;">退款方式:</span>
                            <span class="reasonText gray" style="float:right">{{reasonType}}</span>
                        </template>
                    </van-cell>  
                    <van-actionsheet v-model="showW" title="请选择退款方式" class="select-wrap">
                        <van-radio-group v-model="reasonType">
                            <van-cell-group>
                                <van-cell v-for="(item,index) in refund.refund_type" :key="index" :title="item" clickable @click="selectReasonType($event,index)">
                                    <van-radio :name="item"/>
                                </van-cell>
                            </van-cell-group>    
                        </van-radio-group>
                    </van-actionsheet>            
                </van-cell-group>
            </div>

            <!-- 退款联系人 -->
            <div class="dispatch-row">
                <div class="fl">退款联系人 :</div>
                <div class="fr reasonText"> {{refund.consignee}}</div>
            </div>

            <!-- 联系电话 -->
            <div class="dispatch-row">
                <div class="fl">联系电话:</div>
                <div class="fr reasonText">{{refund.mobile}}</div>
            </div>

            <!-- 退款备注 -->
            <div class="">
                <van-cell-group>
                    <van-field
                        v-model="cancel_remark"
                        label="问题描述"
                        type="textarea"
                        placeholder="问题描述(选填)"
                        rows="1"
                        autosize
                    />
                </van-cell-group>
            </div>
            
            <!-- 上传图片 -->
            <div class="upload-pictures">
                <h3>上传图片 (选填) :</h3>
                <p>上传商品破损照片可以增加申请通过率，最多3张</p>

                <!-- 选择图片 -->
                <div class="uploader-add">
                    <div class="closeIcon" v-if="imgUrls.length>0"  v-for="(itemz,index) in imgUrls" :key="index">
                        <img class="seledPic" :src="itemz" @click="bigImg(index)">
                        <img src="/static/img/user/appraise/close.png" alt="" class="close"  @click="closeImg(index)">
                    </div>
                    <!-- 浏览显示图片 -->
                    <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg =! showBigImg">
                        <div class="showImg">
                            <mt-swipe :auto="0" :show-indicators="false" @change="handleChange" :continuous="false" :defaultIndex="num">
                            <mt-swipe-item v-for="(items,index) in imgUrls" :key="items.id">
                                <div class="num"  >{{index+1+'/'+imgUrls.length}}</div>
                                <img :src="imgUrls[index]" class="img"/>
                            </mt-swipe-item>
                            </mt-swipe>
                        </div>
                    </div>
                    <div class="selPic" v-if="imgUrls.length<3">
                        <span class="iconfont icon-xiangji"></span>
                        <span>上传凭证</span>
                        <input type="file" class="input-file" multiple="multiple" @change="onRead($event)" accept="image/gif,image/jpeg,image/jpg,image/png" >
                    </div>

                </div>
           

            </div>
            
            <!-- 按钮 -->
            <div class="refundBtn">
                <button class="cancelBtn">取消</button>
                <button class="confirmBtn" @click="apply_refund()">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import headerView from '../common/headerView'
    import {Swipe, SwipeItem} from 'mint-ui'
import { Toast } from 'vant';
    Vue.component(Swipe.name, Swipe)
    Vue.component(SwipeItem.name, SwipeItem)
    export default {
        name:'refund',
        data(){
            return{
                reason:'请选择退款原因',
                reasonType:'请选择退款方式',
                //退款原因
                show:false,
                reasonIndex:0,
                //退款方式
                showW:false,
                reasonTypeIndex:0,
                //退款备注
                cancel_remark:'',
                maxImages:3,
                imgUrls:[],
                leftImages:0,
                showBigImg:false,
                num: 0,
                //退款id
                orderId:this.$route.query.order_id,
                refund:[],
            }
        },
        methods:{

            // 上拉列表:选择退款原因
            showReason() {
                this.show = true;
            },
            //  退款方式
            showReasonType(){
                this.showW = true;
            },
            //选中退款方式
            selectReasonType(e,index){
                this.reasonType = e.target.innerText;
                this.showW = false; 
                this.reasonIndex = index
                
            },
            
            // 选择退款方式
            selectReason(e,index){
                this.reason = e.target.innerText;
                this.show = false;
                this.reasonTypeIndex = index
            },

              //上传图片
            onRead(e){
                if (e.target.files.length <= (this.maxImages - this.imgUrls.length)) {
                    for (var i = 0; i < e.target.files.length; i++) {
                        let file = e.target.files[i]
                        this.file = file

                        let reader = new FileReader()
                        let that = this
                        reader.readAsDataURL(file)
                        
                        reader.onload = function (e) {
                            that.imgUrls.push(this.result)
                        }
                    }
                    // 剩余张数
                    this.leftImages = this.maxImages - (this.imgUrls.length + e.target.files.length)
                    this.imgText = String(this.maxImages - (this.imgUrls.length + e.target.files.length)) + '/' + String(this.maxImages)
                }
                else {
                    Toast('只能选择' + (this.maxImages - this.imgUrls.length) + '张了')
                }
            
            },

            //删除照片
            closeImg(index){
                this.imgUrls.splice(index, 1)
                this.leftImages++
                if (this.leftImages === this.maxImages) {
                    this.imgText = '上传图片'
                } else {
                    this.imgText = String(this.leftImages) + '/' + String(this.maxImages)
                }
            },

            handleChange (index) {
                this.num = index
            },

            //点击显示大图
            bigImg (index) {
                this.showBigImg = true;
                this.num = index
            },

            //申请退款
            apply_refund(){
                    // 申请退款	order/apply_refund
                    // 参数：
                    // token
                    // order_id
                    // refund_type
                    // refund_reason
                    // cancel_remark
                    // img
                    var url = 'order/apply_refund'
                    var params = new URLSearchParams();
                    var returnObj = new Object();//创建一个对象
                    returnObj.img = this.imgUrls;
                        params.append('token', this.$store.getters.optuser.Authorization);           //token
                        params.append('order_id',this.orderId );
                        params.append('refund_type',this.reasonIndex );    
                        params.append('refund_reason',this.reasonTypeIndex );    
                        params.append('cancel_remark',this.cancel_remark );      
                        params.append('img',JSON.stringify(this.imgUrls));   
                        this.$axios({
                                        method:"post",
                                        url:url,
                                        data: params
                                        }).then((res)=>{
                                               if(res.data.status === 1){
                                                   Toast(res.data.msg)
                                                   setTimeout(()=>{
                                                       this.$router.push('/afterSale/afterDetails?order_id='+this.orderId)
                                                   },2000)
                                               }else{
                                                    Toast(res.data.msg)
                                               }
                                        })
            }
            
        },
        components:{ 
			headerView
        },
        created() {
                //  获取订单退款信息	order/get_refund
                // 参数：
                // token
                // order_id
                var url = 'order/get_refund'
                 var params = new URLSearchParams();
                                params.append('token', this.$store.getters.optuser.Authorization);           //token
                                params.append('order_id',this.orderId );                      
                                this.$axios({
                                        method:"post",
                                        url:url,
                                        data: params
                                        }).then((res)=>{
                                               if(res.data.status === 1){
                                                   this.refund = res.data.data
                                               }
                                        })
        },
    }
</script>

<style lang="stylus" scoped>
.refund 
    .content
        padding-top 88px
        .dispatch-row
            height 80px
            line-height 80px
            background-color #fff
            font-size 24px
            color #323233
            .fl
                float left
                min-width 170px
                padding-left 30px
                margin-right 20px
            .fr
                float left
                .remarksVal
                    width 100%
                    height 60px
            .gray
                color #969799       
            .select-wrap /deep/ .van-cell__value
                flex none
        .upload-pictures
            color #919191
            background-color #fff
            padding 30px
            box-sizing border-box
            h3
                font-size 30px
                font-weight normal
                margin-bottom 10px
            p
                font-size 22px
                line-height 34px
                margin-bottom 20px
            .uploader-add
                width 100%
                display flex
                flex-wrap wrap
                .closeIcon
                    width 184px
                    height 184px
                    background #f7f7f7
                    display flex
                    flex-direction column
                    align-items center
                    justify-content center
                    font-size 24px
                    position relative
                    margin 10px
                    .close
                        position absolute
                        top -20px
                        right -20px
                        width 50px
                        height 50px
                .imgMask
                    position fixed
                    height 100%
                    width 100%
                    top 0
                    left 0
                    z-index 101
                    background #000
                    .showImg
                        height 100%
                        width 100%
                        position absolute
                        -webkit-box-align center
                        -ms-flex-align center
                        align-items center
                        left 0
                        top 0
                        .num
                            padding-top 10px
                            color white
                            font-size 50px
                            font-weight bold
                            text-align center
                        .img
                            object-fit scale-down
                            height auto
                            width 100%
                            height 100%
                .seledPic
                    width 100%
                    height 100%
                .selPic
                    width 184px
                    height 184px
                    background #f7f7f7
                    display flex
                    flex-direction column
                    align-items center
                    justify-content center
                    font-size 24px
                    position relative
                    margin 10px
                    .iconfont
                        font-size 50px
                    .input-file
                        width 100%
                        height 100%
                        position absolute
                        left 0
                        top 0
                        opacity 0
        .refundBtn
            width 100%
            height 80px
            display flex
            justify-content space-between
            padding 0 30px
            margin-top 30px
            button 
                width 49%
                height 100%
                border-radius 8px
                font-size 24px
            .cancelBtn
                background-color #fff
                border 1px solid #cccccc
            .confirmBtn
                background-color #e93d3b
                color #fff

</style>