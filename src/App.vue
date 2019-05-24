<template>
  <div id="app">
  	<!--视图渲染-->
    <router-view/>
		<!-- loading 加载 -->
		<Loading v-if="loading"></Loading>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Loading from '@/components/common/Loading'
export default {
	name: 'App',
	computed:{
    ...mapState([
      'loading'
    ])
  },
  components:{
    Loading
  }
}
</script>

<style>
     /* 公共样式 */
    @import "../static/css/public/public.css";
    /* 公共头部 */
    @import "../static/css/public/header.css";
* {
		margin: 0;
		padding: 0;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		-webkit-tap-highlight-color: transparent;
	}
#app {
	position: relative;
  width: 100%;
  height: 100vh;
}
	.van-dialog {
		border-radius: 15px;
	}
	.van-dialog__message {
		padding: 55px 25px;
		line-height: 55px;
	}
	.van-button {
		height: 85px;
	}
</style>
