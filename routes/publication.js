const express = require("express");
const Picture = require("../models/Picture");
const router = express.Router();

router.get("/publication/:id", async (req, res) => {
  try {
    const publication = await Picture.findById(req.params.id);
    if (publication) {
      res.json(publication);
    } else {
      res.status(400).json({ message: "No publication found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
