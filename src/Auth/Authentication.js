class Auth {
    authVerify(req, resp, next) {
        if (req.session.authenticated == true) {
            next()
        }else {
            resp.redirect('/');
        }
    }
}

module.exports = () => Auth