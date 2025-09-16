import imageModel from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const addImage = async (req, res) => {
  try {
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my_uploads"
    });

    const image = new imageModel({
      img: result.secure_url,
      title: req.body.title,
      serial:req.body.serial
    });

    await image.save();

  
    fs.unlinkSync(req.file.path);

    res.json({ success: true, message: "Image Added", data: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error uploading image" });
  }
};

const fetchImage = async (req, res) => {
  try {
    const images = await imageModel.find();
    res.json({ success: true, message: images });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching images" });
  }
};

export { addImage, fetchImage };
