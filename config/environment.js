const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        // Domain to send emails for developers
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'yogeshbala908',
            pass: 'aivnlgaeasadxaks'
        }
    },
    google_client_id: "333195709464-3fa098bvp9s0sgm3mrm4olg5grtch9ff.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codiel',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
};

const production = {
    name: 'production',
    asset_path: process.env.CODIEL_ASSET_PATH,
    session_cookie_key: process.env.CODIEL_SESSION_COOKIE_KEY,
    db: process.env.CODIEL_DB,
    smtp: {
        service: 'gmail',
        // Domain to send emails for developers
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODIEL_SMTP_USER,
            pass: process.env.CODIEL_SMTP_PASS
        }
    },
    google_client_id: process.env.CODIEL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODIEL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODIEL_GOOGLE_CLIENT_SECRET,
    jwt_secret: process.env.CODIEL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
};

console.log('***************', process.env.CODIEL_ENVIRONMENT);

module.exports = eval(process.env.CODIEL_ENVIRONMENT) == undefined ? development : eval(process.env.CODIEL_ENVIRONMENT);