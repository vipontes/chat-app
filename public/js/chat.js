let socket = io();

function scrollToBottom() {
  let messages = document.querySelector('#message-history').lastElementChild;
  messages.scrollIntoView();
}

socket.on("connect", function () {
  let searchQuery = window.location.search.substring(1);
  let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g, '":"') + '"}');

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No Errors');
    }
  });
});

socket.on("disconnect", function () {
  console.log("Disconnected from server");
});

socket.on('updateUsersList', function (users) {
  document.querySelector('#users').innerHTML = '';
  users.forEach(function (user) {
    const fomattedTime = moment().format('LT');
    const template = document.querySelector('#room-people-template').innerHTML;
    const html = Mustache.render(template, {
      name: user,
      connectedAt: fomattedTime
    });
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#users').appendChild(div);
  });
});

socket.on("newMessage", function (message) {
  const fomattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#outcoming-message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: fomattedTime

  });
  const div = document.createElement('div');
  div.innerHTML = html;
  document.querySelector('#message-history').appendChild(div);
  scrollToBottom();
});

document.querySelector("#submit-btn").addEventListener("click", function (e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      text: document.querySelector('input[name="message"]').value,
    },
    function () {
      document.querySelector('input[name="message"]').value = '';
    }
  );
});
