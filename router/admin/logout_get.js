module.exports = (req, res) => {
    req.session.destroy();
    res.clearCookie('uname');
    req.app.locals.userInfo = null;
    res.status(301).redirect('/admin/login');
}