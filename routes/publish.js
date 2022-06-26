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

      // Save thumbnail if the picture is on portrait format
      if (req.fields.format === "portrait") {
        const thumbnail = await cloudinary.uploader.upload(
          req.files.picture.path,
          // { transformation: { width: 673, height: 1000 } },
          {
            folder: "MyProject/thumbnails",
            id: newPublish._id,
          }
        );
        newPublish.thumbnail = thumbnail;

        // Save thumbnail if the picture is on landscape format
      } else if (req.fields.format === "landscape") {
        const thumbnail = await cloudinary.uploader.upload(
          req.files.picture.path,
          // { transformation: { width: 1000, height: 673 } },
          {
            folder: "MyProject/thumbnail",
            id: newPublish._id,
          }
        );
        newPublish.thumbnail = thumbnail;
      }

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
    res.status(200).json({ message: "Please fill all fields" });
  }
});

module.exports = router;
