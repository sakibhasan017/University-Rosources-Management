import mongoose from "mongoose";

const assignmentSchema =new mongoose.Schema({
    course:{type:String,required:true},
    topic: {type:String,required:true},
    deadline:{type:String},
    section: {type:String,required:true},
    additional: {type:String}
  })

  const assignmentModel= mongoose.models.assignments || mongoose.model('assignments',assignmentSchema);

  export default assignmentModel;