import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

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

export default { registerUser };