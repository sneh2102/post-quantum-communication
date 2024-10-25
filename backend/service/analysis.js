const oqs = require('liboqs-node');
const Analysis = require('../models/analysis'); 
const microtime = require('microtime');


const analysis = async () => {
    console.log("Analysis is running");
    const KEMSLength = oqs.KEMs.getEnabledAlgorithms().length;
    const KEMs = oqs.KEMs.getEnabledAlgorithms();

    for (let i = 0; i < KEMSLength; i++) {
        console.log(`Algorithm: ${(KEMs[i])}`);
        for(let j = 0; j < 50; j++) {
        const cycleTimeStart = microtime.now();
        // Client Key Pair Generation
        const clientKem = new oqs.KeyEncapsulation(KEMs[i]);
        const clientStartTime = microtime.now();
        // console.log("Client Start Time: ", clientStartTime);
        const clientKeyPair = clientKem.generateKeypair();
        const clientSecretKey = clientKem.exportSecretKey();
        const clientEndTime = microtime.now();
        // console.log("Client End Time: ", clientEndTime);
        const clientKeyPairGenerationTime =  clientEndTime - clientStartTime;
        // console.log("Client Key Pair Generation Time: ", clientKeyPairGenerationTime);
        //Server Key Pair Generation
        const serverKem = new oqs.KeyEncapsulation(KEMs[i]);
        const serverStartTime = microtime.now();
        const serverKeyPair = serverKem.generateKeypair();
        const serverSecretKey = serverKem.exportSecretKey();
        const serverEndTime = microtime.now();
        const serverKeyPairGenerationTime = serverEndTime - serverStartTime;

        // Client Encapsulation
        const clientEncapsulationStartTime = microtime.now();
        const clientEncapsulation = clientKem.encapsulateSecret(serverKeyPair);
        const clientEncapsulationTime = microtime.now() - clientEncapsulationStartTime;

        // Server Dec
        const serverDecapsulationStartTime = microtime.now();
        const serverDecapsulation = serverKem.decapsulateSecret(clientEncapsulation.ciphertext);
        const serverDecapsulationTime = microtime.now() - serverDecapsulationStartTime;

        const cycleTimeEnd = microtime.now();  
        const cycleTime = cycleTimeEnd - cycleTimeStart;

        if (clientEncapsulation.sharedSecret.toString('hex') == serverDecapsulation.toString('hex')) {
        const analysis = new Analysis({
            algorithm: KEMs[i],
            publicKeyLength: clientKeyPair.length,
            secretKeyLength: clientSecretKey.length,
            ciphertextLength: clientEncapsulation.ciphertext.length,
            sharedSecretLength: clientEncapsulation.sharedSecret.length,
            clientKeyPairGenerationTime: clientKeyPairGenerationTime,
            encapsulationTime: clientEncapsulationTime,
            decapsulationTime: serverDecapsulationTime,
            encapDecapCycleTime: cycleTime,
            nistLevel: clientKem.getDetails().claimedNistLevel
        })
        await analysis.save()
    }
    }
}
console.log("Analysis completed");
}   


module.exports = analysis;