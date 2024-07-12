const { MINT_PUBLIC_ADDRESS } = require("../initKeys");
const EC = require("elliptic").ec
const crypto = require("crypto")
SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

const ec = new EC("secp256k1");

class Transaction {
    constructor(from, to, amount, gas = 0) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.gas = gas;
    }

    sign(keyPair) {
        if (keyPair.getPublic("hex") === this.from) {
            this.signature = keyPair.sign(SHA256(this.from + this.to + this.amount + this.gas), "base64").toDER("hex");
        }
    }

    static isValid(tx, chain) {
        return (
            tx.signature &&
            tx.from &&
            tx.to &&
            tx.amount &&
            (chain.getBalance(tx.from) >= tx.amount + tx.gas || tx.from === MINT_PUBLIC_ADDRESS) &&
            ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from + tx.to + tx.amount + tx.gas), tx.signature)
        )
    }
}

module.exports = Transaction;