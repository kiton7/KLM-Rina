const user = require('../../module/user');

module.exports = async(req, res) => {
    var data = req.body;
    var users = await user.findOne({ uname: data.uname });
    if (users) {
        res.send('该用户已存在');
    } else {
        var newuser = await user.create({ uname: data.uname, upwd: data.upwd, role: data.role, topic: data.topic });
        if (newuser) {
            res.send('用户创建成功');
        } else {
            res.send('用户创建失败');
        };
    };
};