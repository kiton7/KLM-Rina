const user = require('../../module/user');

module.exports = async(req, res) => {
    var data = req.body;
    if (req.session.uname) {
        var users = await user.findOne({ _id: req.app.locals.userInfo._id });
        // console.log(users);
        var loveemojis = users.loveemoji;
        var flags = loveemojis.indexOf(data.id);
        // console.log(flags);
        if (flags !== -1) {
            if (loveemojis.length == 1) {
                loveemojis = [];
                // console.log(newloveemoji);
                var newusers = await user.updateOne({ _id: req.app.locals.userInfo._id }, { loveemoji: loveemojis });
                // console.log(newusers);
                res.send('delok');
            } else {
                var newloveemoji = loveemojis.splice(flags, 1);
                // console.log(newloveemoji);
                var newusers = await user.updateOne({ _id: req.app.locals.userInfo._id }, { loveemoji: newloveemoji });
                // console.log(newusers);
                res.send('delok');
            }
        } else {
            loveemojis.push(data.id);
            // console.log(loveemojis);
            var newusers = await user.updateOne({ _id: req.app.locals.userInfo._id }, { loveemoji: loveemojis });
            // console.log(newusers);
            res.send('addok');
        }
    } else {
        res.send('/admin/login')
    }
}