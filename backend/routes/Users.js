const express = require('express');
const router = express.Router();
const { users } = require('../models');
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 12).then((hash) => {
        users.create({
            name: name,
            email: email,
            password: hash
        });
        res.json("SUCCESS");
    });
});

router.post("/login", async (req, res) => {
    try {
             const { email, password } = req.body;
        const user = await users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ error: "pengguna tidak ditemukan" });
        }

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.status(401).json({ error: "Password salah" });
            }

            res.json("login berhasil");
        });
    } catch (error) {
        return res.json({ error: "EmailPassword salah" });
    }
    // const { email, password } = req.body;

    // const user = await users.findOne({ where: { email:email } });
    // if (!user) res.json({ error: "pengguna tidak ditemukan" });

    // bcrypt.compare(password, user.password).then((match) => {
    //     if (!match) res.json({error: "Password salah"});

    //     res.json("login berhasil");
    // });
});

// router.post()

module.exports = router;