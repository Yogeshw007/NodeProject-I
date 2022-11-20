const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        console.log(user);
        console.log(user.password != req.body.password);

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: 'Invalid username or password'
            });
        }

        return res.status(200).json({
            message: 'Sign in is successful, here is your token, please keep it safe.',
            data: {
                token: jwt.sign(user.toJSON(), 'codiel', { expiresIn: '1000000' })
            }
        })
    } catch (err) {
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}