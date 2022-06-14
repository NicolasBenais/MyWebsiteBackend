const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  date: String,
  location: String,
  film: String,
  camera: String,
  Lens: String,
  tags: Array,
});

module.exports = Picture;
