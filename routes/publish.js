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
    req.files.picture &&
    req.files.thumbnail &&
    req.fields.title &&
    req.fields.date &&
    req.fields.location &&
    req.fields.format
  ) {
    try {
      const newPublish = new Publish({
        title: req.fields.title,
        date: req.fields.date,
        location: req.fields.location,
        format: req.fields.format,
      });

      const picture = await cloudinary.uploader.upload(req.files.picture.path, {
        folder: "MyProject/pictures",
        id: newPublish._id,
      });
      newPublish.picture = picture;

      const thumbnail = await cloudinary.uploader.upload(
        req.files.thumbnail.path,
        {
          folder: "MyProject/thumbnail",
        }
      );
      newPublish.thumbnail = thumbnail;

      await newPublish.save();

      const response = {
        id: newPublish._id,
        picture: newPublish.picture,
        thumbnail: newPublish.thumbnail,
        title: newPublish.title,
        date: newPublish.date,
        location: newPublish.location,
        format: newPublish.format,
      };

      res.json(response);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(400).json({ message: "Please fill all fields" });
  }
});

module.exports = router;
