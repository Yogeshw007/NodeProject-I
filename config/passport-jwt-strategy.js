const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    // Bearer token will be available from the header
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // secret to encript and decript using the secret value
    secretOrKey: 'codiel'
}

// jwtPayLoad contains the payload of the user
passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
        if (err) { console.log('Error in finding user from JWT'); return; }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    })
}));

module.exports = passport;