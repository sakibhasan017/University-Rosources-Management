
import examModel from '../models/examModel.js';
import fs from 'fs'


const addExam = async(req,res)=>{
  const exam = new examModel({
    course:req.body.course,
    topic: req.body.topic,
    date: req.body.date,
    time: req.body.time,
    section: req.body.section,
    examType:req.body.examType,
    additional: req.body.additional

  })

  try{
      await exam.save();
      res.json({success:true,message:"Exam Added"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchExam = async (req,res)=>{
  try{
      const exam =await examModel.find(); 
      res.json({success:true,message:exam});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const updateExam = async (req,res)=>{
  try{
      await examModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Exam Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteExam = async (req,res)=>{
  try{
      await examModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Exam Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addExam,fetchExam,updateExam,deleteExam};

