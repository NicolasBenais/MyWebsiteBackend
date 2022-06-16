require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");

const app = express();
app.use(formidable());

const publishRoutes = require("./routes/publish");
app.use(publishRoutes);

const picturesRoutes = require("./routes/pictures");
app.use(picturesRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(process.env.PORT, () => {
  console.log("Serveur has started");
});

// app.listen(4000, () => {
//   console.log("Serveur Started");
// });
