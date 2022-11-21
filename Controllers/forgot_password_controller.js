let ResetPasswordToken = require('../models/resetpasswordtoken');

module.exports.forgotPassword = function (req, res) {
    return res.render('forgot_password', {
        title: 'Forgot password email'
    });
}

module.exports.resetPassword = async function (req, res) {
    let resetPasswordToken = await ResetPasswordToken.findOne({ accessToken: req.query.accessToken });

    return res.render('reset_password', {
        title: 'Reset password',
        accessToken: req.query.accessToken,
        is_valid: resetPasswordToken.is_valid
    });
}