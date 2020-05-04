// imports
const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

// init and configs
const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
io.on('connection', (socket) => {
   console.log('New web socket connection');
});

app.get('*', (req, res) => {
   res.send('This page is still under construction...');
});

server.listen(3000, () => {
   console.log(`http://localhost:${PORT}`);
});
