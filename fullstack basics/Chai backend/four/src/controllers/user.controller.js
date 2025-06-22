import { asyncHandler } from "../utils/asyncHandler.js";
import UserModel from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"

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
  console.log("email: ", email);

  //  if(fullname === ""){
  //   throw new ApiError(400, "full name is required")
  // }

  if([fullname, email, username, password].some((field) => 
        field?.trim() === "")){
          
      }

});

export default { registerUser };
