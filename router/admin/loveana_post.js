const user = require('../../module/user');

module.exports = async(req, res) => {
    var data = req.body;
    if (req.session.uname) {
        var users = await user.findOne({ _id: req.app.locals.userInfo._id });
        // console.log(users);
        var loveanimations = users.loveanimation;
        var flags = loveanimations.indexOf(data.id);
        // console.log(flags);
        if (flags !== -1) {
            if (loveanimations.length == 1) {
                loveanimations = [];
                var newusers = await user.updateOne({ _id: req.app.locals.userInfo._id }, { loveanimation: loveanimations });
                // console.log(newusers);
                res.send('delok');
            } else {
                var newloveanimation = loveanimations.splice(flags, 1);
                // console.log(newloveanimation);
                var newusers = await user.updateOne({ _id: req.app.locals.userInfo._id }, { loveanimation: newloveanimation });
                // console.log(newusers);
                res.send('delok');
            }
        } else {
            loveanimations.push(data.id);
            // console.log(loveanimations);
            var newusers = await user.updateOne({ _id: req.app.locals.userInfo._id }, { loveanimation: loveanimations });
            // console.log(newusers);
            res.send('addok');
        }
    } else {
        res.send('/admin/login')
    }
}