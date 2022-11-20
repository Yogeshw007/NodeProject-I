const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {

    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        return res.json(200, {
            message: 'List of posts',
            posts: posts
        })

    } catch (err) {
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            await post.remove();
            await Comment.deleteMany({ post: req.params.id });

            return res.json(200, {
                mesage: 'Post and associated comments deleted successfully'
            });

            // if (req.xhr) {
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     });
            // }

            // req.flash('success', 'Deleted the comments :(');
        } else {
            // req.flash('error', 'Comments not deleted unauthorized :(');
            return res.json(401, {
                message: 'Unauthorized'
            });
        }
    } catch (err) {
        console.log(err)
        // req.flash('error', err);
        return res.json(500, {
            mesage: 'Internal server error'
        });
    }
    // return res.redirect('back');
}