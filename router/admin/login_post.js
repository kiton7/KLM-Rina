const user = require('../../module/user');

module.exports = async(req, res) => {
    var data = req.body;
    var users = await user.findOne({ uname: data.uname });
    if (users == '') {
        res.send('error');
    } else {
        if (data.upwd == users.upwd) {
            req.session.uname = users.uname;
            req.app.locals.userInfo = users;
            if (users.role == 0) {
                res.send('/admin/home');
            } else {
                res.send('/');
            }
        } else {
            res.send('error');
        }
    }
};