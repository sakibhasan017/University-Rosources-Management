import mongoose from 'mongoose'

const connetDB = async ()=> {
  await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB Connected"))
}


export default connetDB;