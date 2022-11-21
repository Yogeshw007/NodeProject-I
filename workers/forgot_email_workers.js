const queue = require('../config/kue');

const forgotPasswordMailer = require('../mailers/forgot_password_emailer');

queue.process('reset-password-emails', function (job, done) {
    console.log('Reset password emails worker is processing a job ', job.data);

    forgotPasswordMailer.forgotPassword(job.data);

    done();
});