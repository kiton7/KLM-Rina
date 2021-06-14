const guard = (req, res, next) => {
    // console.log(1);
    // 判断访问的是否是登陆界面
    if (req.url == '/login') {
        //是登陆界面就将请求交给下一个中间件
        next();
    } else {
        //不是登陆界面就进行判断登陆状态
        if (req.session.uname) {
            //登陆了就判断用户角色
            // 在登陆模块中， 登陆成功就回将当前用户信息添加到服务器对象locals属性下的userInfo自定义属性中， 属性值是用户信息对象
            if (req.app.locals.userInfo.role == '1') {
                res.redirect('/');
                return;
            }
            next();
        } else {
            //没登陆就重定向到登陆界面
            res.redirect('/admin/login');
        }
    }
}

module.exports = guard;