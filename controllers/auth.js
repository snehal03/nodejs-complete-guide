exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated : req.session.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie','isLoggedIn=true;Max-Age=10')
    req.session.isLoggedIn = true;
    req.session.save((err)=>{
        res.redirect('/');
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err)=>{
        res.redirect('/');
    });
};

