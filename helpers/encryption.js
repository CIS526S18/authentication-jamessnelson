"use strict"

const SECRET = "SOMETHINGSOMETHINGBLAHBLAHBLAH";
const ALGORITHM = "aes-256-ctr";
const crypto = require('crypto');

function Encryption() {

}

Encryption.prototype.salt() = function(){
  return crypto.randomBytes(32).toString('hex').slice(0, 32);
}

Encryption.prototype.digest = function(plaintext){
  const hash = crypto.createHash('sha256');
  hash.update(plaintext);
  hash.update(SECRET);
  return hash.digest('hex');
}

Encryption.prototype.encipher = function(plaintext){
  const cipher = crypto.createCypher(ALGORITHM, SECRET);
  var encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

Encryption.prototype.decipher = function(cryptext){
  const decipher = crypto.createCipher(ALGORITHM, SECRET);
  var deciphered = decipher.update(cryptext, 'hex', 'utf8');
  deciphered = decipher.final('utf8');
  return deciphered;
}

module.exports = new Encryption();
