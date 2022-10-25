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
const passportLocal = require('./config/parallel-local-strategy');

const MongoStore = require('connect-mongo');

// Middlware - to read the req query, body & params
app.use(express.urlencoded());

// Set the cookie parser
app.use(cookieParser());

//Set the static file path - When using the assets directly give the sub folders like css/layout.css
app.use(express.static('./assets'));

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

// use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});