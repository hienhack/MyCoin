const crypto = require('crypto');
// import { ec } from "elliptic";

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = new Date().getTime();
        this.signature = null;
    }

    calculateHash() {
        return crypto
            .createHash("sha256")
            .update(this.from + this.to + this.amount + this.timestamp)
            .digest("hex");
    }

    signTransaction(signingKey) {
        // if (signingKey.getPublic("hex") !== this.from) {
        //     throw new Error("You cannot sign transactions for other wallets!");
        // }

        // const hash = this.calculateHash();
        // const sign = signKey.sign(hash, "base64");
        // this.signature = sign.toDER("hex");
        this.signature = "signed";
    }

    isValid() {
        if (this.from === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }

        // const publicKey = ec.keyFromPublic(this.from, "hex");
        // return publicKey.verify(this.calculateHash(), this.signature);
        return true;
    }
}

module.exports = Transaction;