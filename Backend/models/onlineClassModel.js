import mongoose from "mongoose";

const onlineClassSchema =new mongoose.Schema({
    course:{type:String,required:true},
    date: {type:String},
    time: {type:String},
    section: {type:String,required:true},
    link: {type:String},
})

const onlineClassModel= mongoose.models.onlineClasses || mongoose.model('onlineClasses',onlineClassSchema);

export default onlineClassModel;