const pagesex = require('mongoose-sex-page');
const user = require('../../module/user');

module.exports = async(req, res) => {
    var index = req.query.page
    var users = await pagesex(user).find().page(index).size(4).display(1).exec();
    res.send(users);
}