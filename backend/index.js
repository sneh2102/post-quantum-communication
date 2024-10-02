const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const socketio = require('socket.io');
const server = require('http').Server(app);
const io = socketio(server);
const cookies = require('cookie-parser');

// Middleware to parse JSON bodies
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    credentials: true                         
  }));

app.get('/', (req, res) => {
    res.send("Hello, I am up and running");
});

app.use('/api', require('./routes/index'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: ", err);
});

server.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});

// Store users
let users = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    // Store the username with the socket ID
    socket.on('join', (username) => {
        users[socket.id] = username;
        console.log(`${username} has joined the chat`);
        io.emit('user-connected', { username, id: socket.id });
    });

    // Handle sending messages to specific users
    socket.on('private-message', ({ recipientId, message, username }) => {
        io.to(recipientId).emit('chat message', { message, username });
    });

    socket.on('disconnect', () => {
        const disconnectedUser = users[socket.id];
        console.log(`${disconnectedUser} has left the chat`);
        delete users[socket.id];
        io.emit('user-disconnected', { username: disconnectedUser });
    });
});
