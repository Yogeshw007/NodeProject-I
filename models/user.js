const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

}, {
    // Creates the createdAt and updateAt info along with other fields
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;