const oqs = require('liboqs-node');
const SignatureAnalysis = require('../models/signatureAnalysis');
const microtime = require('microtime');

const signAnalysis = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Function to generate random messages
    const randomMessages = (length) => {
        let message = "";
        while (message.length < length) {
            message += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return message;
    };

    // Create an array of messages (start indexing from 0 for consistency)
    const messages = [];
    for (let i = 0; i < 50; i++) {
        messages[i] = Buffer.from(`${randomMessages((i + 1) * 20)}`, 'utf-8');
    }

    console.log("Signature analysis is running");

    const sigsLength = oqs.Sigs.getEnabledAlgorithms().length;
    const signatures = oqs.Sigs.getEnabledAlgorithms();

    for (let i = 0; i < sigsLength; i++) {
        console.log(`Algorithm: ${signatures[i]}`);
        for (let j = 0; j < 50; j++) {
            const cycleTimeStart = microtime.now();

            // Create signature instance for client
            const clientSig = new oqs.Signature(signatures[i]);
            const clientStartTime = microtime.now();
            const clientKeyPair = clientSig.generateKeypair();
            const clientSecretKey = clientSig.exportSecretKey();
            const clientEndTime = microtime.now();
            const clientKeyPairGenerationTime = clientEndTime - clientStartTime;

            // Get the message to sign
            const messageToSign = messages[j]; 
            // Sign the message
            const signStartTime = microtime.now();
            const signature = clientSig.sign(messageToSign);  // Using the correct message buffer
            const signEndTime = microtime.now();
            const signTime = signEndTime - signStartTime;

            // Verify the signature
            const verifyStartTime = microtime.now();
            const isVerified = clientSig.verify(messageToSign, signature, clientKeyPair);
            const verifyEndTime = microtime.now();
            const verifyTime = verifyEndTime - verifyStartTime;

            // Error handling in case signature verification fails
            if (!isVerified) {
                console.error(`Signature verification failed for algorithm ${signatures[i]}`);
            }

            const cycleTimeEnd = microtime.now();
            const cycleTime = cycleTimeEnd - cycleTimeStart;

            // Save the analysis data
            const analysis = new SignatureAnalysis({
                algorithm: signatures[i],
                publicKeyLength: clientKeyPair.length,
                secretKeyLength: clientSecretKey.length,
                clientKeyPairGenerationTime: clientKeyPairGenerationTime,
                message: messageToSign.toString(),
                messageLength: messageToSign.length,
                signatureLength: signature.length,
                signTime: signTime,
                signature: signature.toString('hex'),
                verifyTime: verifyTime,
                cycleTime: cycleTime,
                nistLevel: clientSig.getDetails().claimedNistLevel,
                signatureVerified: isVerified
            });

            await analysis.save();
        }
    }
    console.log("Signature analysis completed");
};

module.exports = signAnalysis;
