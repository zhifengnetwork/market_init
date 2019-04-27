<template>
    <div class="home">
        首页
        <menuBar></menuBar>
    </div>
</template>

<script>
    import menuBar from '../common/menuBar.vue'
    export default {
        name:'home',
        data(){
            return{

            }
        },
        components:{
            menuBar
        }
    }
</script>

<style lang="stylus" scoped>
.home 
    font-size 34px
    text-align center
    

</style>
