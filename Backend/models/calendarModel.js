import mongoose from "mongoose";

const calendarSchema =new mongoose.Schema({
    title: {type:String,required:true},
    date:{type:String,required:true},
    section: {type:String,required:true}
    
  })

  const calendarModel= mongoose.models.calendar || mongoose.model('calendar',calendarSchema);

  export default calendarModel;