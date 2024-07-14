const http = require('http');
const express = require('express');
const route = require('./routes');
const cors = require('cors');
const serverNode = require('../blockchain/severNode');
const MyCoin = require('../blockchain/MyCoin');
const WS = require('socket.io');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

route(app);
serverNode.start();

const server = http.createServer(app);
const io = new WS.Server(server, {
    cors: {
        origin: "*",
    },
});

const opened = [];
io.on("connection", (socket) => {
    opened.push(socket);
});

function broadcastNewBlock(block) {
    opened.forEach((socket) => {
        socket.emit("newBlock", block);
    });
}

let lastBlock = MyCoin.getLastBlock();
setInterval(() => {
    const newBlock = MyCoin.getLastBlock();
    if (newBlock.hash !== lastBlock.hash) {
        console.log("New block found:");
        console.log(newBlock);
        broadcastNewBlock(newBlock);
        lastBlock = newBlock;
    }
}, 2000);

server.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
});