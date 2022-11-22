const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

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

            // commentsMailer.newComment(comment);

            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log('Error in sending to the queue', err);
                    return;
                }

                console.log('job enqueued : ', job.id);
            });

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

module.exports.destroy = async function (req, res) {

    try {
        let comment = Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });

            req.flash('success', 'Deleted the comments :(');

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        commentId: req.params.id
                    },
                    message: 'Comment deleted!'
                });
            }
        }

        return res.redirect('back');
    } catch (err) {
        console.log('Error in adding comment for a post', err);
        req.flash('error', err);
        return;
    }
}