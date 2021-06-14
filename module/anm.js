const mongoose = require('mongoose');

const Ana = mongoose.Schema({
    aname: {
        type: String,
        required: true
    },
    earr: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Emoji',
        required: true
    },
    tarr: {
        type: [Number],
        required: true
    },
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    looptimes: {
        type: Number,
        required: true
    }
})

const ana = mongoose.model('Ana', Ana);

module.exports = ana;