//接口配置文件
export default {
    // assToken: {
    //   askToken: 'user/login' // 判断token是否过期
    // },
    getnewToken: {
        /*
        重新去请求登录接口 user/login
            参数：
            user_id
            token
            mobile
            token1 	md5(user_id+参数mobile参数+token参数)
        */
        askToken: 'user/login'  //重新去请求登录接口  //新token
        
    }
}