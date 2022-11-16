const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (err) {
            req.flash('error', 'Error in finding the posts');
            return res.redirect('/');
        }

        Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }, function (err, comment) {
            if (err) {
                req.flash('error', err);
            } else {
                // Extract the id from comment and push 
                post.comments.push(comment);

                // Save the final version of the data - Do on every update
                post.save();

                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            comment: comment,
                            user: req.user
                        }
                    });
                }

                req.flash('sucess', 'Comments created successfully!');
            }

            res.redirect('/');
        });
    });
}

module.exports.destroy = function (req, res) {

    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                req.flash('success', 'Deleted the comments :(');

                if (req.xhr) {
                    return res.status(200).json({
                        data: {
                            commentId: req.params.id
                        },
                        message: 'Comment deleted!'
                    });
                }

                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    });
}