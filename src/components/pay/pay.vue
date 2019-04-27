<template>
    <div class="pay">
        <headerView custom-title="支付" custom-fixed rightNone>
            <div class="backBtn" slot="backBtn" @click="$router.go(-1)">
                <img src="static/img/public/backBtn.png" />
            </div>
        </headerView>
    </div>
</template>

<script>
    import headerView from '../common/headerView'
    export default {
        name:'pay',
        components:{
			headerView
        }
        
    }
</script>


<style lang="stylus" scoped>

</style>


