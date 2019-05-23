<template>
	<div class="return_top_box" v-show="scroll['show']"  @click.stop="scrollToTop()">
		<i class="return_top"></i>
	</div>
</template>

<script>
	/*回到顶部-组件*/
	export default {
		data() {
			return {
				/*滚动条*/
				scroll: {
					scrollTop: 0,
					show: false,
					/*滚动的元素*/
					eve: null,
				},
			}
		},
		methods: {
			/*滚动条距离*/
			handleScroll () {
				this.scroll['scrollTop'] = this.scroll['eve'].scrollTop;
//				this.scroll['scrollTop'] = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (this.scroll['scrollTop'] > 300) {
		          this.scroll['show'] = true;
		        }else {
		          this.scroll['show'] = false;
		        }
			},
			/*回到顶部*/
			scrollToTop() {
		        let timer = null, _that = this
		        //动画，使用requestAnimationFrame代替setInterval
		        cancelAnimationFrame(timer)
		        timer = requestAnimationFrame(function fn() {
			        if (_that.scroll['scrollTop'] > 0) {
			           _that.scroll['scrollTop'] -= 50
			            //然后修改这里实现动画滚动效果
			            _that.scroll['eve'].scrollTop = _that.scroll['scrollTop']
			            timer = requestAnimationFrame(fn)
			        } else {
			            cancelAnimationFrame(timer);
			        	_that.scroll['show'] = false
			        }
		        })
		    }
			
		},
		/*挂载后*/
		mounted(){
			/*滚动元素*/
			this.scroll['eve'] = document.getElementById('app');
			this.$nextTick(function () {
		        //修改事件监听-滚动条
		        this.scroll['eve'].addEventListener('scroll', this.handleScroll)
      		});

		},
		/*组件销毁后*/
		destroyed () {
			/*滚动条*/
			this.scroll['eve'].removeEventListener('scroll', this.handleScroll);
		}
		
	}
</script>

<style lang="stylus" scoped>
	.return_top_box {
		position: fixed;
		right: 60px;
		bottom: 140px;
		z-index: 1;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		font-size: 16px;
		background-color: #fff;
	}
	.return_top {
		display: block;
		width: 100%;
		height: 100%;
		background: url(/static/img/public/return_top_icon.png) no-repeat 0 0;
		background-size: 100% 100%;
	}
</style>