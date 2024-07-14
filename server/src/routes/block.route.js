const express = require("express");
const MyCoin = require("../../blockchain/MyCoin");

const router = express.Router();

router.get("/", (req, res) => {
    return res.status(200).json(MyCoin.chain);
});

router.get("/:index", (req, res) => {
    const { index } = req.params;

    try {
        const idx = parseInt(index);
        const block = MyCoin.chain[idx];
        return res.status(200).json(block);
    } catch (e) {
        return res.status(400).json({ message: "Invalid index" });
    }
});

module.exports = router;
