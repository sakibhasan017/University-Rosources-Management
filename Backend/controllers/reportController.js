import reportModel from "../models/reportModel.js";

const addReport = async(req,res)=>{
  const report = new reportModel({
    course:req.body.course,
    topic: req.body.topic,
    date: req.body.date,
    section: req.body.section,
    additional: req.body.additional

  })
  try{
      await report.save();
      res.json({success:true,message:"Report Added"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchReport = async (req,res)=>{
  try{
      const report =await reportModel.find(); 
      res.json({success:true,message:report});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const updateReport = async (req,res)=>{
  try{
      await reportModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Report Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  } 
}

const deleteReport = async (req,res)=>{
  try{
      await reportModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Report Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addReport,fetchReport,updateReport,deleteReport};