const emoji = require('../../module/emoji');
const ana = require('../../module/anm');

module.exports = async(req, res) => {
    var data = req.body;
    if (data.earr) {
        var emojis = [];
        for (var i = 0; i < data.earr.length; i++) {
            emojis[i] = await emoji.findOne({ _id: data.earr[i] });
        }
        // console.log(emojis);
        res.send(emojis);
    } else {
        var anas = await ana.findOne({ _id: data.id }).populate('earr').lean();
        res.send(anas);
    }
}