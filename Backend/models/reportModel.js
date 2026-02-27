import mongoose from "mongoose";

const reportSchema =new mongoose.Schema({
    course:{type:String,required:true},
    topic: {type:String,required:true},
    date: {type:String},
    section: {type:String,required:true},
    additional: {type:String}
  })

const reportModel= mongoose.models.reports || mongoose.model('reports',reportSchema);

export default reportModel;