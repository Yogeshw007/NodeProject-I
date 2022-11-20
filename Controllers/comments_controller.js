const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            await post.comments.push(comment);
            await post.save();

            // comment = await comment.populate('user', 'name email').execPopulate();
            await Comment.populate(comment, { path: 'user' });

            commentsMailer.newComment(comment);
            console.log(req.xhr);
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', 'Comment published!');

            res.redirect('/');
        } else {
            console.log('Post not found to add comment');
            return;

        }
    } catch (err) {
        console.log('Error in adding comment for a post', err);
        req.flash('error', err);
        return;
    }
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