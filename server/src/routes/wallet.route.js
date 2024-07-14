const express = require("express");
const EC = require("elliptic");
const MyCoin = require("../../blockchain/MyCoin");

const router = express.Router();
const ec = new EC.ec("secp256k1");

router.post('/create', (req, res) => {
    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");

    res.status(200).json({ publicKey, privateKey });
});

router.post('/access', async (req, res) => {
    const { privateKey, publicKey } = req.body;
    if (!privateKey || !publicKey) {
        res.status(400).json({ message: "Public and private keys are required" });
    }

    try {
        const key = ec.keyFromPrivate(privateKey);
        if (key.getPublic("hex") !== publicKey) {
            res.status(400).json({ message: "Invalid keys" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid keys" });
    }

    const balance = MyCoin.getBalance(publicKey);
    res.status(200).json({ privateKey, publicKey, balance });
});

module.exports = router;