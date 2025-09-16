
import noticeModel from "../models/noticeModel.js";
import fs from 'fs'


const addNotice = async(req,res)=>{
  const notice = new noticeModel({
      title:req.body.title,
      extraInfo:req.body.extraInfo,
      date:req.body.date,
      section:req.body.section,
      additional:req.body.additional,
      link:req.body.link,

  })

  try{
      await notice.save();
      res.json({success:true,message:"Notice Added"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchNotice = async (req,res)=>{
  try{
      const notice =await noticeModel.find(); 
      res.json({success:true,message:notice});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const updateNotice = async (req,res)=>{
  try{
      await noticeModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Notice Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteNotice = async (req,res)=>{
  try{
      await noticeModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Notice Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addNotice,fetchNotice,updateNotice,deleteNotice};