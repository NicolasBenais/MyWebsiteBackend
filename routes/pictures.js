const express = require("express");
const router = express.Router();

const apiKey = "";

router.get("/pictures", async (req, res) => {
  try {
    const response = await axios.get(``);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
