<template>
    <div class="headerView" :style="{'position':customFixed ? 'fixed' : 'relative' }">
        <slot name="backBtn"></slot>        
        <h3>{{customTitle}}</h3>
        <span class="rightBtn" :style="{'display':rightNone ? 'none' :'block' }">编辑</span>
    </div>
</template>

<script>
    export default {
        name:"headerView",
        props:{
            'customTitle':{
                type:String,
                default:'标题'
            },
            'customFixed':{
                type:Boolean,
                default:false
            },
            'rightNone':{
                type:Boolean,
                default:false 
            }
        }        
    }
</script>

<style lang="stylus" scoped>
.headerView 
    width 100%
    height 88px
    line-height 88px
    background-color #323232
    color #fff
    text-align center
    position relative
    z-index 99
    .backBtn
        height 100%
        display flex
        align-items center
        position absolute
        left 0
        top 0
        img 
            width 32px
            height 32px
            padding 0 20px
    h3
        font-size 30px
        font-weight normal
    .rightBtn
        width 12%
        font-size 26px
        display none
        position absolute
        right  0
        top 0

    

</style>


