
import calendarModel from '../models/calendarModel.js';
import fs from 'fs'


const addCalendar = async(req,res)=>{
  const formattedDate = moment(req.body.date, ["MM/DD/YYYY", "YYYY-MM-DD"])
      .tz("Asia/Dhaka")
      .format("YYYY-MM-DD");

  const calendar = new calendarModel({
    title: req.body.title,
    date: formattedDate,
    section: req.body.section

  })

  try{
      await calendar.save();
      res.json({success:true,message:"Event Added"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchCalendar = async (req,res)=>{
  try{
      const calendar =await calendarModel.find(); 
      res.json({success:true,message:calendar});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const updateCalendar = async (req,res)=>{
  try{
      await calendarModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Calendar Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteCalendar = async (req,res)=>{
  try{
      await calendarModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Calendar Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addCalendar,fetchCalendar,updateCalendar,deleteCalendar};
