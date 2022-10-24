const passport = require('passport');
const LocalStrategry = require('passport-local').Strategy;
const User = require('../models/user');

//Passport to use the strategy
//Authentication using passport
passport.use(new LocalStrategry({
    usernameField: 'email'
},
    //Callback function
    //Done is default to passport function its a callback - if req success / faliure
    function (email, password, done) {
        //  find a user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password')
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
        if (err) { console.log('Error in finding user --> Passport') };

        return done(null, user);
    });
});

module.exports = passport;