module.exports = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login')
    }
    next(); // called next middleware  , which is mention in route file
}