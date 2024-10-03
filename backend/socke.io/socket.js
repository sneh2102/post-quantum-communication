const {Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const userSocketMap = {}; //{ userId: socketId }

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) {
        userSocketMap[userId] = socket.id;
    }
    io.emit('getOnnlineUsers', Object.keys(userSocketMap));
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete userSocketMap[userId];
    io.emit('getOnnlineUsers', Object.keys(userSocketMap));
    });

    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    });
});

module.exports = {app, server, io, getReceiverSocketId};