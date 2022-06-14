const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Publish = require("../models/Picture");

router.post("/picture/publish", async (req, res) => {
  try {
    const newPublish = new Publish({
      date,
      location,
      film,
      camera,
      lens,
      tags,
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
      tags: newPublish.tags,
      picture: newPublish.image,
    };

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
