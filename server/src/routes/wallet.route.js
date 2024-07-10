const express = require("express");
const EC = require("elliptic");
const walletModel = require("../schemas/wallet.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = express.Router();
const ec = new EC.ec("secp256k1");

router.post('/create', (req, res) => {
    const { password } = req.body;
    if (!password) {
        res.status(400).json({ error: "Password is required" });
    }

    const key = ec.genKeyPair();
    const publicKey = key.getPublic("hex");
    const privateKey = key.getPrivate("hex");

    const privateKeyPassword = bcrypt.hashSync(password, 10);

    // Save the wallet to the database
    const wallet = new walletModel({ privateKeyPassword });
    wallet.save();

    res.status(200).json({ publicKey, privateKey });
});

router.post('/access', async (req, res) => {
    const { privateKey, password } = req.body;
    if (!privateKey || !password) {
        res.status(400).json({ error: "Private key is required" });
    }

    const privateKeyPassword = bcrypt.hashSync(password, 10);
    try {
        const wallet = await walletModel.findOne({ privateKeyPassword });
    } catch (error) {
        res.status(400).json({ error: "Private key or password incorrect!" });
    }

    const key = ec.keyFromPrivate(privateKey);
    const publicKey = key.getPublic("hex");

    const payload = { privateKey };

    const token = jwt.sign({ privateKey, }, JWT_SECRET);

    res.status(200).json({ publicKey });
});

module.exports = router;