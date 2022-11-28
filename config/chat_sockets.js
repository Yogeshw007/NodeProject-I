module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io');

    io.sockets.on('connection', function (socket) {
        console.log('new connection received', socket.id);

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });

        // When an join_name event is emitted then the callback will be called - User log in and join the chat
        socket.on('join_room', function (data) {
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            // when a new user is joined user_joined event will be fired
            io.in(data.chatroom).emit('user_joined', data);
        });


        socket.on('send_message', function (data) {
            console.log('send-message', data);

            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}