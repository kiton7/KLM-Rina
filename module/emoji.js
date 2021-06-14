const mongoose = require('mongoose');

const Emoji = mongoose.Schema({
    ename: {
        type: String,
        required: true
    },
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ledarr: {
        type: [Number],
        required: true
    },
    r: {
        type: Number,
        required: true
    },
    g: {
        type: Number,
        required: true
    },
    b: {
        type: Number,
        required: true
    },
    l: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

const emoji = mongoose.model('Emoji', Emoji);

module.exports = emoji;