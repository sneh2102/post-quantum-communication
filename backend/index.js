const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const port = 5000;
const cookies = require('cookie-parser');
const {app, server} = require('./socke.io/socket');
const oqs = require('liboqs-node');

const kem = new oqs.KeyEncapsulation('Kyber512');
const keyPair = kem.generateKeypair();
const analysis = require('./service/analysis');
const signatureAnalysis = require('./service/signatureAnalysis');

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
    console.log("Request received");
    axios.get('https://qrng.qbck.io/8de8a8ab-deb9-4d7f-84ab-90ad4ce14b5b/qbck/block/bigint?size=32&length=1')
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            console.log("Error: ", err);
        });
});

app.use('/api', require('./routes/index'));

const runSequentialAnalysis = async () => {
    try {
        console.log("Analysis completed. Starting signature analysis...");
        // await signatureAnalysis();  // After analysis completes, start signature analysis
        await analysis();  // Wait for analysis to complete
        console.log("Signature analysis completed.");
    } catch (err) {
        console.error("Error during analysis process:", err);
    }
};

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        runSequentialAnalysis();  // Run analysis and signature analysis sequentially
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

server.listen(port, () => {
    console.log(`Server Listening on ${port}`);
});