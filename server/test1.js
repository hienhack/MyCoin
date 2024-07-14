const Blockchain = require("./blockchain/Blockchain");
const Node = require("./blockchain/Node");

const { MyCoin } = require("./blockchain/MyCoin");

const MyCoinNode = new Node(MyCoin, ["ws://localhost:3000"], "ws://localhost:3001", 3001);

MyCoinNode.start();
MyCoinNode.startMining("hienthai");
