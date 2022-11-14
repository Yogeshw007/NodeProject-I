const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    let allPosts = new Array();

    // Find all the posts from the db and send the posts object in the response
    // Post.find({}, function (err, posts) {
    //     if (err) {
    //         console.log('Error in finding the posts');
    //         return res.render('home', {
    //             title: 'Home'
    //         });
    //     }

    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts
    //     });
    // });

    // Find all the posts and populate the user (retrieve the entire user object) and send the posts object in the response
    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })
    //     .exec(function (err, posts) {
    //         if (err) {
    //             console.log('Error in finding the posts');
    //             return res.render('home', {
    //                 title: 'Home'
    //             });
    //         }
    //         User.find({}, function (err, users) {
    //             return res.render('home', {
    //                 title: 'Home',
    //                 posts: posts,
    //                 all_users: users
    //             });
    //         });


    //     });

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

        let users = await User.find({});

        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users: users
        });
    } catch (err) {
        req.flash('error', err);
        return;
    }
}