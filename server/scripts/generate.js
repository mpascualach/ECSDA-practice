const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak.js");
const { toHex } = require("ethereum-cryptography/utils");

function generateAddress() {
  const privateKey = secp.secp256k1.utils.randomPrivateKey();
  const publicKey = secp.secp256k1.getPublicKey(privateKey, false);
  const hashed = keccak256(publicKey);
  const addressBytes = hashed.slice(-20);
  return "0x" + toHex(addressBytes);
}

module.exports = generateAddress;
