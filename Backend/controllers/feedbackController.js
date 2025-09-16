
import feedbackModel from '../models/feedbackModel.js';
import fs from 'fs';


const addFeedback = async(req,res)=>{
  
  try{
    const feedback = new feedbackModel({
      name:req.body.name,
      email:req.body.email,
      message: req.body.message
  })

      await feedback.save();
      res.json({success:true,message:"Feedback transferred successful"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchFeedback = async (req,res)=>{
  try{
      const feedback =await feedbackModel.find(); 
      res.json({success:true,message:feedback});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const updateFeedback = async (req,res)=>{
  try{
      await feedbackModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Feedback Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteFeedback = async (req,res)=>{
  try{
      await feedbackModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Feedback Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addFeedback,fetchFeedback,updateFeedback,deleteFeedback};

