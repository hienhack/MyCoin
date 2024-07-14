const crypto = require("crypto");
const WS = require("ws");
SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
const Block = require('./Block');
const Blockchain = require('./Blockchain');
const { MINT_PUBLIC_ADDRESS } = require('../initKeys');

class Node {
    constructor(blockchain, peers = [], serverAddress, port) {
        this.MyCoin = blockchain;
        this.opened = [];
        this.connected = [];
        this.check = [];
        this.checked = [];
        this.checking = false;
        this.tempChain = new Blockchain();
        this.peers = peers;
        this.port = port;
        this.serverAddress = serverAddress;
    }

    start() {
        const server = new WS.Server({ port: this.port });
        this.initServer(server);
        this.peers.forEach(peer => this.connect(peer));
        process.on("uncaughtException", err => console.log(err));
        console.log("Listening on PORT", this.port);
    }

    startMining(address) {
        setInterval(() => {
            console.log(this.MyCoin.transactions);
            if (this.MyCoin.transactions.length !== 0) {
                this.MyCoin.mineTransactions(address);
                console.log(this.MyCoin.getLastBlock());
                this.sendMessage(this.produceMessage("TYPE_REPLACE_CHAIN", [
                    this.MyCoin.getLastBlock(),
                    this.MyCoin.difficulty
                ]));
            }
        }, this.MyCoin.blockTime);
    }

    saveTransaction(transaction) {
        this.MyCoin.addTransaction(transaction);
        this.sendMessage(this.produceMessage("TYPE_CREATE_TRANSACTION", transaction));
    }

    produceMessage(type, data) {
        return { type, data };
    }

    sendMessage(message) {
        this.opened.forEach(node => {
            node.socket.send(JSON.stringify(message));
        })
    }

    async connect(address) {
        if (!this.connected.find(peerAddress => peerAddress === address) && address !== this.serverAddress) {
            const socket = new WS(address);

            socket.on("open", () => {
                socket.send(JSON.stringify(this.produceMessage("TYPE_HANDSHAKE", [this.serverAddress, ...this.connected])));

                this.opened.forEach(node => node.socket.send(JSON.stringify(this.produceMessage("TYPE_HANDSHAKE", [address]))));

                if (!this.opened.find(peer => peer.address === address) && address !== this.serverAddress) {
                    this.opened.push({ socket, address });
                }

                if (!this.connected.find(peerAddress => peerAddress === address) && address !== this.serverAddress) {
                    this.connected.push(address);
                }
            });

            socket.on("close", () => {
                this.opened.splice(this.connected.indexOf(address), 1);
                this.connected.splice(this.connected.indexOf(address), 1);
            });
        }
    }

