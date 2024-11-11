const oqs = require('liboqs-node');
const microtime = require('microtime');
const fs = require('fs');
const path = require('path');

const analysis = async () => {
    console.log("Analysis is running");
    
    const KEMs = [
  'Classic-McEliece-460896f',
  'Classic-McEliece-6688128',
  'Classic-McEliece-6688128f',
  'Classic-McEliece-6960119',
  'Classic-McEliece-6960119f',
  'Classic-McEliece-8192128',
  'Classic-McEliece-8192128f'];
    console.log(KEMs);
    const KEMSLength = KEMs.length;

    // Write headers to CSV
    const csvFilePath = path.join(__dirname, 'oqs_analysis_results_mceleice_continue.csv');
    const csvFamilyPath = path.join(__dirname, 'oqs_analysis_results_family_mceleice_continue.csv');
    const csvFamilyHeaders = "AlgorithmFamily,ClientKeyPairGenerationTime,EncapsulationTime,DecapsulationTime,EncapDecapCycleTime\n";
    fs.writeFileSync(csvFamilyPath, csvFamilyHeaders);
    const headers = "Algorithm,Varient,PublicKeyLength,SecretKeyLength,CiphertextLength,SharedSecretLength,ClientKeyPairGenerationTime,EncapsulationTime,DecapsulationTime,EncapDecapCycleTime,NISTLevel\n";
    fs.writeFileSync(csvFilePath, headers);

    for (let i = 0; i < KEMSLength; i++) {
        console.log(`Algorithm: ${KEMs[i]}`);
        for (let j = 0; j < 10000; j++) {
            const cycleTimeStart = microtime.now();

            // Client Key Pair Generation
            const clientKem = new oqs.KeyEncapsulation(KEMs[i]);
            const clientStartTime = microtime.now();
            const clientKeyPair = clientKem.generateKeypair();
            const clientSecretKey = clientKem.exportSecretKey();
            const clientEndTime = microtime.now();
            
            // Server Key Pair Generation
            const serverKem = new oqs.KeyEncapsulation(KEMs[i]);
            const serverStartTime = microtime.now();
            const serverKeyPair = serverKem.generateKeypair();
            const serverSecretKey = serverKem.exportSecretKey();
            const serverEndTime = microtime.now();
            const serverKeyPairGenerationTime = serverEndTime - serverStartTime;
            
            // Client Encapsulation
            const clientEncapsulationStartTime = microtime.now();
            const clientEncapsulation = clientKem.encapsulateSecret(serverKeyPair);
            const clientEncapsulationEndTime = microtime.now();
 
            
            // Server Decapsulation
            const serverDecapsulationStartTime = microtime.now();
            const serverDecapsulation = serverKem.decapsulateSecret(clientEncapsulation.ciphertext);
            const serverDecapsulationTimeEndTime = microtime.now();
            
            const cycleTimeEnd = microtime.now();
            const clientKeyPairGenerationTime = clientEndTime - clientStartTime;
            const clientEncapsulationTime = clientEncapsulationEndTime - clientEncapsulationStartTime;
            const serverDecapsulationTime = serverDecapsulationTimeEndTime - serverDecapsulationStartTime;
            const cycleTime = cycleTimeEnd - cycleTimeStart;
            
            if (clientEncapsulation.sharedSecret.toString('hex') === serverDecapsulation.toString('hex')) {
                const analysisResult = {
                    algorithm: KEMs[i],
                    publicKeyLength: clientKeyPair.length,
                    secretKeyLength: clientSecretKey.length,
                    ciphertextLength: clientEncapsulation.ciphertext.length,
                    sharedSecretLength: clientEncapsulation.sharedSecret.length,
                    clientKeyPairGenerationTime,
                    encapsulationTime: clientEncapsulationTime,
                    decapsulationTime: serverDecapsulationTime,
                    encapDecapCycleTime: cycleTime,
                    nistLevel: clientKem.getDetails().claimedNistLevel
                };

                const algoFamily = {
                    varient: KEMs[i],
                    algorithm: KEMs[i].includes('BIKE') ? 'Bike' : KEMs[i].includes('Classic-McEliece') ? 'Classic-McEliece' : KEMs[i].includes('HQC') ? 'HQC' : KEMs[i].includes('Kyber') ? 'Kyber' : KEMs[i].includes('NewHope') ? 'NewHope' : KEMs[i].includes('NTRU') ? 'NTRU' : KEMs[i].includes('Saber') ? 'Saber' : KEMs[i].includes('Bear') ? 'Bear' : KEMs[i].includes('FrodoKEM') ? 'FrodoKEM' : KEMs[i].includes('SIDH') ? 'SIDH' : KEMs[i].includes('SIKE') ? 'SIKE' : 'Unknown',
                    clientKeyPairGenerationTime,
                    encapsulationTime: clientEncapsulationTime,
                    decapsulationTime: serverDecapsulationTime,
                    encapDecapCycleTime: cycleTime,
                }

                
                // Format the analysis result into a CSV row
                const csvRow = `${analysisResult.algorithm},${analysisResult.publicKeyLength},${analysisResult.secretKeyLength},${analysisResult.ciphertextLength},${analysisResult.sharedSecretLength},${analysisResult.clientKeyPairGenerationTime},${analysisResult.encapsulationTime},${analysisResult.decapsulationTime},${analysisResult.encapDecapCycleTime},${analysisResult.nistLevel}\n`;
                const csvFamilyRow = `${algoFamily.algorithm}, ${algoFamily.varient},${algoFamily.clientKeyPairGenerationTime},${algoFamily.encapsulationTime},${algoFamily.decapsulationTime},${algoFamily.encapDecapCycleTime}\n`;
                // Append the row to the CSV file
                fs.appendFileSync(csvFilePath, csvRow);
                fs.appendFileSync(csvFamilyPath, csvFamilyRow);
            }
        }
        console.log(`Analysis for ${KEMs[i]} completed`);
}
    console.log("Analysis completed");
};

module.exports = analysis;
