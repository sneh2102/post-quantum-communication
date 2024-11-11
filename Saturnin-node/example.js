const {encrypt} = require('./index.js');
const {decrypt} = require('./index.js');
const {key_setup} = require('./index.js');

const msg = "12345678901234567890123456789012"
console.log("Message:", msg.length, "bytes");
const key ="000102030405060708090a0b0c0d0e0f";
const keySchedule = key_setup(key);
const start = new Date();
const encrypted = encrypt(msg,keySchedule);
// console.log("Encrypted:", encrypted.toString('hex'));
const decrypted = decrypt(encrypted,keySchedule);
const end = new Date();
const elapsed = end - start;
console.log("Elapsed:", elapsed, "ms");
// console.log("Decrypted:", decrypted.toString('utf8'));
console.log("Decrypted:", decrypted.toString('utf8') === msg);