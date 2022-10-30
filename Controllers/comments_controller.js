const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (err) {
            console.log('Error in finding the posts');
            return res.redirect('/');
        }

        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }, function (err, comment) {
            if (err) {
                console.log('Error in creating the comments', err);
            } else {
                // Extract the id from comment and push 
                post.comments.push(comment);
                // Save the final version of the data - Do on every update
                post.save();
            }

            res.redirect('/');
        });
    });
}