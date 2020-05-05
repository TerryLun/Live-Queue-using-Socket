const socket = io();
const chatForm = document.getElementById('chat-form');

// message from server
socket.on('message', (message) => {
   // console.log(message);
   outputMessage(message);
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

// output reveived message to chat board
function outputMessage(message) {
   const div = document.createElement('div');
   div.classList.add('message');
   div.innerHTML = `
   <p class="meta">Brad <span>9:12pm</span></p>
   <p class="text">
      ${message}
   </p>
   `;
   document.querySelector('.chat-messages').appendChild(div);
}
