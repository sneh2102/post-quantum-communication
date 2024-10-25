const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signatureAnalysisSchema = new Schema({
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
    signatureLength: {
        type: Number,
        required: true
    },
    clientKeyPairGenerationTime: {
        type: Number,  // Time in microseconds
        required: true
    },
    message:{
        type: String,
        required: true
    },
    messageLength: {
        type: Number,
        required: true
    },
    signTime: {
        type: Number,  // Time in microseconds
        required: true
    },
    signatureLength: {
        type: Number,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    verifyTime: {
        type: Number,  // Time in microseconds
        required: true
    },
    cycleTime: {
        type: Number,  // Total time for the full cycle
        required: true
    },
    nistLevel: {
        type: Number,  // NIST security level
        required: true
    },
    signatureVerified: {
        type: Boolean,  // Whether the signature verification was successful
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SignatureAnalysis = mongoose.model('SignatureAnalysis', signatureAnalysisSchema);
module.exports = SignatureAnalysis;
