import personnelModel from "../models/personnelModel.js";

const addPersonnel=async(req,res)=>{
  try{
  const newPersonnel=new personnelModel({
  name:req.body.name,
  designation:req.body.designation,
  phone:req.body.phone,
  email:req.body.email,
  roomNo:req.body.roomNo
  })

  await newPersonnel.save();
  res.json({success:true,message:"Personnel Added"});
}catch(err){
  console.log(err);
  res.json({success:false,message:"Error"});
}

}

const fetchPersonnel=async(req,res)=>{
  try{
    const personnel=await personnelModel.find();
    res.json({success:true,message:personnel});
  }catch(err){
  console.log(err);
  res.json({success:false,message:"Error"});
  }
}


export {addPersonnel,fetchPersonnel};