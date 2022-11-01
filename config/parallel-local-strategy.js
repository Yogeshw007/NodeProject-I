const passport = require('passport');
const LocalStrategry = require('passport-local').Strategy;
const User = require('../models/user');

//Passport to use the strategy
//Authentication using passport
passport.use(new LocalStrategry({
    usernameField: 'email',
    // passReqToCallback to take the req in the arguments which is used ot add the falsh messages here
    passReqToCallback: true
},
    //Callback function
    //Done is default to passport function its a callback - if req success / faliure
    function (req, email, password, done) {
        //  find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error', 'Error in finding user-- > Passport');
                // console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/Password');
                // console.log('Invalid Username/Password');
                // null represents no error since user found, authentication is false due to invalid information
                return done(null, false);
            }
            // User is found
            return done(null, user);
        });
    }
));

//Serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function (user, done) {
    //Encrypted user id stored in cookie will be sent in the request
    done(null, user.id);
});

//Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            req.flash('error', 'Error in finding user --> Passport');
            // console.log('Error in finding user --> Passport') 
        };

        return done(null, user);
    });
});

passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass on the request to next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in 
    return res.redirect('/users/sign-in');
}

// Middleware uses req, res, next
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to locals for the view
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;