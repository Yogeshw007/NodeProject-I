const mongoose = require('mongoose');

const resetPassSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken: {
        type: String,
        required: true
    },
    is_valid: {
        type: Boolean,
        required: true,
    }
});

const ResetPass = mongoose.model('ResetPass', resetPassSchema);

module.exports = ResetPass;