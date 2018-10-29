const jwt = require('jsonwebtoken');
class Auth {
    async authVerify(req, resp, next) {
        if (typeof req.session.authenticated !== "undefined" ||
            req.session.authenticated !== null) {
            try {
                const token = req.session.authenticated;
                const data = await jwt.verify(token, process.env.authSecret);
                req.session.userData = data;
                next()
            } catch (error) {
                resp.send("Usuário não autenticado");
            }
        } else {
            resp.redirect('/');
        }
    }

    async signToken(user) {
        const {
            nome,
            password
        } = user;
        try {
            const token = await jwt.sign({
                nome,
                password
            }, process.env.authSecret);
            return token;
        } catch (error) {
            resp.send(error);
        }

    }
}

module.exports = () => Auth