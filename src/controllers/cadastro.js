const md5 = require('md5');

module.exports.view = (application, req, resp) => {
    resp.render('cadastro');
}

module.exports.save = async (application, req, resp) => {

    const connection = application.config.dataBase;
    const customerModel = new application.src.models.ClientDAO(connection);

    let {
        nome,
        password
    } = req.body;

    password = md5(password);

    try {
        customerModel.insertUser({
            nome, 
            password
        }).then((result) => {
            resp.redirect('/');
        }).catch((err) => {
            resp.send(err)
        });
        
    } catch (error) {
        console.log(error.message)
    }
}