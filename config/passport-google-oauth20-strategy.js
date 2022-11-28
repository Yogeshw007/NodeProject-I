const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('../config/environment');

// tell passport to use the google strategy
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url,
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google strategy-passport', err); return; }

            if (user) {
                // if user found, set this user a req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log('error in google user strategy-passport', err); return; }
                    return done(null, user);
                });
            }
        });
    }
));