require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI);

// This route to call all of the pictures in data base
const picturesRoutes = require("./routes/pictures");
app.use(picturesRoutes);

// -------- BACKOFFICE --------

// Login
const loginRoutes = require("./routes/login");
app.use(loginRoutes);

// This route to publish a new picture
const publishRoutes = require("./routes/publish");
app.use(publishRoutes);

// This route to see the picture you just publied
const publicationRoutes = require("./routes/publication");
app.use(publicationRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Serveur has started");
});
