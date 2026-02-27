import onlineClassModel from "../models/onlineClassModel.js";

const addOnlineClass = async(req,res)=>{
  const onlineClass = new onlineClassModel({
    course:req.body.course,
    date: req.body.date,
    time: req.body.time,
    section: req.body.section,
    link: req.body.link,
    additional: req.body.additional
  })

  try{
      await onlineClass.save();
      res.json({success:true,message:"Online Class Added"});
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchOnlineClass = async (req,res)=>{
  try{
      const onlineClass =await onlineClassModel.find(); 
      res.json({success:true,message:onlineClass});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  } 
}

const updateOnlineClass = async (req,res)=>{
  try{
      await onlineClassModel.findByIdAndUpdate(req.params.id, req.body);
      res.json({success:true,message:"Online Class Updated"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteOnlineClass = async (req,res)=>{
  try{
      await onlineClassModel.findByIdAndDelete(req.params.id);
      res.json({success:true,message:"Online Class Deleted"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addOnlineClass,fetchOnlineClass,updateOnlineClass,deleteOnlineClass};
