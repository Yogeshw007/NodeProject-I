{
    let createPost = function () {

        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDOM(data.data.post);
                    // console.log(newPost)
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error: function (error) {
                    console.log(error)
                }
            });

        });
    };


    function newPostDOM(post) {
        return $(`<li id="post-id-${post._id}">
            <small>
                <a href="/posts/destroy/${post._id}">X</a>
            </small>
            <p>
                        ${post.content}
                            <br>
                            <small>
                                ${post.user.name}
                            </small>
            </p>
            <div class="post-comments">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type Here to add comment...">
                        <input type="hidden" name="post" value="<%= post._id %>">
                        <input type="submit" value="Add Comment">
                    </form>

                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                            </ul>
                        </div>
            </div>
        </li>`);
    }

    createPost();



}