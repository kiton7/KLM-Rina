const pagesex = require('mongoose-sex-page');
const emoji = require('../../module/emoji');
const user = require('../../module/user');

module.exports = async(req, res) => {
    var choose = req.query.choose;
    var index = req.query.page;
    // console.log(choose);
    if (choose == 'all') {
        if (req.session.uname) {
            var emojis = await pagesex(emoji).find().page(index).size(4).display(1).exec();
            var users = await user.findOne({ _id: req.app.locals.userInfo._id });
            emojis.loveemojis = users.loveemoji;
            // console.log(emojis);
            res.send(emojis);
        } else {
            var emojis = await pagesex(emoji).find().page(index).size(4).display(1).exec();
            res.send(emojis);
        }
    } else if (choose == 'my') {
        if (req.session.uname) {
            // console.log(1);
            // console.log(req.app.locals.userInfo);
            var emojis = await pagesex(emoji).find({ auther: req.app.locals.userInfo._id }).page(index).size(4).display(1).exec();
            var users = await user.findOne({ _id: req.app.locals.userInfo._id });
            emojis.loveemojis = users.loveemoji;
            // console.log(emojis);
            res.send(emojis);
        } else {
            res.send('/admin/login');
        }
    } else if (choose == 'love') {
        if (req.session.uname) {
            var emojis = [];
            var users = await user.findOne({ _id: req.app.locals.userInfo._id });
            var pages = (index - 1) * 4;
            for (var i = 0; i < users.loveemoji.length; i++) {
                emojis[i] = await emoji.findOne({ _id: users.loveemoji[i] });
            }
            // console.log(emojis);
            var data = {};
            data.emojis = emojis.slice(pages, pages + 4);
            data.page = index;
            data.pages = Math.floor(users.loveemoji.length / 4) + 1;
            res.send(data);
        } else {
            res.send('/admin/login');
        }
    } else {
        console.log('error5');
        return false;
    }
    // var emojis = await pagesex(emoji).find().page(index).size(4).display(1).exec();
    // res.send(emojis);
}