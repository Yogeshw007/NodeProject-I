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
        console.log('Redirect from password')
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding user in signing up!'); return; };

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('Error in creating user while signing up!', err);
                    return;
                }
                console.log('User created')
                return res.redirect('/users/sign-in/');
            });
        } else {
            console.log('User creation failed');
            return res.redirect('back');
        }

    });

}

module.exports.signIn = function (req, res) {
    return res.redirect('/');
}

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}