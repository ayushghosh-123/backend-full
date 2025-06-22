import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import {uploadOnCloudinary} from '../utils/Cloudinary.js'
import {ApiResponse} from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  //validation - not empty 
  // check if already exists: username , email
  // check for images , check for avatar
  // upload them to cloudinary , avatar
  // create user object - create in db
  // remove pasword and refresh token field from response
  // check user creation
  // return res

  const {fullname , email, username, password}  = req.body
  console.log(req.body)
  console.log("email: ", email);

  //  if(fullname === ""){
  //   throw new ApiError(400, "full name is required")
  // }

  if([fullname, email, username, password].some((field) => 
        field?.trim() === "")){
          throw new ApiError(400, "fullname is required")
  }

  const existedUser = UserModel.findOne({
    $or: [{ username }, { email }, ]
  })
  
  console.log(existedUser)

  if(existedUser){
    throw new ApiError(409, "user with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath && !coverImageLocalPath) {
      throw new ApiError(400, "Avatar  and cover file is require ")    
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverimage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar && !coverimage){
    throw new ApiError(400, "Avatar and coverImage file is require")
  }

  const user = await UserModel.create({fullname, 
    avatar: avatar.url,
    coverImage: coverimage.url,
    email,
    password,
    username: username.toLowercase()
  })

 const createdUser = await UserModel.findById(user._id).select(
  "-password -refreshToken"
 )

 if(!createdUser){
    throw new ApiError(500, "something went wrong while registring the user")
 }

  return res.status(201).json(
      new ApiResponse(200, "user register successfully ")
  )

});

export default { registerUser };
