const FriendShip = require('../models/friendship');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes')


        let users = await User.find({});

        let friendship = new Array();
        if (req.user) {
            let user = await User.findById(req.user._id);

            let list_friendId = new Array();
            list_friendId = user.friendship;

            list_friendId.forEach(async function (friendId) {
                let friend = await FriendShip.findById(friendId);
                let friendUser = await User.findById(friend.to_user);
                friendship.push(friendUser);
            })
        }

        setTimeout(function () {
            return res.render('home', {
                title: 'Home',
                posts: posts,
                all_users: users,
                friendship
            });
        }, 1000);


    } catch (err) {
        req.flash('error', err);
        return;
    }
}