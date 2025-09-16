
import notifyModel from '../models/notifyModel.js';
import fs from 'fs';
import validator from 'validator';


const addNotify = async(req,res)=>{
  const {email}=req.body;
  
  try{
      const exist=await notifyModel.findOne({email});
    if(exist){
        return res.json({success:false,message:"Email Already Exist"})
    }

    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter Valid Email"})
    }

    const notify = new notifyModel({
      name:req.body.name,
      email:req.body.email,
      section: req.body.section
  })

      await notify.save();
      res.json({success:true,message:"Email added successful"});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const fetchNotify = async (req,res)=>{
  try{
      const notify =await notifyModel.find(); 
      res.json({success:true,message:notify});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export {addNotify,fetchNotify};