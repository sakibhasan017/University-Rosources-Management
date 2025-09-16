import profileModel from "../models/profileModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import bcrypt from "bcryptjs";


const addProfile = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images"
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const hashedKey = await bcrypt.hash(req.body.secretKey, 10);

    const profile = new profileModel({
      name: req.body.name,
      studentId: req.body.studentId,
      email: req.body.email,
      phone: req.body.phone,
      bio: req.body.bio,
      bloodGroup: req.body.bloodGroup,
      socialLinks: req.body.socialLinks ? JSON.parse(req.body.socialLinks) : [],
      img: imageUrl,
      secretKey: hashedKey
    });

    await profile.save();
    res.json({ success: true, message: "Profile created successfully", data: profile });
  } catch (error) {
    console.error("Error adding profile:", error);
    res.status(500).json({ success: false, message: "Error creating profile" });
  }
};


const fetchProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.find();
    res.json({ success: true, data: profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching profiles" });
  }
};

const fetchSingleProfile = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    let imageUrl = profile.img;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_images"
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    let updatedData = {
      ...req.body,
      socialLinks: req.body.socialLinks ? JSON.parse(req.body.socialLinks) : profile.socialLinks,
      img: imageUrl
    };

    if (req.body.secretKey && req.body.secretKey.trim() !== "") {
      const isSame = await bcrypt.compare(req.body.secretKey, profile.secretKey);
      if (!isSame) {
        updatedData.secretKey = await bcrypt.hash(req.body.secretKey, 10);
      } else {
        delete updatedData.secretKey; 
      }
    } else {
      delete updatedData.secretKey;
    }


    const updatedProfile = await profileModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({ success: true, message: "Profile updated successfully", data: updatedProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};



const deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    res.json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting profile" });
  }
};


const verifySecretKey = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const isMatch = await bcrypt.compare(req.body.secretKey, profile.secretKey);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid secret key" });
    }

    res.json({ success: true, message: "Secret key is valid" });
  } catch (error) {
    console.error("Error verifying secret key:", error);
    res.status(500).json({ success: false, message: "Error verifying secret key" });
  }
};

export { addProfile, fetchProfiles, updateProfile, deleteProfile,fetchSingleProfile,verifySecretKey };
