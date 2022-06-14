const express = require("express");
const router = express.Router();
const axios = require("axios");

const apiKey = "";

router.get("/pictures", async (req, res) => {
  try {
    const response = await axios.get(``);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("pictures/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `http://urltest.com/pictures/${req.fields.id}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});
