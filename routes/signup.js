const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { email, password } = req.fields;

  try {
    if (!email) {
      req.statusCode(400).json({ message: "No username" });
    } else {
      const salt = uid2(64);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = new User({
        email,
        salt,
        hash,
        token,
      });
      await newUser.save();

      res.json({ mesage: "Account created" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
