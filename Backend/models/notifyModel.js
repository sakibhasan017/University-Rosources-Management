import mongoose from "mongoose";

const notifySchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true,unique:true},
  section: {type:String,required:true}
})

const notifyModel= mongoose.models.notify || mongoose.model("notify",notifySchema);

export default notifyModel;