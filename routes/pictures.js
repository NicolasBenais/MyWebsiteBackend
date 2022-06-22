const express = require("express");
const router = express.Router();

// Model
const Picture = require("../models/Picture");

router.get("/pictures", async (req, res) => {
  try {
    let limit = 12;
    if (req.query.limit) {
      limit = limit + req.query.limit;
    }

    const pictures = await Picture.find().sort({ fields: -1 }).limit(limit);

    res.status(200).json(pictures);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
