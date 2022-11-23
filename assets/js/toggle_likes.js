window.onload = function () {
    $('.likes-toggle-button').each(function () {
        likeToggle($(this));
    });
}

function likeToggle(likeButton) {
    $(likeButton).click(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: $(likeButton).prop('href'),
            success: function (data) {
                $(likeButton).text(data.data.count + ' likes');
            },
            error: function (err) {
                console.log(err.responseText)
            }
        });
    });
}