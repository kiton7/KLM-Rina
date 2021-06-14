const emoji = require('../../module/emoji');
const server = require('../../mqtt');

module.exports = async(req, res) => {
    var data = req.body;
    var emojis = await emoji.findOne({ _id: data.id });
    emojis.img = '';
    if (emojis) {
        if (req.session.uname) {
            var message = {
                topic: req.app.locals.userInfo.topic,
                payload: JSON.stringify(emojis),
                qos: 0,
                retain: false
            };
            server.publish(message, function() {
                console.log('done!');
            });
            res.send('ok');
        } else {
            res.send('/admin/login')
        }
    }
}