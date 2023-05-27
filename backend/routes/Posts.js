const express = require('express');
const router = express.Router();
const { users } = require('../models');

router.get("/", async (req, res) => {
    // res.json("hallo")
    res.json(await users.findAll());
});


router.post("/", async (req, res) => {
    const post = req.body;
    await users.create(post);
    res.json(post);
})

// router.post()

module.exports = router;