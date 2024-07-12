const blockchain = require('./blockchain/Blockchain');
const Transaction = require('./blockchain/Transaction');
const { genesisPublicKey, keyPair } = require('./initKeys');

console.log("Balance: ", blockchain.getBalance(genesisPublicKey));

const newTransaction = new Transaction(genesisPublicKey, "hienthai", 500);
newTransaction.sign(keyPair);

blockchain.addTransaction(newTransaction);
blockchain.mineTransactions("NoOne");
console.log("Balance owner: ", blockchain.getBalance(genesisPublicKey));
console.log("Balance hienthai: ", blockchain.getBalance("hienthai"));

console.log(blockchain.chain);

