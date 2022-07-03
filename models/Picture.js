const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  picture: { type: mongoose.Schema.Types.Mixed, default: {} },
  thumbnail: { type: mongoose.Schema.Types.Mixed, default: {} },
  title: String,
  date: String,
  location: String,
});

module.exports = Picture;
