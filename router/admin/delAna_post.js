const ana = require('../../module/anm');

module.exports = async(req, res) => {
    var data = req.body;
    console.log(data.id);
    var flag = await ana.deleteOne({ _id: data.id });
    console.log(flag);
    if (flag) {
        res.send('ok');
    } else {
        res.send('error');
    }
}