// imports
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const formatMessage = require('./util/messages');
const { userJoin, getCurrentUser } = require('./util/users');
// init and configs
const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);
const botName = 'ChatBot';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

io.on('connection', (socket) => {
   socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      //emit welcome message to single client
      socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

      //broadcast when a user connects
      //broadcast to every client except the one thats conencting
      socket.broadcast
         .to(user.room)
         .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
         );
   });

   // listen for emitted chat message
   socket.on('chatMessage', (msg) => {
      // console.log(msg);
      io.emit('message', formatMessage(user.username, msg));
   });

   socket.on('disconnect', () => {
      //broadcast to every client
      io.emit('message', formatMessage(botName, `A user has left the chat.`));
   });
});

app.get('*', (req, res) => {
   res.send('This page is still under construction...');
});

server.listen(3000, () => {
   console.log(`http://localhost:${PORT}`);
});
