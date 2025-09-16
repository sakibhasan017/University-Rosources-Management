import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String},
  url: { type: String}
});

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  bio: { type: String },
  bloodGroup:{type:String,required:true},
  socialLinks: [socialLinkSchema],
  img: { type: String }, 
  secretKey:{type:String,required:true}
});

const profileModel= mongoose.models.profile || mongoose.model("profile",profileSchema);

export default profileModel;