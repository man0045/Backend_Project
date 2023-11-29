import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"

const user = new mongoose.Schema({
 username : {
  type: String,
  required:true,
  unique: true,
  lowercase:true,
  trim:true,
  index:true
 },
 email : {
  type: String,
  required:true,
  unique: true,
  lowercase:true,
  trim:true
 },
 fullname : {
  type: String,
  required:true,
  trim: true,
  index: true
 },
 avatar: {
  type: String,
  required:true
 },
 coverImage: {
  type: String
 },
 watchHistory: [
  {
   type: mongoose.Schema.Types.ObjectId,
   ref:"Video"
  }
 ],
 password: {
  type:String,
  required: [true, 'Paassword is mus']
 },
 refreshToken: {
  type: String
 }
},
{timestamps: true})


userSchema.pre("save", async function (next) {
 if(!this.isModified("password")) return next();
 this.password = bcrypt.hash(this.password, 10)
 next()
})
userSchema.methods.isPasswordCorrect = async function
(password){
 return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
 return jwt.sign(
  {
   __id: this._id,
   email: this.email,
   username: this.username,
   fullname: this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
   expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
 )
}
userSchema.methods.generateRefreshToken = function(){
 return jwt.sign(
  {
   __id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
   expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
 )
}

export const user_model = mongoose.model("user_model", user);