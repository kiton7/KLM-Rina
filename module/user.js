const mongoose = require('mongoose');

const User = mongoose.Schema({
    uname: {
        type: String,
        required: true,
    },
    upwd: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    loveemoji: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Emoji'
    },
    loveanimation: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ana'
    },
    role: {
        type: Number,
        enum: [0, 1],
        required: true
    }
});

const user = mongoose.model('User', User);

async function createAdmin() {
    var flag = await user.findOne({ uname: 'klm' });
    if (!flag) {
        user.create({ uname: 'klm', upwd: 'klm', topic: 'klm', role: 0 }).then(() => {
            console.log('创建成功');
        })
    };
}

createAdmin();

module.exports = user;