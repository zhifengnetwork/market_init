/*存储状态(管理vue的状态)*/
import Vue from 'vue';
/*帮助 vue管理数据的 插件*/
import Vuex from 'vuex'
/*引入 路由*/
import router from 'vue-router';

/*vue 加载 vuex 插件*/
Vue.use(Vuex);
//Vue.use(router);

/**
 * 深克隆，把引用数据类型，分解成基础类型(克隆)。
 * 第一个参数:数据，第二个参数:数组或对象(想转换的类型)。
 * **/
function clones(_type, _memory) {
	var newMemory = null;
	/*判断传过来的数据类型*/
	if(_type instanceof Array) {
		newMemory = _memory || [];
	}else {
		newMemory = _memory || {}
	}
	for(var x in _type) {
		/*引入数据类型的typeof为object*/
		if(typeof _type[x] == "object") {
			newMemory[x] = (_type[x].constructor == Array) ? [] : {};
			clones(_type[x], newMemory[x]); //递归
		}else {
			/*数组赋值*/
			newMemory[x] = _type[x];
		}
	}
	return newMemory;
}
/*初始化数据库=>创建 参数 表格*/
function initDatabase(_dbName) {
	/*初始化数据库*/
	var db = getCurrentDb();
	if(!db) {
		alert("您的浏览器不支持HTML5本地数据库");
		return;
	}
	/*启动一个事务，并设置回调函数*/
	db.transaction(function(trans) {
		//执行创建表的Sql脚本
		/*创建userData的表格=>userName、userPass、mailbox、invitationCode(的字段)*/
		trans.executeSql("create table if not exists "+ _dbName +"(userName text null,userPass text null,mailbox text null,invitationCode text null,verificationCode text null)", [], function(trans, result) {
			console.log('直接创建表格1:',trans,result);
		}, function(trans, message) {
			//消息的回调函数alert(message);});
			console.log('直接创建表格2:',trans,message);
		}, function(trans, result) {
			console.log('直接创建表格2:',trans,result);
		}, function(trans, message) {
			console.log('直接创建表格2:',trans,message)	;
		});
	});
};

function getCurrentDb() {
	//打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小（单位是kb）。
	//如果数据库不存在那么创建之
	var db = openDatabase("userDb", "1.0", "记录用户数据！", 1024 * 1024);
	return db;
}

/*(读取)数据库的数据*/
function readUserData() {
	/*初始化=>数据库*/
	var db = getCurrentDb();
	/*操作数据库=> 表格*/
	db.transaction(function(trans) {
		/*读取数据库=> 数据*/
		trans.executeSql("select * from userData ", [], 
		function(ts, data) {
			/**循环表格数据，是否有重复
			 * .rows.length => 获取表格的行数。
			 * **/
			for(var h = 0; h < data.rows.length; h++) {
			/*获取某行数据的json对象*/
//				console.log(data.rows.item(h)); 
				state.userAllData[h] = data.rows.item(h);
			}
//			console.log('用户表格的所有数据:',state.userAllData);
			
		}, function(ts, message) {
			alert(message);
		});
	});
}

/*(写入)把用户信息=>插入数据库=>表格*/
function insertDataFun(_userName, _userPass, _mailbox, _invitationCode){
	var db = getCurrentDb();
	//执行sql脚本，插入数据
	/*写死=>找回密码=>邮箱验证码=>'hlb999'*/
	db.transaction(function(trans) {
		trans.executeSql("insert into userData(userName,userPass,mailbox,invitationCode,verificationCode) values(?,?,?,?,?) ", [_userName,_userPass,_mailbox,_invitationCode,'hlb999'], function(ts, data) {
			
		}, function(ts, message) {
			console.log('插入数据库=>表格',message);
		});
	});
}
/**
 * 删除字段--函数
 * 参数1=>表名;
 * 参数2=>查找那个字段--删除;
 * 参数3=>数组形式.如: ['字段下的value']
 * **/
function delDataFun(_tableName,_delField,_delArr){
	var db = getCurrentDb();
	//执行sql脚本，删除userData对应的数据
	db.transaction(function(trans) {
		trans.executeSql("delete from "+ _tableName +" where "+ _delField +"=?",_delArr,function(ts, data) {
			console.log(data);
		}, function(ts, message) {
			console.log('删除=>表格的某个字段',message);
		});
	});
	console.log('删除:'+_tableName+'表格,'+_delField+'字段,'+_delArr+'数据=>函数！');
}
/**
 * 删除表格--函数
 * 参数1: 删除表的名字;
 * **/
