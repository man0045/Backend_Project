import dotenv from "dotenv"

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";

dotenv.config({
 path: './env'
})



connectDB()
.then(()=> {
 app.listen(process.env.PORT || 8000, ()=> {
  console.log(`Servewr is running at port: ${process.env.PORT}`);
 })
 app.on("error",(error)=>{
  console.log("Error",error)
  throw error
 })
})
.catch((err)=>{
 console.log("MongoDb connection failed !!!", err);
})

































// import { express } from "express"
// const app = express()

// (async()=>{
//  try {
//   await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//   app.on("errror",(error)=>{
//    console.log("Error", error)
//    throw error
//   })
//   app.listen(process.env.PORT,()=>{
//    console.log(`port is running on port number ${process.env.PORT}`);
//   })

//  } catch (error) {
//   console.error("ERROR ", error)
//   throw err
  
//  }
// })()   ///this is known as eefii 