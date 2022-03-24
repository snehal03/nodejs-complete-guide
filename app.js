const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs'); // allow use to set any value globally on express app

/**
 * set view location by default root/views but if we have diff name then mandatory to set
 */
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret' , resave:false, saveUninitialized: false}))

/**
 * Use routes
 */
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(3000);
