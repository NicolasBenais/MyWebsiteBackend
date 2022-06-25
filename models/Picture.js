const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  date: String,
  location: String,
  format: String,
});

module.exports = Picture;
