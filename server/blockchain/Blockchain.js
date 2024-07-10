const Transaction = require('./Transaction');
const Block = require('./Block');
const { genesisPublicKey } = require('../initKeys')

class Blockchain {
    constructor() {
        this.chain = [];
        this.pendingTransactions = [];
        this.reward = 10;
        this.difficulity = 2;
    }

    createGenesisBlock() {
        const initTransaction = new Transaction("NoOne", genesisPublicKey, 1000);
        const genesisBlock = new Block("00000000000000000", [initTransaction]);

        genesisBlock.mine(this.difficulity);
        this.chain.push(genesisBlock);
    }

    getBalance(address) {
        let balance = 0;
        for (let block of this.chain) {
            for (let tx of block.data) {
                if (tx.from === address) {
                    balance -= tx.amount;
                } else if (tx.to === address) {
                    balance += tx.amount;
                }
            }
        }

        return balance;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransactionToPending(transaction) {
        if (transaction.amount <= 0) {
            throw new Error("Can not send negative amount of coins");
        }

        if (!transaction.from || !transaction.to) {
            throw new Error("Transaction must have from and to");
        }

        if (!transaction.isValid()) throw new Error("This is invalid transaction");

        const balance = this.getBalance(transaction.from);
        if (balance < transaction.amount) {
            throw new Error("Not enough coins");
        }

        // Checking if remaining coins is enough for pending transactions
        const pendingAmount = this.pendingTransactions
            .filter((trans) => trans.from === transaction.from)
            .map((trans) => trans.amount)
            .reduce((prev, current) => prev + current, 0);

        if (balance < transaction.amount + pendingAmount) {
            throw new Error("Not enough coins");
        }

        this.pendingTransactions.push(transaction);
    }

    minePendingTxs(minnerAddress) {
        const newBlock = new Block(this.getLatestBlock().hash, this.pendingTransactions);

        const rewardTransaction = new Transaction("", minnerAddress, this.reward);
        newBlock.data.push(rewardTransaction);

        newBlock.mine(this.difficulity);
        this.pendingTransactions = [];
        this.chain.push(newBlock);
        return newBlock;
    }
}

const blockchain = new Blockchain();
module.exports = blockchain;