function delTableFun(_tableName){
	var db = getCurrentDb();
	//执行sql脚本，删除表格（userData）
	db.transaction(function(trans) {
		trans.executeSql("drop table "+_tableName,[],function(ts, data) {
			console.log(data);
		}, function(ts, message) {
			console.log('删除=>表格',message);
		});
	});
	console.log('删除:'+_tableName+'表格');
}
/**
 * 改表格-某个字段的数据--函数
 * 参数1: 表名;
 * 参数2: （修改条件）字段名;
 * 参数3: （修改的）字段名;
 * 参数4: 数组形式=>如: ['字段下的value']
 * **/
function changeFieldFun(_tableName,_conditionField,_changeField,_changeArr){
	var db = getCurrentDb();
	//执行sql脚本，删除表格（userData）
	db.transaction(function(trans) {
//		update banji set num
		trans.executeSql("update "+_tableName +" set userName="+ _conditionField+ " " + _changeField +"=?",_changeArr,function(ts, data) {
			console.log(data);
		}, function(ts, message) {
			console.log('删除=>表格',message);
		});
	});
	console.log('修改:'+_tableName+'表格,'+_fieldName+'字段,'+_changeArr+'数据=>函数！');
	
}

/*存储数据=>状态*/
const state = {
	/*数据库=>用户所有数据*/
	userAllData: [],
	/*请求loading(默认:false)*/
	loadingState: false,
	/*input获取、失去焦点=>隐藏元素(默认:true)*/
	inpShowEle: true,
	/*控制(提示对话框-弹框)=>显示，隐藏，默认:false*/
	showTAlert: false,
	/*渲染文本和需要跳转路径（提示对话框）*/
	tipsData: {
		/*提示文本*/
		tipsText: '',
		/*跳转的路径(路由切换)*/
		tipsUrl: '',
	},
}

