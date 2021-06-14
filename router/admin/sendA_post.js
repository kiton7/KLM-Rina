const ana = require('../../module/anm');
const server = require('../../mqtt');

module.exports = async(req, res) => {
    var data = req.body;
    var anas = await ana.findOne({ _id: data.id }).populate('earr').lean();
    if (anas) {
        if (req.session.uname) {
            for (var i = 0; i < anas.earr.length; i++) {
                anas.earr[i].img = '';
                anas.earr[i].auther = '';
            }
            for (var i = 0; i < anas.looptimes; i++) {
                var time = 0;

                async function setLed(time, i) {
                    setTimeout(function() {
                        var message = {
                            topic: req.app.locals.userInfo.topic,
                            payload: JSON.stringify(anas.earr[i]),
                            qos: 0,
                            retain: false
                        };
                        server.publish(message, function() {
                            console.log('done!');
                        });
                    }, time)
                };
                for (var i = 0; i < anas.earr.length; i++) {
                    if (i < anas.earr.length - 1) {
                        var q = i + 1
                    } else {
                        q = i;
                    }
                    await setLed(time, i);
                    time += anas.tarr[i];
                }
            };
            var alltime = 0;
            for (var i = 0; i < anas.tarr.length; i++) {
                alltime = alltime + anas.tarr[i];
            };
            var senddata = {};
            senddata.msg = 'ok';
            senddata.alltime = alltime;
            res.send(senddata);
            // var message = {
            //     topic: req.app.locals.userInfo.topic,
            //     payload: JSON.stringify(anas),
            //     qos: 0,
            //     retain: false
            // };
            // server.publish(message, function() {
            //     console.log('done!');
            // });
            // res.send('ok');
        } else {
            res.send('/admin/login')
        }
    }
}