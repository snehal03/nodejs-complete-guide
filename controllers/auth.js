const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req, res, next) => {
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
            transporter.sendMail({
                to: email,
                from: 'snehaldhane03@gmail.com',
                subject: 'Signup Successfully',
                message: '<h1>You have signed up successfully</h1>'
            })
            return res.redirect('/login');
        }) 

    }else {
        req.flash('error','Password confirmed passed does not match')
        return res.redirect('/signup');
    }
   
};


exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/reset', {
      path: '/reset',
      pageTitle: 'Reset Password',
      errorMessage: message
    });
  };

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32,(err,buffer)=>{
        if(err) {
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findByEmail(req.body.email,(user)=>{
            if(!user){
                return res.redirect('/reset');
            }
            /* const u = new User(user._id, req.body.email , user.password );
            u.resetToken = token ;
            u.resetTokenExpiration = Date.now() +  3600000 ;
            u.save(); */
            transporter.sendMail({
                to: req.body.email,
                from: 'snehaldhane03@gmail.com',
                subject: 'Password Reset',
                message: `<p>Your Password reset link </p>
                <p>Click here <a href="http://localhost:3000/reset/${token}">link</a> to reset password</p>
                `
            })
            return res.redirect('/login')
        });
    })
};
