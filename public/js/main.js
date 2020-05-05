const socket = io();
const chatForm = document.getElementById('chat-form');

socket.on('message', (message) => {
   console.log(message);
});

// message submit
chatForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // get submitted message
   const msg = e.target.elements.msg.value;

   // emit chat message to server
   // console.log(msg);
   socket.emit('chatMessage', msg);
});
