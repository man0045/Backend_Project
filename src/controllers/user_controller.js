import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import user_model from "../models/user_model.js"
import { uploadOncloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res)=>{
  //get user details from frontend  
  // validation
  // check if user already exist: username
  // check for images
  // check for avatars, upload at cloudinary
  // create userObject - create entry in db
  //remove password and refresh token field from response

  // check for user creation
  // return res
  const {fullName, email, username, password} = req.body
  console.log("Email: ", email);

  if([fullName, email, username, password].some((field)=>
   field?.trim() == "") 
   ){
    throw new ApiError(400, 'All fields are required')
   }
   const existedUser = user_model.findOne({
    $or:[{username}, {email}]
   })
   if(existedUser){
    throw new ApiError(409, "Data Already Existed")
   }


   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImagePath = req.files?.coverImaage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }
   const avatar = await uploadOncloudinary(avatarLocalPath)
   const coverImage = await uploadOncloudinary(coverImagePath)

   if(!avatar){
    throw new ApiError(400, "Avatar file is required")
   }
   const user = await user_model.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

   const createdUser = await user_model.findById(user._id).select(
    "-password -refreshToken"    
   )
   if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the User")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registerd Successfully")
   )

})


export {
 registerUser,
}