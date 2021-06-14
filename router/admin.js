const express = require('express');

const server = require('../mqtt');

const admin = express.Router();

const user = require('../module/user');
const emoji = require('../module/emoji');
const ana = require('../module/anm');

// 渲染登陆界面
admin.get('/login', require('./admin/login_get'));

// 处理登陆请求
admin.post('/login', require('./admin/login_post'));

// 渲染后台管理页面
admin.get('/home', require('./admin/home_get'));

// 处理添加用户请求
admin.post('/adduser', require('./admin/addUser_post'));

// 处理修改用户请求
admin.post('/changeuser', require('./admin/changeUser_post'));

// 处理获取表情请求
admin.get('/getemoji', require('./admin/getEmoji_get'));

// 处理获取所有表情请求
admin.get('/getallemoji', require('./admin/getAllEmoji_get'));

// 处理获取方案表情
admin.get('/getana', require('./admin/getAna_get'));

// 处理获取用户请求
admin.get('/getuser', require('./admin/getUser_get'));

// 处理退出登陆请求
admin.get('/logout', require('./admin/logout_get'));

// 处理删除用户请求
admin.post('/deluser', require('./admin/delUser_post'));

// 处理删除表情请求
admin.post('/delemoji', require('./admin/delEmoji_post'));

// 处理删除方案请求
admin.post('/delana', require('./admin/delAna_post'));

// 处理添加表情请求
admin.post('/addemoji', require('./admin/addEmoji_post'));

// 处理添加方案请求
admin.post('/addana', require('./admin/addAna_post'));

// 处理预览方案请求
admin.post('/showana', require('./admin/showAna_post'));

// 处理发送表情请求
admin.post('/sende', require('./admin/sendE_post'));

// 处理发送方案请求
admin.post('/senda', require('./admin/sendA_post'));

admin.post('/loveemoji', require('./admin/loveemoji_post'));

admin.post('/loveana', require('./admin/loveana_post'));

module.exports = admin;