const oqs = require('liboqs-node');
const microtime = require('microtime');
const fs = require('fs');
const path = require('path');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Function to generate random messages
const randomMessages = (length) => {
    let message = "";
    while (message.length < length) {
        message += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return message;
};

const signAnalysis = async () => {
    console.log("Signature analysis is running");

    const sigsLength = oqs.Sigs.getEnabledAlgorithms().length;
    const signatures = oqs.Sigs.getEnabledAlgorithms();
    console.log(signatures)

    // Prepare CSV headers
    const csvFilePath = path.join(__dirname, 'signature_analysis_results_cont.csv');
    const csvFamilyPath = path.join(__dirname, 'signature_analysis_results_family_cont.csv');
    const csvFamilyHeaders = "AlgorithmFamily,Variant,ClientKeyPairGenerationTime,SignTime,VerifyTime,CycleTime,MessageLength,SignatureLength\n";
    const headers = "Algorithm,PublicKeyLength,SecretKeyLength,ClientKeyPairGenerationTime,MessageLength,SignatureLength,SignTime,VerifyTime,CycleTime,NISTLevel\n";
    fs.writeFileSync(csvFilePath, headers);
    fs.writeFileSync(csvFamilyPath, csvFamilyHeaders);

    for (let i = 0; i < sigsLength; i++) {
        console.log(`Algorithm: ${signatures[i]}`);

        for (let j = 0; j < 100; j++) {
            let messageToSign = null
            const cycleTimeStart = microtime.now();

            // Create signature instance for client
            const clientSig = new oqs.Signature(signatures[i]);
            const clientStartTime = microtime.now();
            const clientKeyPair = clientSig.generateKeypair();
            const clientSecretKey = clientSig.exportSecretKey();
            const clientEndTime = microtime.now();
            
            // Get the message to sign
            messageToSign = Buffer.from(`${randomMessages((j + 1) * 200000 )}`, 'utf-8');
            
            // Sign the message
            const signStartTime = microtime.now();
            const signature = clientSig.sign(messageToSign);
            const signEndTime = microtime.now();
            
            // Verify the signature
            const verifyStartTime = microtime.now();
            const isVerified = clientSig.verify(messageToSign, signature, clientKeyPair);
            const verifyEndTime = microtime.now();
            
            if (!isVerified) {
                console.error(`Signature verification failed for algorithm ${signatures[i]}`);
            }
            
            const cycleTimeEnd = microtime.now();
            
            const clientKeyPairGenerationTime = clientEndTime - clientStartTime;
            const signTime = signEndTime - signStartTime;
            const verifyTime = verifyEndTime - verifyStartTime;
            const cycleTime = cycleTimeEnd - cycleTimeStart;

            // Construct analysis data row for CSV
            const csvRow = `${signatures[i]},${clientKeyPair.length},${clientSecretKey.length},${clientKeyPairGenerationTime},${messageToSign.length},${signature.length},${signTime},${verifyTime},${cycleTime},${clientSig.getDetails().claimedNistLevel}\n`;
            fs.appendFileSync(csvFilePath, csvRow);

            const algorithmFamily = signatures[i].includes('DILITHIUM') ? 'Dilithium' : 
                                    signatures[i].includes('Falcon') ? 'Falcon' : 
                                    signatures[i].includes('picnic') ? 'Picnic' : 
                                    signatures[i].includes('Rainbow') ? 'Rainbow' : 
                                    signatures[i].includes('SPHINCS+') ? 'SPHINCS' : 
                                    signatures[i].includes('qTesla') ? 'qTesla' : 'Unknown';

            // Construct family CSV row as a string
            const csvFamilyRow = `${algorithmFamily},${signatures[i]},${clientKeyPairGenerationTime},${signTime},${verifyTime},${cycleTime},${messageToSign.length},${signature.length}\n`;
            fs.appendFileSync(csvFamilyPath, csvFamilyRow);
            // console.log(csvFamilyRow)

        }
    }
    console.log("Signature analysis completed");
};

module.exports = signAnalysis;
