const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // console.log("********req.session",req.session)
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("auth/login", {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated : req.session.isLoggedIn,
        errorMessage: message
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false,
      errorMessage: message
    });
  };
 

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email,(user)=>{
        if(!user) {
            req.flash('error','Inavlid email')
            return res.redirect('/login');
        }
        // returns password match or not in then block
         bcrypt.compare(password,user.password).then((doMatch)=>{
            if(doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save((err)=>{
                    return res.redirect('/');
                });
            }
            req.flash('error','Inavlid password')
            return res.redirect('/login');
         }).catch((err)=>{
             console.log(err);
             return res.redirect('/login');
         })

    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err)=>{
        return res.redirect('/');
    });
};


exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(password === confirmPassword){
        // encrypt the password
        bcrypt.hash(password, 12).then((hashedPass)=>{
            const user = new User(null,email, hashedPass);
            user.save();
            return res.redirect('/login');
        }) 

    }else {
        req.flash('error','Password confirmed passed does not match')
        return res.redirect('/signup');
    }
   
};

