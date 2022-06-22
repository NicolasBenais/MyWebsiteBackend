const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Publish = require("../models/Picture");

router.post("/publish", async (req, res) => {
  if (
    req.fields.date &&
    req.fields.location &&
    req.fields.film &&
    req.fields.camera &&
    req.fields.lens &&
    req.files.picture
  ) {
    try {
      const newPublish = new Publish({
        date: req.fields.date,
        location: req.fields.location,
        film: req.fields.film,
        camera: req.fields.camera,
        lens: req.fields.lens,
      });

      const picture = await cloudinary.uploader.upload(req.files.picture.path, {
        folder: "MyProject",
        id: newPublish._id,
      });

      newPublish.image = picture;

      await newPublish.save();

      const response = {
        id: newPublish._id,
        date: newPublish.date,
        location: newPublish.location,
        film: newPublish.film,
        camera: newPublish.camera,
        lens: newPublish.lens,
        picture: newPublish.image,
      };

      res.json(response);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(200).json({ message: "Please fill all fields" });
  }
});

module.exports = router;
