const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT;
const cookies = require('cookie-parser');
const {app, server} = require('./socke.io/socket');

// Middleware to parse JSON bodies
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(cors({
    origin: 'http://localhost:5173',
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

