<template>
	<div>
		<mt-button @click.native="handleClick">按钮</mt-button>
	</div>
</template>

<script>
	export default {
		/*存放-底部导航切换-的页面-容器*/
		name: "container",
		data(){
			return {
				
			}
		},
		  methods: {
			handleClick: function() {
				this.$toast('Hello world!')
			}
		}
	}
</script>

<style>
</style>