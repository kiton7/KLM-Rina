const emoji = require('../../module/emoji');
const user = require('../../module/user');


module.exports = async(req, res) => {
    var choose = req.query.choose;
    if (choose == 'all') {
        var emojis = await emoji.find();
        res.send(emojis);
    } else if (choose == 'my') {
        if (req.session.uname) {
            var emojis = await emoji.find({ auther: req.app.locals.userInfo._id });
            res.send(emojis);
        } else {
            res.send('/admin/login');
        }
    } else if (choose == 'love') {
        if (req.session.uname) {
            var users = await user.findOne({ _id: req.app.locals.userInfo._id });
            var emojis = [];
            // console.log(users);
            for (var i = 0; i < users.loveemoji.length; i++) {
                emojis[i] = await emoji.findOne({ _id: users.loveemoji[i] });
            }
            // console.log(emojis);
            res.send(emojis);
        } else {
            res.send('/admin/login');
        }
    } else {
        console.log('error5');
        return false;
    }
}