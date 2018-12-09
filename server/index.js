const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();


const server = http.createServer(app);
const io = socketIo(server);

const history = [];

history.length = 0;


io.on('connection', client => {
    console.log('New user connect');

    io.emit("POST_HISTORY", history);

    client.on("SEND_MESSAGE", data => {
        history.push(data);
        io.emit("RECEIVE_MESSAGE", data)
    })


});


const PORT = 8000;

server.listen(PORT, () => console.log('Listening port ' + PORT));




