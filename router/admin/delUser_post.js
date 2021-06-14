const user = require('../../module/user');

module.exports = async(req, res) => {
    var data = req.body;
    console.log(data.id);
    var flag = await user.deleteOne({ _id: data.id });
    console.log(flag);
    if (flag) {
        res.send('ok');
    } else {
        res.send('error');
    }
}