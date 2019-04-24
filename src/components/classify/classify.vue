<template>
<div class="classify">
     <div class="lb_headWrap ">
                        <p class="lb_headWrap_return" >
                            <img class="lb_headWrap_return_img" src="../../../static/img/public/back@2x.png" />
                        </p>
                        <span class="font">商品分类</span>
                </div>
       <div class="list_wrap clearfloat">
			<div class="list_left">
				<ul>
					<li class="nav_item" v-for="(item,index) in listName.title" :key="index" :class="{active:index==indexx}" @click="cut(index)">{{item}}</li>
				</ul>
			</div>
			<div class="list_right">
				<ul>
					<li class="content_item " v-for="(item,index) in listName.listtt" :key="index" :class="{block:index==indexx}">
						<div class="content_top">
							<div class="top_title">热门品类</div>
							<div class="top_item_wrap clearfloat">
								<div class="top_item" v-for="(hot,index) in item.list.hot" :key="index">
									<a href="#">
										<img :src="hot.url"
											alt="">
										<div class="top_text">{{hot.name}}</div>
									</a>
								</div>
							</div>
						</div>
						<div class="content_bottom">
							<div class="bottom_title">热门单品</div>
							<div class="bottom_wrap">
								<div class="bottom_list clearfloat" v-for="(hotitem,index) in item.list.hotitem" :key="index">
									<a href="#">
										<div class="bottom_img">
											<img :src="hotitem.url" alt="">
										</div>
										<div class="bottom_content">
											<div class="content_title">{{hotitem.name}}</div>
											<div class="content_state">{{hotitem.hotS}}</div>
											<div class="content_info">
												<span class="price">¥&nbsp;{{hotitem.price}}</span>
												<span class="comment">评论{{hotitem.comment}}条</span>
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
					</li>
					
				</ul>
			</div>
		</div>         
</div>
    
</template>
<script>
export default {
    data(){
        return{
               /* 默认显示 */
               indexx:0,
                //  数据
                listName:{
					title:['上衣','裤装','鞋靴','包类/装备','服配','创意生活','个人护理'],
					listtt:[
                    {list:{
                       hot:[ 
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg'}
                           ],
                       hotitem:[
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg' ,price:'2899',comment:'1650',hotS:'热卖'}
                       ]
				  }},
				  {list:{
                       hot:[ 
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg'}
                           ],
                       hotitem:[
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg' ,price:'2899',comment:'1650',hotS:'热卖'}
                       ]
				  }},
				  {list:{
                       hot:[ 
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg'}
                           ],
                       hotitem:[
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg' ,price:'2899',comment:'1650',hotS:'热卖'}
                       ]
				  }},
				  {list:{
                       hot:[ 
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg'}
                           ],
                       hotitem:[
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg' ,price:'2899',comment:'1650',hotS:'热卖'}
                       ]
				  }},
				  {list:{
                       hot:[ 
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg'}
                           ],
                       hotitem:[
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg' ,price:'2899',comment:'1650',hotS:'热卖'}
                       ]
				  }},
				  {list:{
                       hot:[ 
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg'}
                           ],
                       hotitem:[
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg' ,price:'2899',comment:'1650',hotS:'热卖'}
                       ]
				  }},
				  {list:{
                       hot:[ 
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg'}
                           ],
                       hotitem:[
                    {id:1,name:'Dickies 西部牛仔印花短袖衬衫',url:'../../../static/img/classify/0000.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:2,name:'MADNESS MDNSFIFTH SHIRT',url:'../../../static/img/classify/0001.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:3,name:'Dickies 彩色手绘风格印花短袖衬衫',url:'../../../static/img/classify/0002.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:4,name:'DUSTY 满版印花短袖衬衫',url:'../../../static/img/classify/0003.jpg' ,price:'2899',comment:'1650',hotS:'热卖单品'},
                    {id:5,name:'Dickies 简约纯色长袖衬衫',url:'../../../static/img/classify/0004.jpg' ,price:'2899',comment:'1650',hotS:'热卖'},
                    {id:6,name:'SYS.tag LOGO图案短袖衬衫',url:'../../../static/img/classify/0005.jpg' ,price:'2899',comment:'1650',hotS:'热卖'}
                       ]
				  }},
					],
        }
        }
    },created(){
		console.log(this.listName)
	},methods: {
		cut(index){
			this.indexx=index;
		}
	},
}
</script>
<style scoped>
  @import "../../../static/css/classify/classify.css";
</style>
