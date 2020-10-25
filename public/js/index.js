let socket = io();

socket.on('connect', function () {
    console.log("Connected to server");
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

socket.on('newMessage', function (message) {
    console.log("newMessage", message);
});

socket.emit('createMessage', {
    from: 'John',
    text: 'Hey'
}, function (message) {
    console.log('Got it', message);
});

document.querySelector('#submit-btn').addEventListener('click', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, function (message) {
        console.log('Got it', message);
    });
    

});