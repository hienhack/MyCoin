const crypto = require('crypto')

class Block {
    constructor(previousHash, data) {
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = new Date().getTime();
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash("sha256")
            .update(
                this.prevHash +
                JSON.stringify(this.data) +
                this.timestamp +
                this.nonce
            )
            .digest("hex");
    }

    mine(difficulty) {
        while (!this.hash.startsWith('0'.repeat(difficulty))) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Minded, hash: ", this.hash);
    }
}

module.exports = Block;