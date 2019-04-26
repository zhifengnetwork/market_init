<template>
    <div class="headerView" :style="{'position':customFixed ? 'fixed' : 'relative' }">
        <slot name="backBtn"></slot>        
        <h3>{{customTitle}}</h3>
        <slot name="rightBtn"></slot>   
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
        width 10%
        height 100%
        display flex
        align-items center
        justify-content center
        position absolute
        justify-content center
        left 0
        top 0
        img 
            width 40px
    h3
        font-size 30px
        font-weight normal
    .rightBtn
        width 12%
        font-size 26px
        position absolute
        right  0
        top 0
        display flex
        justify-content center
        height 100%
        align-items center
</style>


