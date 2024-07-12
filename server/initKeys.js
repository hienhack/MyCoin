const EC = require("elliptic").ec;

const ec = new EC("secp256k1");

const genesisPrivateKey = "d4f6b940d8674e82ebfef5fcfd7ea54b8ee0e60c5366f1737ee1d1a53f7d1843";
const genesisPublicKey = "045d4a7d2fc706b65a5fdcb1f1b8bfe6d06bf6c239290bb53ca5f05ced84511881f08665c865f5dfa51e6eae637a143896252a0bf8825d6b75cb2f402adc419b87";
const keyPair = ec.keyFromPrivate(genesisPrivateKey, "hex");

const MINT_PRIVATE_ADDRESS = "0700a1ad28a20e5b2a517c00242d3e25a88d84bf54dce9e1733e6096e6d6495e";
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, "hex");
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic("hex");

module.exports = { genesisPrivateKey, genesisPublicKey, keyPair, MINT_PRIVATE_ADDRESS, MINT_KEY_PAIR, MINT_PUBLIC_ADDRESS };