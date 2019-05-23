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

<style lang="stylus">
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
        font-size 35px
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
    .rightBtn>img
       height 50px
       width 50px
.homebuttom
	background-size 100% 100%
	color #fff
	height 355px
	overflow hidden
	padding-top 17px
	position absolute
	right 30px
	top 80px
	width 280px
	z-index 100
	.ul-arr 
		background-color #434343
		-webkit-transform rotate(45deg)
		height 42px
		position absolute
		right 30px
		top 15px
		transform rotate(45deg)
		width 42px
	ul 
		border-radius 25px
		height 338px
		overflow hidden
		padding 1px 0
		width 100%
		background-image linear-gradient(#434343,#171717)
		li
			float left
			height 84px
			line-height 84px
			overflow hidden
			padding-left 40px
			width 100%
			span
				border-bottom 1px solid #444
				color #fff
				display block
				float left
				font-size 30px
				height 83px
				padding-left 40px
				width 190px
				text-align left
            &:last-child span
                border-bottom none
                color red
			.iconfont
				display block
				float left
				height 40px
				width 40px
				margin-top 20px
ul>li:last-child span
    border-bottom none
      



 
</style>


