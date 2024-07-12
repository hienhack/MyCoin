const express = require("express");
const EC = require("elliptic");

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
        res.status(400).json({ error: "Public and private keys are required" });
    }

    const key = ec.keyFromPublic(publicKey, "hex");
    if (!key.verify(publicKey, privateKey)) {
        res.status(400).json({ error: "Invalid public key" });
    }

    res.status(200).json({ privateKey, publicKey });
});

module.exports = router;