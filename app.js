// 引入系统路径处理模块path
const path = require('path');

// 引入第三方模块express框架
const express = require('express');

// 引入第三方模块express-session
const session = require('express-session')

// 引入第三方模块body-parse
const bodyParser = require('body-parser');

// 利用引入express框架返回的方法创建服务器对象
const app = express();

// 连接数据库
require('./module/connect');

// 引入admin路由
const admin = require('./router/admin');

// 设置服务器用第三方模块express-art-template处理后缀名为html的模板
app.engine('html', require('express-art-template'));

// 设置模板文件路径
app.set('views', path.join(__dirname, 'views'));

// 设置模板文件不写后缀名默认拼接的后缀名
app.set('view engine', 'html');

// session设置
app.use(session({ secret: 'secret key', saveUninitialized: true, resave: true }));

// 设置静态文件目录
app.use(express.static('./public'));

// 设置post信息的处理方式
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 访问admin路由的请求拦截
const guard = require('./middleware/loginguard');
app.use('/admin/home', guard);

// 设置admin路由
app.use('/admin', admin);

// 渲染首页
app.get('/', (req, res) => {
    res.render('index')
});

// 监听7788端口
app.listen(7788, () => {
    console.log('服务器启动成功');
});