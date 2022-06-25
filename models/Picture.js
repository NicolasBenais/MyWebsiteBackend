const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  title: String,
  date: String,
  location: String,
  format: String,
});

module.exports = Picture;
