const saturnin = require('./build/Release/saturnin');

// Example key
const blockSize = 32;

// Message to encrypt and decrypt
// const msg = 'Hello, World! jhh kjaskd jhahskj akjd kajsh dkjashd kjah sdkjhkdfhsdkjfh skjdhf hksjdf ksjddf akjsdhflakjsdflkjasdfkjahsdkj a kjsd fajsdfk jasdlfkjasdlkjfah hskdljfh aksjdhf akjsd fkjas hdlkfjah sdkjfh askjdf alksjdhf kajsdh fkjasdk fjasdkjf askdjf aksjd fkj';

// Setup key schedule
 const key_setup = (key) => {

const  symmetric_key= Buffer.from(key, 'hex');
const keySchedule = saturnin.setupKey(symmetric_key);
return keySchedule;
}

 const encrypt = (msg,keySchedule) => {
    let input = Buffer.from(msg, 'utf8');
    const paddingSize = blockSize - (input.length % blockSize);
    const padding = Buffer.alloc(paddingSize, paddingSize);
    input = Buffer.concat([input, padding]);
    // Encrypt the message in blocks
    let encrypted = Buffer.alloc(0);
    const domain = 0;
    for (let i = 0; i < input.length; i += blockSize) {
        const block = input.slice(i, i + blockSize);
        const encryptedBlock = saturnin.encryptBlock(keySchedule, block, domain);
        encrypted = Buffer.concat([encrypted, encryptedBlock]);
    }
    return encrypted;
}
// console.log("Encrypted:", encrypted.toString('hex'));
// const block = encrypted.slice(i, i + blockSize);


// Decrypt the message in blocks

 const decrypt = (encrypted,keySchedule) => {
    let decrypted = Buffer.alloc(0);
    const domain = 0;
    for (let i = 0; i < encrypted.length; i += blockSize) {
        const block = encrypted.slice(i, i + blockSize);
        const decryptedBlock = saturnin.decryptBlock(keySchedule, block, domain);
        decrypted = Buffer.concat([decrypted, decryptedBlock]);
    }   
    // Remove padding
    const paddingLength = decrypted[decrypted.length - 1];
    decrypted = decrypted.slice(0, decrypted.length - paddingLength);
    return decrypted;
}

// console.log("Decrypted:", decrypted.toString('utf8'));
module.exports = {encrypt,decrypt,key_setup};