const emoji = require('../../module/emoji');

module.exports = async(req, res) => {
    var data = req.body;
    var flag = await emoji.findOne({ ename: data.ename });
    if (flag) {
        res.send('该表情已存在');
    } else {
        var emojis = await emoji.create({ ename: data.ename, ledarr: data.ledarr, r: data.r, g: data.g, b: data.b, l: data.l, img: data.img, auther: req.app.locals.userInfo });
        // console.log(emojis);
        res.send('ok');
    }
}