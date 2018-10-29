module.exports = (application) => {
    const auth = new application.src.Auth.Authentication;

    application.route('/')
        .get((req, resp) => {
            application.src.controllers.index.home(application, req, resp);
        })
    
    application.route('/authentication')
        .post((req, resp) => {
            application.src.controllers.index.login(application, req , resp);
        })
        .get((req, resp) => {
            resp.redirect('/');
        })

    application.route('/cadastro')
        .get((req, resp) => {
            application.src.controllers.cadastro.view(application, req, resp);
        })
        .post((req, resp) => {
            application.src.controllers.cadastro.save(application, req, resp);
        })

    application.route('/testando')
        .get(auth.authVerify, (req, resp) => {
            resp.send(req.session.userData);
        })

}