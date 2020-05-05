// imports
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const formatMessage = require('./util/messages');

// init and configs
const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
io.on('connection', (socket) => {
   //emit welcome message to single client
   socket.emit('message', 'Welcome to ChatCord!');

   //broadcast when a user connects
   //broadcast to every client except the one thats conencting
   socket.broadcast.emit('message', 'A user has joined the chat');

   socket.on('disconnect', () => {
      //broadcast to every client
      io.emit('message', 'A user has left the chat.');
   });

   // listen for emitted chat message
   socket.on('chatMessage', (msg) => {
      // console.log(msg);
      io.emit('message', msg);
   });
});

app.get('*', (req, res) => {
   res.send('This page is still under construction...');
});

server.listen(3000, () => {
   console.log(`http://localhost:${PORT}`);
});
