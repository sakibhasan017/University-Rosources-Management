import mongoose from 'mongoose'

const personnelSchema=new mongoose.Schema({
  name:{type:String,required:true},
  designation:{type:String,required:true},
  phone:{type:String},
  email:{type:String},
  roomNo:{type:String}
})

const personnelModel=mongoose.models.personnel || mongoose.model('personnel',personnelSchema);

export default personnelModel;