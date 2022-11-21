const nodemailer = require('../config/nodemailer');

exports.forgotPassword = function (resetPasswordToken) {
    let htmlString = nodemailer.renderTemplate({ resetPasswordToken: resetPasswordToken }, '/passwordreset/forgot_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'yogeshbala908@gmail.com',
        to: resetPasswordToken.user.email,
        subject: `Forgot password email ${resetPasswordToken.user.email}`,
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending forgot password email', err);
            return;
        }

        console.log('Message sent - Forgot password', info);
        return;
    });
}