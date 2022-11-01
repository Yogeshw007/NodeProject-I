// Actions - profile, signup, signin
const User = require("../models/user");

module.exports.profile = function (req, res) {

    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: 'User profile',
            profile_user: user
        });
    });
}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        // req.body since the name & email is same as the req body values
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        });
    } else {
        return res.status('401').send('Unauthorized');
    }
}

module.exports.signUp = function (req, res) {
    //To redirect to profile page if already logged in
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('sign_up', {
        title: 'Sign up'
    });
}

module.exports.signIn = function (req, res) {
    //To redirect to profile page if already logged in 
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    } else {
        return res.render('sign_in', {
            title: 'Sign in page'
        });
    }
}

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        console.log('Redirect from password')
        return res.redirect('back');
    }

    try {
        let user = User.findOne({ email: req.body.email });

        if (!user) {
            User.create(req.body, function (err, user) {
                req.flash('success', 'User created');
                return res.redirect('/users/sign-in/');
            });
        } else {
            req.flash('error', 'User creation failed')
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error', err);
        return;
    }
}

module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully!!');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logOut(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out Successfully!!');
        return res.redirect('/');
    });
}