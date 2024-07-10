const blockchain = require('./blockchain/Blockchain');
const Transaction = require('./blockchain/Transaction');
const { genesisPublicKey } = require('./initKeys');

blockchain.createGenesisBlock();
console.log("Balance: ", blockchain.getBalance(genesisPublicKey));

const newTransaction = new Transaction(genesisPublicKey, "hienthai", 500);
newTransaction.signTransaction("asdfads");

blockchain.addTransactionToPending(newTransaction);
blockchain.minePendingTxs("NoOne");
console.log("Balance owner: ", blockchain.getBalance(genesisPublicKey));
console.log("Balance hienthai: ", blockchain.getBalance("hienthai"));

console.log(blockchain.chain);

