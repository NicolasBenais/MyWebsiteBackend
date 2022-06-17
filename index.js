require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

// This route to publish a new picture
const publishRoutes = require("./routes/publish");
app.use(publishRoutes);

// This route to call all of the pictures in data base
const picturesRoutes = require("./routes/pictures");
app.use(picturesRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Serveur has started");
});
