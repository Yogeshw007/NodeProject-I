window.onload = function () {
    let deleteButtons = $('#posts-list-container .delete-post-button');
    for (let i = 0; i < deleteButtons.length; i++) {
        deletePost(deleteButtons[i]);
    }

    $('#posts-list-container>ul>li').each(function () {
        createComment($(this).find('.new-comment-form'));
        $(this).find('.post-comments-list>ul>li>a').each(function () {
            deleteComment($(this));
        })
    });
}

let createComment = function (commentForm) {


    $(commentForm).submit(function (e) {
        e.preventDefault();


        $.ajax({
            type: 'post',
            url: '/comments/create',
            data: commentForm.serialize(),
            success: function (data) {
                let newComment = newCommentDOM(data.data.comment, data.data.user);
                console.log(newComment);
                $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                console.log($(`#post-comments-${data.data.comment.post}`));
                notifySuccessMsg('Created comment!!');
                deleteComment($(newComment).find('a'));
            },
            error: function (error) {
                console.log(error.responseText);
            }
        });

    });
}

function newCommentDOM(comment, user) {
    return $(`
        <li id="post-comment-${comment._id}">
            <small>
                <a href="/comments/destroy/${comment._id}">X</a>
            </small>
            <p>
                ${comment.content}
                    <br>
                    <small>
                        ${comment.user.name}
                    </small>
            </p>
        </li>
    
    `);
}

let deleteComment = function (deleteLink) {
    $(deleteLink).click(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                $(`#post-comment-${data.data.commentId}`).remove();
                notifySuccessMsg('Deleted comment!!');
            },
            error: function (error) {
                console.log(error.responseText)
            }
        });
    });
}

let createPost = function () {

    let newPostForm = $('#new-post-form');

    newPostForm.submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function (data) {
                let newPost = newPostDOM(data.data.post, data.data.user);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button'), newPost);
                createComment($(` #new-comment-form-${data.data.post.id}`), newPost);

                notifySuccessMsg('Post created');
            },
            error: function (error) {
                console.log(error.responseText);
            }
        });

    });
};

function newPostDOM(post, user) {
    return $(`<li id="post-id-${post._id}">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            <p>
                        ${post.content}
                            <br>
                            <small>
                                ${user.name}
                            </small>
            </p>
            <div class="post-comments">
                    <form id="new-comment-form-${post.id}" class="new-comment-form" action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type Here to add comment..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>

                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                            </ul >
                        </div >
            </div >
        </li > `);
}

let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                $(`#post-id-${data.data.post_id}`).remove();
                notifySuccessMsg('Deleted post!!');
            },
            error: function (error) {
                console.log(error.responseText);
            }
        });

    })
}

function notifySuccessMsg(message) {
    new Noty({
        text: message,
        theme: 'relax',
        type: 'success',
        layout: 'topRight',
        timeout: 1500
    }).show();
}

function notifyFailureMsg(message) {
    new Noty({
        text: message,
        theme: 'relax',
        type: 'error',
        layout: 'topRight',
        timeout: 1500
    }).show();
}


createPost();
