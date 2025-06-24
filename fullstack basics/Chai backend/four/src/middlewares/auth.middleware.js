import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"

export const verifyJwt = asyncHandler(async(req, resizeBy, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET)
    
        const user = await UserModel.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            // dicuss about frontend 
            throw new ApiError(401, "Invalid Acess Token")
        }
    
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid acess Token")
    }
})

export default verifyJwt