import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async()=>{
 try {
  const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
  console.log(`\n MongoDB connected !! DB HOst: ${connectionInstance.connection.host}`);
 } catch (error) {
  console.log("MongoDb connection error", error);
  process.exit(1)
 }
}

export default connectDB