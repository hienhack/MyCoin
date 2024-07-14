const Blockchain = require("./blockchain/Blockchain");
const Node = require("./blockchain/Node");
const Transaction = require("./blockchain/Transaction");
const { genesisPublicKey, keyPair } = require("./initKeys");

const { MyCoin } = require("./blockchain/MyCoin");

const MyCoinNode = new Node(MyCoin, [], "ws://localhost:3000", 3000);

MyCoinNode.start();

setTimeout(() => {
    const transaction = new Transaction(genesisPublicKey, "hienthai", 1245, 0, Date.now().toString());
    transaction.sign(keyPair);
    MyCoinNode.saveTransaction(transaction);
}, 5000);

setTimeout(() => {
    console.log(MyCoin.getBalance("hienthai"));
}, 10000);
