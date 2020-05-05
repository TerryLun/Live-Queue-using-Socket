const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// message from server
socket.on('message', (message) => {
   // console.log(message);
   outputMessage(message);

   // scroll down after message received
   chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // get submitted message
   const msg = e.target.elements.msg.value;

   // emit chat message to server
   // console.log(msg);
   socket.emit('chatMessage', msg);

   // clear input and focus after submit
   e.target.elements.msg.value = '';
   e.target.elements.msg.focus();
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
