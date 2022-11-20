const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Transporter defines email communication happens
// Transporter sends the emails
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    // Domain to send emails for developers
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'yogeshbala908',
        pass: 'aivnlgaeasadxaks'
    }
});

// Send the email as HTML
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('Error in rendering template');
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}