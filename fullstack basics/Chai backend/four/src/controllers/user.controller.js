import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

// to make refresh and acess token 

const generateAcessAndRefreshToken = async(userId) => {
  try {
      const user = await UserModel.findById(userId)

      const AcessToken =  user.generateAccessToken()
      const refreshToken =  user.generateRefreshToken()

      // console.log(AcessToken)
      // console.log(refreshToken)

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave : false})

      return{ AcessToken, refreshToken }
      
  } catch (error) {
     throw new ApiError(500, "Internal server error for acess and refresh token")
  }
}


// for registetr the user 
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log(req.body);

  if ([fullName, email, username, password].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  console.log(avatarLocalPath," ", coverImageLocalPath)
  if (!avatarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "Avatar and cover file are required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverimage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar || !coverimage) {
    throw new ApiError(400, "Avatar and coverImage file upload failed");
  }

  const user = await UserModel.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverimage.url,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await UserModel.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user",);
  }

  return res.status(201).json(new ApiResponse(200, "User registered successfully"));
});


// for loggin the users 
const loginUser = asyncHandler(async(req, res)=> {

  // algoritm 
  // give your email and password as a input
  // severver  mai jake dtatabae mai match karenga email and password ko
  // agar koi ek match nahi hua to api error bhej denga 
  // acess and refresh token generate 
  // give some token as refresh to authorization for applications and acess token to acess those time by the formof cookie

  const {email, username, password} = req.body;

  if(!email && !username && !password){
      throw new ApiError(400, "username , password and email required also")
  }

  const user = await UserModel.findOne({$or : [{username},{password}]})

  if(!user && !password){
    throw new ApiError(404, "user and password does not exists");
  }

  const isPasswordvalate = await user.isPasswordCorrect(password)

  if(!isPasswordvalate){
    throw new ApiError(401, "Invalid uaser credantials")
  }

  const {AcessToken , refreshToken} = await generateAcessAndRefreshToken(user._id)

  const loggedInUser = await UserModel.findById(user._id).select("-password -refreshToken")

  const option = {
    httpOnly : true,
    secure: true
  } 

  return res.status(200).cookie("accessToken", AcessToken, option).cookie("refreshToken", refreshToken, option).json(new ApiResponse(200, {user: loggedInUser, AcessToken,refreshToken}, "User logged in succesfully "))
})


// for logout the users 

const logOutUser = asyncHandler(async(req, res)=> {
    // algorithm 
    // cookies clearkaarna hoga
    // token CLEAR KARNA HOGA


    // console.log(req.user)
    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
           refreshToken: undefined
        }
      },

      {
        new : true
      }
    )

    const option = {
    httpOnly : true,
    secure: true
  } 

  return res.status(200).clearCookie("acessToken", option).clearCookie("refreshToken", option).json(new ApiResponse(200, {}, "user logged out succesfully"))

    
})


// refresh the acess token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await UserModel.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "User not found with this token");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token mismatch or expired");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, newRefreshToken } = await generateAcessAndRefreshToken(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(new ApiResponse(200, { accessToken, newRefreshToken }, "Access token refreshed successfully"));
});


export default { registerUser, loginUser, logOutUser , refreshAccessToken };