/*专门修改state 里面的数据（同步操作）*/
const mutations = {
	/*创建||链接数据库、把数据库里的数据-更新-到本地*/
	createDb(state){
		/*初始化数据库 => 创建userData表格*/
		initDatabase('userData');
		/*在查询一遍 => 更新本地数据！*/
		readUserData();
		
		/*删除userData表格中的=>'userName'字段=>查找admin1的数据=>删除*/
//		delDataFun('userData','userName',['admin1']);
		/*删除表格userData表格*/
//		delTableFun('userData');
		
	},
	/**(注册)
	 * 用户数据=>插入数据库=>表格
	 * 第一个参数:vuex的状态（必须的）；
	 * 第二参数: 传过来的参数。
	 * **/
	insertData(state,_userObj){
		/*保存指向*/
		var that = this;
		console.log('vuex',_userObj);
		console.log('数据库=>本地存储数据Vuex:',state.userAllData[0]);
		/*重新组成=>tips中的数据（注册）:默认*/
		var registerTips = {
			tipsText: '账号已存在，请重新注册！',
			tipsUrl: '',
		};
		/*循环，看有没有重复的账号*/
		for(var i=0;i<state['userAllData'].length;i++){
			/*运行进if(){}*/
			if(state['userAllData'][i]['userName'] == _userObj['userName']){
				/*loading => 隐藏*/
				state.loadingState = false;
				/*调用当前的vuex的方法(提示对话框)*/
				that.commit('changeTipsData',registerTips);
				/*显示=>对话框(提示)*/
				state.showTAlert = true;
				return;
			}
		}
		
		/*写入数据库=>对应的表格中*/
		insertDataFun(_userObj['userName'], _userObj['passOne'], _userObj['mailbox'], _userObj['invitationCode']);
		
		/*模拟ajax请求=>loading*/
		setTimeout(function(){
			/*loading => 隐藏*/
			state.loadingState = false;
			/*把传过来的数据丢到=>registerTips*/
			registerTips['tipsText'] = _userObj['tipsText'];
			registerTips['tipsUrl'] = _userObj['tipsUrl'];
			/*调用当前的vuex的方法(提示对话框)*/
			that.commit('changeTipsData',registerTips);
			/*显示=>对话框(提示)*/
			state.showTAlert = true;
		},1000)
		
		/*在查询一遍 => 更新本地数据！*/
		readUserData();
	},
	/**(找回密码) 
	 * 通过=>vuex本地存储的信息=>找回密码
	 * **/
	retrievePass(state,_retUserData){
		/*保存指向*/
		var that = this;
		console.log('找回密码(vuex):',_retUserData);
		/*重新组成=>tips中的数据（找回密码）*/
		var tipsFoObj = {
			tipsText: '账号不存在，找回密码失败！',
			tipsUrl: '',
		}
		/*需要对比数据库的验证码*/
		/*循环本地数据=>查找=>是否存在该用户=>修改密码*/
		for(var s=0;s<state['userAllData'].length;s++){
			if(state['userAllData'][s]['userName'] == _retUserData['userName']){
				console.log(6666,_retUserData['pass']);
				/*更新--本地的数据*/
				state['userAllData'][s]['userPass'] = _retUserData['pass'];
				/*更新--数据库里面的数据*/
				changeFieldFun('userData',_retUserData['userName'],'userPass',[_retUserData['pass']]);
				/*定时器模拟=>ajax*/
				setTimeout(function(){
					/*loading => 隐藏*/
					state.loadingState = false;
					/*提示-对话框内容*/
					tipsFoObj['tipsText'] = _retUserData['tipsText'];
					tipsFoObj['tipsUrl'] = _retUserData['tipsUrl'];
					/*调用当前的vuex的方法*/
					that.commit('changeTipsData',tipsFoObj);
					/*显示=>对话框(提示)*/
					state.showTAlert = true;
					console.log('找回密码成功！');
				},1000)
				return;
			}
			
		}
		
		
		/*定时器模拟=>ajax*/
		setTimeout(function(){
			/*loading => 隐藏*/
			state.loadingState = false;
			/*调用当前的vuex的方法*/
			that.commit('changeTipsData',tipsFoObj);
			/*显示=>对话框(提示)*/
			state.showTAlert = true;
			console.log('账号不存在，找回密码失败！');
		},1000)
		
	},
	/**(登陆)
	 * 查询，数据库是否-用户输入-账号和密码
	 * 参数1:vuex的状态数据（必须是第一个参数）。
	 * 参数2:校验的数据。
	 * 参数3:（数组形式）['提示文字','跳转的路径（路由跳转）']
	 * **/
	checkUserData(state,_landData){
		/*保存指向*/
		var that = this;
		/*重新组成=>tips中的数据*/
		var tipsObj = {
			tipsText: '账号或密码不正确！',
			tipsUrl: '',
		}
		for(var r=0;r<state['userAllData'].length;r++){
			if(state['userAllData'][r]['userName'] == _landData['userName'] && state['userAllData'][r]['userPass'] == _landData['userPass']){
				console.log('vuex，登陆成功');
				console.log('成功=>弹框的text：'+tipsObj['tipsText'],',跳转url:'+tipsObj['tipsUrl']);
				/*定时器模拟=>ajax*/
				setTimeout(function(){
					/*loading => 隐藏*/
					state.loadingState = false;
					/*提示-对话框内容*/
					tipsObj['tipsText'] = _landData['tipsText'];
					tipsObj['tipsUrl'] = _landData['tipsUrl'];
					/*调用当前的vuex的方法*/
					that.commit('changeTipsData',tipsObj);
					/*显示=>对话框(提示)*/
					state.showTAlert = true;
				},1000)
				return;
			}
		}
		
		console.log('失败=>弹框的text：'+tipsObj['tipsText'],',跳转url:'+tipsObj['tipsUrl']);
		/*定时器模拟=>ajax*/
		setTimeout(function(){
			/*loading => 隐藏*/
			state.loadingState = false;
			/*调用当前的vuex的方法（账号或密码不正确！）*/
			that.commit('changeTipsData',tipsObj);
			/*显示=>对话框(提示)*/
			state.showTAlert = true;
		},1000);
	
	},
	
	/*<< public*/
	/*对话框（提示）=>确认按钮*/
	tipsAlertFun(state){
		/*隐藏=>对话框(提示)*/
		state.showTAlert = false;
		console.log('提示弹框=>确认','跳转路径:'+state.tipsData['tipsUrl']);
		/*在tipsAlert.vue中-切换路由*/
	},
	/*修改-对话框（提示）的类容=>（更改vuex中state中的数据状态）*/
	changeTipsData(state,_tipsObj){
		console.log('提示弹框的内容:',_tipsObj);
		/*提示文本*/
		state.tipsData['tipsText'] = _tipsObj['tipsText'];
		/*跳转的路径(路由切换)*/
		state.tipsData['tipsUrl'] = _tipsObj['tipsUrl'];
	},
	
	/*监听input => 获取焦点*/
	obtainInputX(state){
		/*更改state里的状态*/
		state.inpShowEle = true;
	},
	/*监听input => 失去焦点*/
	loseInputX(state){
		state.inpShowEle = false;
	},
	
	/* public >>*/
	
	
}

/*暴露 实例化 vuex (数据管理商店||仓库)*/
export default new Vuex.Store({
	/*注册*/
	state,
	mutations,
})
