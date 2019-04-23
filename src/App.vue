<template>
  <div id="app">
  	<!--视图渲染-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
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
  overflow-y: scroll;
}
</style>
