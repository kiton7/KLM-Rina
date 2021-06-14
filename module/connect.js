const mongoose = require('mongoose');

mongoose.connect('mongodb://linai:linai@localhost/linai', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('数据库连接成功');
}).catch((err) => {
    console.log(err, '数据库连接失败');
});