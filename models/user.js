const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    avatar: {
        type: String
    },
    friendship: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FriendShip'
        }
    ]
}, {
    // Creates the createdAt and updateAt info along with other fields
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

//statics methods
userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

// To delete the password from the returned json when query
// userSchema.methods.toJSON = function () {
//     var userObject = this.toObject();
//     delete userObject.password;
//     return userObject;
// }

const User = mongoose.model('User', userSchema);

module.exports = User;