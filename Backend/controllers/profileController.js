import profileModel from "../models/profileModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendMail from "../utils/mailer.js";


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

const resetSecretKey = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const newSecret = crypto.randomBytes(5).toString("hex"); 

    const hashed = await bcrypt.hash(newSecret, 10);
    profile.secretKey = hashed;
    await profile.save();

    const adminEmail = profile.email;
    const subject = "🔐 Secret Key Reset Request";
    const body = `
      <h3>User requested secret reset</h3>
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Student ID:</strong> ${profile.studentId}</p>
      <p><strong>NEW TEMP SECRET:</strong></p>
      <h2>${newSecret}</h2>
      <p>Please give this secret to the user.</p>
    `;

    await sendMail(adminEmail, subject, body, true);

    res.json({
      success: true,
      message: "A new secret key has been sent to your mail. Please check. If you face any problems, please contact the admin."
    });

  } catch (error) {
    console.error("Reset secret error:", error);
    res.status(500).json({ success: false, message: "Failed to reset secret key" });
  }
};

const changeSecretByAdmin = async (req, res) => {
  try {
    const { adminPassword, newSecret } = req.body;
    if (!adminPassword || !newSecret) {
      return res.status(400).json({ success: false, message: "adminPassword and newSecret are required" });
    }

    const adminPassEnv = process.env.ADMIN_PASSWORD || "";
    let isAdmin = false;

    try {
      if (adminPassEnv) {
        isAdmin = await bcrypt.compare(adminPassword, adminPassEnv);
      }
    } catch (e) {
      isAdmin = adminPassword === adminPassEnv;
    }
    if (!isAdmin) {
      if (adminPassEnv && adminPassword === adminPassEnv) {
        isAdmin = true;
      }
    }

    if (!isAdmin) {
      return res.status(401).json({ success: false, message: "Invalid admin password" });
    }

    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const hashed = await bcrypt.hash(newSecret, 10);
    profile.secretKey = hashed;
    await profile.save();

    const adminEmail = profile.email
    const subject = `Secret changed for user: ${profile.name}`;
    const body = `
      <p>The secret for the following user has been changed by admin:</p>
      <ul>
        <li><strong>Name:</strong> ${profile.name}</li>
        <li><strong>User ID:</strong> ${profile._id}</li>
        <li><strong>Email:</strong> ${profile.email}</li>
      </ul>
      <p>The final secret (as provided by admin) was set successfully.</p>
    `;
    await sendMail(adminEmail, subject, body, true);

    return res.json({ success: true, message: "Secret changed successfully by admin" });
  } catch (error) {
    console.error("Error in changeSecretByAdmin:", error);
    return res.status(500).json({ success: false, message: "Error changing secret by admin" });
  }
};

export { addProfile, fetchProfiles, updateProfile, deleteProfile,fetchSingleProfile,verifySecretKey, resetSecretKey, changeSecretByAdmin };
