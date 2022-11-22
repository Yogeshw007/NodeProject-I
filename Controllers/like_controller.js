const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLikes = async function (req, res) {
    try {
        // like/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if (req.query.type === 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user
        });

        // If a like is already exists delete the like
        if (existingLike) {
            await likeable.likes.pull(existingLike._id);
            await likeable.save();

            await existingLike.remove();
            deleted = true;
        } else {
            // Else add a new like
            let newLike = await Like.create({
                likeable: req.query.id,
                user: req.user,
                onModel: req.query.type
            });

            await likeable.likes.push(newLike._id);
            await likeable.save();
        }

        return res.json(200, {
            message: 'Request successful',
            data: {
                deleted: deleted,
                count: likeable.likes.length
            }
        })
    } catch (err) {
        console.log(err);
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}