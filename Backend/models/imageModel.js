import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    img:{type:String,required:true},
    title:{type:String},
    serial:{type:Number}
})

const imageModel= mongoose.models.image || mongoose.model("image",imageSchema);

export default imageModel;