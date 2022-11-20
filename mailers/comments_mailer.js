const nodemailer = require('../config/nodemailer');

exports.newComment = function (comment) {
    console.log('inside new comment mailer');

    nodemailer.transporter.sendMail({
        from: 'yogeshbala908@gmail.com',
        to: comment.user.email,
        subject: 'New comment Published!',
        html: '<h1>Yup your comment is now published.</h1>'
    }, (err, info) => {
        if (err) {
            console.log('Error in sending email', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}