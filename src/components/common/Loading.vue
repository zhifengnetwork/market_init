<template>
    <div class="Loading">
        <img src="static/img/loading.gif">
    </div>
</template>

<script>
     export default {
        name:'Loading',
        
    }
</script>

<style lang="stylus" scoped>
.Loading
    width 100%
    height 100vh
    position fixed
    left 0
    top 0
    z-index 999
    background-color #fff
    img
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        margin auto

</style>


