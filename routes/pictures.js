const express = require("express");
const router = express.Router();

// Model
const Picture = require("../models/Picture");

router.get("/pictures", async (req, res) => {
  try {
    let limit = 12;

    const pictures = await Picture.find().limit(limit);
    res.status(200).json(pictures);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
