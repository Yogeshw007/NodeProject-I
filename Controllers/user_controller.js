// Actions - profile, signup, signin

const User = require("../models/user");

module.exports.signUp = function (req, res) {
    return res.render('sign_up', {
        title: 'Sign up'
    });
}

module.exports.signIn = function (req, res) {
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

module.exports.createSession = function (req, res) {
    //steps to authenticate
    //find the user
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding user in signing in!') };

        //handle user found
        if (user) {

            //handle password which doesn't match
            if (user.password != req.body.password) {
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            //handle user not found
            return res.redirect('back');
        }
    });
}

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                return res.render('user_profile', {
                    title: 'User profile',
                    user: user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
        });
    } else {
        return res.redirect('/users/sign-in');
    }
}

module.exports.signOut = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}