const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('../config/environment')

// Transporter defines email communication happens
// Transporter sends the emails
let transporter = nodeMailer.createTransport(env.smtp);

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