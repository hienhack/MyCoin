const express = require("express");
const Transaction = require("../../blockchain/Transaction");
const blockchain = require("../../blockchain/Blockchain");
const EC = require("elliptic");

const router = express.Router();
const ec = new EC.ec("secp256k1");

router.get("/", (req, res) => {
    let txs = [];

    for (let bl of blockchain.chain) {
        for (let tx of bl.data) {
            txs.push(tx);
        }
    }

    for (let tx of blockchain.transactions) {
        txs.push(tx);
    }

    // txs = txs.map((tx) => ({
    //     ...tx,
    //     // reward: blockchain.reward,
    //     hash: tx.calculateHash(),
    // }));

    return res.status(200).json(txs);
});

router.post("/send", (req, res) => {
    const { privateKey, address, amount } = req.body;

    if (
        typeof privateKey === "string" &&
        typeof address === "string" &&
        parseInt(amount) > 0
    ) {
        const key = ec.keyFromPrivate(privateKey);
        const publicKey = key.getPublic("hex");
        const transaction = new Transaction(publicKey, address, Number(amount));

        transaction.sign(key);
        blockchain.addTransaction(transaction);

        return res.status(200).json(transaction);
    }

    return res.status(400).json({ error: "Error when make transaction" });
});

router.get("/pending-transactions", (req, res) => {
    let resPendingTxs = blockchain.transactions.map((tx) => ({
        ...tx,
        reward: blockchain.reward,
    }));
    return res.json(resPendingTxs);
});

module.exports = router;
