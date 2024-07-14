const Node = require('./Node');
const MyCoin = require('./MyCoin');


const node = new Node(MyCoin, [], "ws://localhost:8080", 8080);

module.exports = node;

