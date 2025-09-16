
import assignmentModel from '../models/assignementModel.js';
import fs from 'fs'


const addAssignment = async(req,res)=>{
  const assignment = new assignmentModel({
    course:req.body.course,
    topic: req.body.topic,
    deadline: req.body.deadline,
    section: req.body.section,
    additional: req.body.additional

  })

  try{
      await assignment.save();
      res.json({success:true,message:"Assignment Added"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchAssignment = async (req,res)=>{
  try{
      const assignment =await assignmentModel.find(); 
      res.json({success:true,message:assignment});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const updateAssignment = async (req,res)=>{
  try{
      await assignmentModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Assignment Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteAssignment = async (req,res)=>{
  try{
      await assignmentModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Assignment Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}


export {addAssignment,fetchAssignment,updateAssignment,deleteAssignment};