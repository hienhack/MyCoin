const Node = require('../blockchain/Node');
const Blockchain = require('../blockchain/Blockchain');

const MyCoin = new Blockchain();

const node = new Node(MyCoin, ["ws://localhost:8080"], "ws://localhost:8081", 8081);
node.start();
node.startMining("hienthai");