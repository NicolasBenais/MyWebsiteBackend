require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(formidableMiddleware);
app.use(morgan("dev"));
app.use(cors());

const publishRoutes = require("./routes/publish");
app.use(publishRoutes);

const picturesRoutes = require("./routes/pictures");
app.use(picturesRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(4000, () => {
  console.log("Serveur Started");
});