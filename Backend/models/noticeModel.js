import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title:{type:String, required:true},
  extraInfo:{type:String},
  date:{type:String},
  section:{type:String,required:true},
  additional:{type:String},
  link:{type:String}
})

const noticeModel= mongoose.models.notice || mongoose.model("notice",noticeSchema);

export default noticeModel;