    initServer(server) {
        server.on("connection", async (socket, req) => {
            socket.on("message", message => {
                const _message = JSON.parse(message);

                // console.log(_message);

                switch (_message.type) {
                    case "TYPE_REPLACE_CHAIN":
                        console.log("data", _message.data);
                        const [newBlock, newDiff] = _message.data;

                        const ourTx = [...this.MyCoin.transactions.map(tx => JSON.stringify(tx))];
                        const theirTx = [...newBlock.data.filter(tx => tx.from !== MINT_PUBLIC_ADDRESS).map(tx => JSON.stringify(tx))];
                        const n = theirTx.length;

                        if (newBlock.prevHash !== this.MyCoin.getLastBlock().prevHash) {
                            console.log(1111);
                            for (let i = 0; i < n; i++) {
                                const index = ourTx.indexOf(theirTx[0]);

                                if (index === -1) break;

                                ourTx.splice(index, 1);
                                theirTx.splice(0, 1);
                            }

                            console.log(Math.round(Math.log(this.MyCoin.difficulty) / Math.log(16) + 1));
                            console.log(newBlock.hash.startsWith("000" + Array(Math.round(Math.log(this.MyCoin.difficulty) / Math.log(16) + 1)).join("0")));

                            if (
                                theirTx.length === 0 &&
                                SHA256(this.MyCoin.getLastBlock().hash + newBlock.timestamp + JSON.stringify(newBlock.data) + newBlock.nonce) === newBlock.hash &&
                                Block.hasValidTransactions(newBlock, this.MyCoin) &&
                                (parseInt(newBlock.timestamp) > parseInt(this.MyCoin.getLastBlock().timestamp) || this.MyCoin.getLastBlock().timestamp === "") &&
                                parseInt(newBlock.timestamp) < Date.now() &&
                                this.MyCoin.getLastBlock().hash === newBlock.prevHash &&
                                (newDiff + 1 === this.MyCoin.difficulty || newDiff - 1 === this.MyCoin.difficulty)
                            ) {
                                console.log(2222);
                                this.MyCoin.chain.push(newBlock);
                                this.MyCoin.difficulty = newDiff;
                                this.MyCoin.transactions = [...ourTx.map(tx => JSON.parse(tx))];
                            }
                        } else if (!this.checked.includes(JSON.stringify([newBlock.prevHash, this.MyCoin.chain[this.MyCoin.chain.length - 2].timestamp || ""]))) {
                            console.log(3333);
                            this.checked.push(JSON.stringify([this.MyCoin.getLastBlock().prevHash, this.MyCoin.chain[this.MyCoin.chain.length - 2].timestamp || ""]));

                            const position = this.MyCoin.chain.length - 1;

                            this.checking = true;

                            this.sendMessage(this.produceMessage("TYPE_REQUEST_CHECK", this.serverAddress));

                            setTimeout(() => {
                                this.checking = false;

                                let mostAppeared = this.check[0];

                                this.check.forEach(group => {
                                    if (this.check.filter(_group => _group === group).length > this.check.filter(_group => _group === mostAppeared).length) {
                                        mostAppeared = group;
                                    }
                                })

                                const group = JSON.parse(mostAppeared)

                                this.MyCoin.chain[position] = group[0];
                                this.MyCoin.transactions = [...group[1]];
                                this.MyCoin.difficulty = group[2];

                                this.check.splice(0, this.check.length);
                            }, 5000);
                        }

                        break;

                    case "TYPE_REQUEST_CHECK":
                        this.opened.filter(node => node.address === _message.data)[0].socket.send(
                            JSON.stringify(this.produceMessage(
                                "TYPE_SEND_CHECK",
                                JSON.stringify([this.MyCoin.getLastBlock(), this.MyCoin.transactions, this.MyCoin.difficulty])
                            ))
                        );

                        break;

                    case "TYPE_SEND_CHECK":
                        if (this.checking) this.check.push(_message.data);

                        break;

                    case "TYPE_CREATE_TRANSACTION":
                        const transaction = _message.data;

                        this.MyCoin.addTransaction(transaction);

                        break;

                    case "TYPE_SEND_CHAIN":
                        const { block, finished } = _message.data;

                        if (!finished) {
                            this.tempChain.chain.push(block);
                        } else {
                            this.tempChain.chain.push(block);
                            if (Blockchain.isValid(this.tempChain)) {
                                this.MyCoin.chain = this.tempChain.chain;
                            }
                            this.tempChain = new Blockchain();
                        }

                        break;

                    case "TYPE_REQUEST_CHAIN":
                        const socket = this.opened.filter(node => node.address === _message.data)[0].socket;

                        for (let i = 1; i < this.MyCoin.chain.length; i++) {
                            socket.send(JSON.stringify(this.produceMessage(
                                "TYPE_SEND_CHAIN",
                                {
                                    block: this.MyCoin.chain[i],
                                    finished: i === this.MyCoin.chain.length - 1
                                }
                            )));
                        }

                        break;

                    case "TYPE_REQUEST_INFO":
                        opened.filter(node => node.address === _message.data)[0].socket.send(JSON.stringify(this.produceMessage(
                            "TYPE_SEND_INFO",
                            [this.MyCoin.difficulty, this.MyCoin.transactions]
                        )));

                        break;

                    case "TYPE_SEND_INFO":
                        [this.MyCoin.difficulty, this.MyCoin.transactions] = _message.data;

                        break;

                    case "TYPE_HANDSHAKE":
                        const nodes = _message.data;

                        nodes.forEach(node => this.connect(node))
                }
            });
        })
    }
}

module.exports = Node;