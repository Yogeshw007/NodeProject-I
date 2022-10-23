// Actions - profile, signup, signin

const User = require("../models/user");

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User profile'
    });
}


module.exports.signup = function (req, res) {
    return res.render('sign_up', {
        title: 'Sign up'
    });
}

module.exports.signin = function (req, res) {
    return res.render('sign_in', {
        title: 'Sign in'
    });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.find({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding user in signing up!'); return; };

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error in creating user while signing up!');
                    return;
                }

                return res.redirect('/users/sign-in/');
            });
        }

    });

}

module.exports.signIn = function (req, res) {
    //TODO later
}