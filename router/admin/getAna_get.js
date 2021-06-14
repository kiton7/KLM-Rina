const pagesex = require('mongoose-sex-page');
const ana = require('../../module/anm');
const user = require('../../module/user');

module.exports = async(req, res) => {
    var choose = req.query.choose;
    var index = req.query.page;
    // console.log(choose);
    if (choose == 'all') {
        if (req.session.uname) {
            var anas = await pagesex(ana).find().page(index).size(4).display(1).exec();
            var users = await user.findOne({ _id: req.app.locals.userInfo._id });
            anas.loveanimations = users.loveanimation;
            // console.log(anas);
            res.send(anas);
        } else {
            var anas = await pagesex(ana).find().page(index).size(4).display(1).exec();
            res.send(anas);
        }
    } else if (choose == 'my') {
        if (req.session.uname) {
            // console.log(1);
            // console.log(req.app.locals.userInfo);
            var anas = await pagesex(ana).find({ auther: req.app.locals.userInfo._id }).page(index).size(4).display(1).exec();
            var users = await user.findOne({ _id: req.app.locals.userInfo._id });
            anas.loveanimations = users.loveanimation;
            // console.log(anas);
            res.send(anas);
        } else {
            res.send('/admin/login');
        }
    } else if (choose == 'love') {
        if (req.session.uname) {
            var anas = [];
            var users = await user.findOne({ _id: req.app.locals.userInfo._id });
            var pages = (index - 1) * 4;
            for (var i = 0; i < users.loveanimation.length; i++) {
                anas[i] = await ana.findOne({ _id: users.loveanimation[i] });
            }
            // console.log(anas);
            var data = {};
            data.anas = anas.slice(pages, pages + 4);
            data.page = index;
            data.pages = Math.floor(users.loveanimation.length / 4) + 1;
            res.send(data);
        } else {
            res.send('/admin/login');
        }
    } else {
        console.log('error5');
        return false;
    }
}