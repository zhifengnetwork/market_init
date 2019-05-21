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
                                <van-cell title="商品无货" clickable @click="selectReason">
                                    <van-radio name="商品无货"/>
                                </van-cell>
                                <van-cell title="配送时间问题" clickable @click="selectReason">
                                    <van-radio name="配送时间问题"/>
                                </van-cell>
                                <van-cell title="不想要了" clickable @click="selectReason">
                                    <van-radio name="不想要了"/>
                                </van-cell>
                                <van-cell title="商品信息填写错误" clickable @click="selectReason">
                                    <van-radio name="商品信息填写错误"/>
                                </van-cell>
                                <van-cell title="地址信息填写错误" clickable @click="selectReason">
                                    <van-radio name="地址信息填写错误"/>
                                </van-cell>
                                <van-cell title="商品降价" clickable @click="selectReason">
                                    <van-radio name="商品降价"/>
                                </van-cell>
                                <van-cell title="货物破损已拒签" clickable @click="selectReason">
                                    <van-radio name="货物破损已拒签"/>
                                </van-cell>
                                <van-cell title="快递/物流无物流跟踪记录" clickable @click="selectReason">
                                    <van-radio name="快递/物流无物流跟踪记录"/>
                                </van-cell>
                                <van-cell title="非本人签收" clickable @click="selectReason">
                                    <van-radio name="非本人签收"/>
                                </van-cell>
                                <van-cell title="其他" clickable @click="selectReason">
                                    <van-radio name="其他"/>
                                </van-cell>
                            </van-cell-group>    
                        </van-radio-group>
                    </van-actionsheet>
                </van-cell-group>
            </div>

            <!-- 退款方式 -->
            <div class="dispatch-row">
                <van-cell-group class="goods-cell-group">
                    <van-cell is-link>
                        <template slot="title">
                            <span style="margin-right: 10px;">退款方式:</span>
                            <span class="reasonText gray" style="float:right">按照原路返还</span>
                        </template>
                    </van-cell>              
                </van-cell-group>
            </div>

            <!-- 退款联系人 -->
            <div class="dispatch-row">
                <div class="fl">退款联系人 :</div>
                <div class="fr reasonText"> 小腊肉</div>
            </div>

            <!-- 联系电话 -->
            <div class="dispatch-row">
                <div class="fl">联系电话:</div>
                <div class="fr reasonText">178****2622</div>
            </div>
            
            <!-- 上传图片 -->
            <div class="upload-pictures">
                <h3>上传图片 (选填) :</h3>
                <p>上传商品破损照片可以增加申请通过率，最多5张</p>
                <!-- 选择图片 -->
                <div class="selPic">
                    <span class="iconfont icon-xiangji"></span>
                    <span>上传凭证</span>
                    <input type="file" class="input-file" multiple="multiple" @change="onRead($event,item)" accept="image/gif,image/jpeg,image/jpg,image/png" >
                </div>

                <!-- 浏览显示图片 -->
                <!-- <div class="imgMask" v-if="item.showBigImg" @click.stop="item.showBigImg=!item.showBigImg">
                    <div class="showImg">
                        <mt-swipe :auto="0" :show-indicators="false" @change="handleChange(index,item)" :continuous="false" :defaultIndex="num">
                        <mt-swipe-item v-for="(items,index) in item.imgUrls" :key="items.id">
                            <div class="num"  >{{index+1+'/'+item.imgUrls.length}}</div>
                            <img :src="item.imgUrls[index]" class="img"/>
                        </mt-swipe-item>
                        </mt-swipe>
                    </div>
                </div> -->

            </div>
            
            <!-- 按钮 -->
            <div class="refundBtn">
                <button class="cancelBtn">取消</button>
                <button class="confirmBtn">确认</button>
            </div>

        </div>
    </div>
</template>

<script>
    import headerView from '../common/headerView'
    export default {
        name:'refund',
        data(){
            return{
                reason:'请选择退款原因',
                show:false
            }
        },
        methods:{

            // 上拉列表:选择退款原因
            showReason() {
                this.show = true;
            },

            // 选择支付方式
            selectReason(e){
                this.reason = e.target.innerText;
                this.show = false;
            },

              //上传图片
            onRead(e,item){
                // if (e.target.files.length <= (item.maxImages - item.imgUrls.length)) {
                //     for (var i = 0; i < e.target.files.length; i++) {
                //     let file = e.target.files[i]
                //     this.file = file

                //     let reader = new FileReader()
                //     let that = this
                //     reader.readAsDataURL(file)
                    
                //     reader.onload = function (e) {
    
                //         item.imgUrls.push(this.result)
                    
                //         that.imgUrls.push(this.result)
                //     }
                //     }
                //     // 剩余张数
                //     item.leftImages = item.maxImages - (item.imgUrls.length + e.target.files.length)
                //     item.imgText = String(item.maxImages - (item.imgUrls.length + e.target.files.length)) + '/' + String(item.maxImages)
                // }
                // else {
                //     Toast('只能选择' + (item.maxImages - item.imgUrls.length) + '张了')
                // }
            
            },

            
        },
        components:{
			headerView
        }
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