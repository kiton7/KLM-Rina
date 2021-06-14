const ana = require('../../module/anm');

module.exports = async(req, res) => {
    var data = req.body;
    var flag = await ana.findOne({ aname: data.aname });
    if (flag) {
        res.send('该方案已存在');
    } else {
        var anas = await ana.create({ aname: data.aname, earr: data.earr, tarr: data.tarr, looptimes: data.looptimes, auther: req.app.locals.userInfo });
        // console.log(emojis);
        res.send('ok');
    }
}