const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use the google strategy
passport.use(new googleStrategy({
    clientID: "333195709464-3fa098bvp9s0sgm3mrm4olg5grtch9ff.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google strategy-passport', err); return; }

            console.log(profile);

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

