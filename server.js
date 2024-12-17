// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = socketIo(server);

const io = new socketIo.Server({
    cors: {
        origin: "http://localhost:3000"
    }
})

function newConnection(client) {
    console.log('Client connected');
    client.on('message', (message) => {
        console.log(`received message -> ${message}`);
        client.emit('message', message);
    });
    client.on('close', () => {
        console.log('Client disconnected');
    });
    client.on('disconnect', () => {
        console.log('Client disconnected');
    })
}

// app.use(express.static('public'));

io.on('connection', (ws) => {
  newConnection(ws);
});

const PORT = 8080;
io.listen(PORT, () => {
  console.log('Server running on port 8080');
});