const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({  
    algorithm: {
        type: String,
        required: true
    },
    publicKeyLength: {
        type: Number,
        required: true
    },
    secretKeyLength: {
        type: Number,
        required: true
    }, 
    clientKeyPairGenerationTime: {
        type: Number,
        required: true
    },
    encapsulationTime: {
        type: Number,
        required: true
    },
    decapsulationTime: {
        type: Number,
        required: true
    },
    nistLevel: {
        type: String,
        required: true
    },
    encapDecapCycleTime: {
        type: Number,
        required: true
    },
});

const Analysis = mongoose.model('Analysis', analysisSchema);
module.exports = Analysis;