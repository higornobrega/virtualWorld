const md5 = require('md5');

module.exports.home = (application, req ,resp) => {
    resp.render('index' , {errors : {}});
}
module.exports.login = async (application, req , resp) => {

    let {
        nome,
        password
    } = req.body;

    const dataBase = application.config.dataBase;
    const clientModel =new application.src.models.ClientDAO(dataBase);

    password = md5(password);
    try {
        const user = await clientModel.getUser(nome);
        if (user.nome !== undefined && user.password === password) {
            req.session.authenticated= true;
            resp.redirect('/testando');
        }else {
            resp.render('index', {errors : [{msg : "User or password wrong"}]});
        }
    } catch (error) {
        resp.render('index', {errors : [{msg : "User or password wrong"}]});
    }
}