const Transaction = require('./Transaction');
const Block = require('./Block');
const { MINT_PUBLIC_ADDRESS, MINT_KEY_PAIR, genesisPublicKey } = require('../initKeys')

class Blockchain {
    constructor() {
        const initalCoinRelease = new Transaction(MINT_PUBLIC_ADDRESS, genesisPublicKey, 100000000, 0, '');
        this.transactions = [];
        this.chain = [new Block("", [initalCoinRelease])];
        this.difficulty = 1;
        this.blockTime = 2000;
        this.reward = 100;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = Block.getHash(block);
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block));

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }

    addTransaction(transaction) {
        if (Transaction.isValid(transaction, this)) {
            this.transactions.push(transaction);
        }
    }

    mineTransactions(rewardAddress) {
        let gas = 0;

        this.transactions.forEach(transaction => {
            gas += transaction.gas;
        });

        const rewardTransaction = new Transaction(MINT_PUBLIC_ADDRESS, rewardAddress, this.reward + gas,);
        rewardTransaction.sign(MINT_KEY_PAIR);

        const blockTransactions = [rewardTransaction, ...this.transactions];

        if (this.transactions.length !== 0) {
            const block = new Block(new Date().getTime(), blockTransactions);
            this.addBlock(block);
        }

        this.transactions.splice(0, blockTransactions.length - 1);
    }

    getBalance(address) {
        let balance = 0;

        this.chain.forEach(block => {
            block.data.forEach(transaction => {
                if (transaction.from === address) {
                    balance -= transaction.amount;
                    balance -= transaction.gas;
                }

                if (transaction.to === address) {
                    balance += transaction.amount;
                }
            })
        })

        return balance;
    }

    static isValid(blockchain) {
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i - 1];

            if (
                currentBlock.hash !== Block.getHash(currentBlock) ||
                prevBlock.hash !== currentBlock.prevHash ||
                !Block.hasValidTransactions(currentBlock, blockchain)
            ) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;