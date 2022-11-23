function addFriend() {
    $('#add-friendship-form').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function (data) {
                if (data.friendship_added) {
                    let form = $('#add-friendship-form');
                    $(form).find('#friendship-toggle').attr('value', 'Remove friend');
                    form.attr('id', 'remove-friendship-form');
                    form.attr('action', '/users/remove-friend');
                    removeFriend();
                }
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    });
}

function removeFriend() {
    $('#remove-friendship-form').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function (data) {
                console.log('Remove event');
                if (data.friendship_removed) {
                    let form = $('#remove-friendship-form');
                    $(form).find('#friendship-toggle').attr('value', 'Add friend');
                    form.attr('id', 'add-friendship-form');
                    form.attr('action', '/users/add-friend');
                    addFriend();
                }
            },
            error: function (err) {
                console.log(err.responseText);
            }
        });
    });
}

removeFriend();

addFriend();