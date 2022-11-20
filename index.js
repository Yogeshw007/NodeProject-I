const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// MongoDB
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');

//cookie parser
const cookieParser = require('cookie-parser');

//passport middleware
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth20-strategy');
// const nodemailers = require('./config/nodemailer');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

// Flash helps to show notification
const flash = require('connect-flash');

// Adding middleware to transfer the flash object to res
const customMware = require('./config/middleware');

//Using the sass as first, to pre compile the scss file before the routes render the views
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true, // to show errors when there is a compilation error during the conversion to css
    outputStyle: 'extended', // to show the css in multiple lines, compressed will show in single line
    prefix: '/css' // prefix directory where it can find the css files
}));

// Middlware - to read the req query, body & params
app.use(express.urlencoded());

// Set the cookie parser
app.use(cookieParser());

//Set the static file path - When using the assets directly give the sub folders like css/layout.css
app.use(express.static('./assets'));
// make the uploads available in the browse
app.use('/uploads', express.static(__dirname + '/uploads'));

// Use the layouts before the routes
app.use(expressLayouts);

//Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Use in the order to work properly
//To create a session cookie
//To store the logged in user's information in an encrypted format in the cookie
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codiel',
    // TODO change the secret before deploy in production
    secret: 'blahsomething',
    saveUninitialized: false, //Session is not initialized - User is not logged in then extra information is not required to save in cookie
    resave: false, //Save again the cookie
    cookie: {
        maxAge: 1000 * 60 * 100
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});