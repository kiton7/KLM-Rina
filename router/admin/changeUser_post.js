const user = require('../../module/user');

module.exports = async(req, res) => {
    var data = req.body;
    var users = await user.findOne({ uname: data.uname });
    if (users) {
        res.send('用户已存在');
    } else if (data.uid) {
        users = await user.updateOne({ _id: data.uid }, { uname: data.uname, upwd: data.upwd, role: data.role, topic: data.topic });
        if (users) {
            req.app.userInfo = users;
            res.send('用户更新成功');
        } else {
            res.send('用户更新失败');
        }
    } else if (data.uname) {
        users = await user.updateOne({ _id: req.app.locals.userInfo._id }, { uname: data.uname, upwd: data.upwd });
        if (users) {
            req.app.userInfo = users;
            res.send('用户更新成功');
        } else {
            res.send('用户更新失败');
        }
    } else {
        users = await user.updateOne({ _id: req.app.locals.userInfo._id }, { topic: data.topic });
        if (users) {
            req.app.userInfo = users;
            res.send('用户更新成功');
        } else {
            res.send('用户更新失败');
        }
    }
};