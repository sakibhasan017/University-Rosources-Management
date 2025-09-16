import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: {type:String},
  email: {type:String},
  message: {type:String,required:true}
})

const feedbackModel= mongoose.models.feedback || mongoose.model("feedback",feedbackSchema);

export default feedbackModel;