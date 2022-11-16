const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,
                    user: req.user
                },
                message: 'Post created!'
            });
        }

        req.flash('success', 'Post created Successfully!')
    } catch (err) {
        req.flash('error', err);
    }

    return res.redirect('back');
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            await post.remove();
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Deleted the comments :(');
        } else {
            req.flash('error', 'Comments not deleted unauthorized :(');
        }
    } catch (err) {
        req.flash('error', err);
    }
    return res.redirect('back');
}

// module.exports.create = function (req, res) {

//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function (err, post) {
//         if (err) {
//             console.log('Error in creating a post');
//             return;
//         }

//         return res.redirect('back');
//     });
// }

// module.exports.destroy = function (req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         // .id means converting the object id into string
//         if (post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({ post: req.params.id }, function (err) {
//                 return res.redirect('back');
//             });
//         } else {
//             return res.redirect('back');
//         }
//     });
// }