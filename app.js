const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const helmet = require('helmet'); // add secure headers
const compression = require('compression'); // compress data
const morgan = require('morgan'); // add logs
const fs = require('fs');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');


const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags: 'a'}
)

const app = express();
app.use(morgan('combined', {stream: accessLogStream}));
const csrfProtection = csrf();

app.set('view engine', 'ejs'); // allow use to set any value globally on express app

/**
 * set view location by default root/views but if we have diff name then mandatory to set
 */
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR)));
app.use(session({secret: process.env.SESSION_SECRETE_KEY , resave:false, saveUninitialized: false}))
/**
 * checks every post request for csrf token
 */
app.use(csrfProtection); // use after session
app.use(flash());

/**
 * required for security session should not be stolen
 * set for every request
 */
app.use((req,res,next)=> {
    res.locals.isAuthenticated = req.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});


/**
 * Use routes
 */
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

app.use(helmet()); // used to set secure headers
app.use(compression()); // compress the resources


app.listen(process.env.PORT || 3000);
