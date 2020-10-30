let socket = io();

function scrollToBottom() {
  let messages = document.querySelector('#message-history').lastElementChild;
  messages.scrollIntoView();
}

socket.on("connect", function () {
  console.log("Connected to server");
});

socket.on("disconnect", function () {
  console.log("Disconnected from server");
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

socket.on("newLocationMessage", function (message) {
  console.log("newLocationMessage", message);

  const fomattedTime = moment(message.createdAt).format('LT');

  let li = document.createElement("li");
  let a = document.createElement("a");
  li.innerText = `${message.from} ${fomattedTime}: `;
  a.setAttribute("target", "_blank");
  a.setAttribute("href", message.url);
  a.innerText = "My current location";
  li.appendChild(a);
  document.querySelector("body").appendChild(li);
});

socket.emit(
  "createMessage",
  {
    from: "John",
    text: "Hey",
  },
  function (message) {
    console.log("Got it", message);
  }
);

document.querySelector("#submit-btn").addEventListener("click", function (e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector('input[name="message"]').value,
    },
    function (message) {
      console.log("Got it", message);
    }
  );
});

document
  .querySelector("#send-location")
  .addEventListener("click", function (e) {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit("createLocationMessage", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function () {
        alert("Unable to fetch location");
      }
    );
  });
