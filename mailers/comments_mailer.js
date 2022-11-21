const nodemailer = require('../config/nodemailer');

exports.newComment = function (comment) {
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'yogeshbala908@gmail.com',
        to: comment.user.email,
        subject: 'New comment Published!',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in sending email', err);
            return;
        }

        // console.log('Message sent', info);
        return;
    });
}
