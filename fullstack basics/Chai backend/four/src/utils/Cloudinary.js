import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

 cloudinary.config({ 
        cloud_name: process.env.COUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    const uploadOnCloudinary = async (localFIlePath) => {
        try {
            if(!localFIlePath) return null
            // upload thefile on cloudinary
           const response = await cloudinary.uploader.upload(localFIlePath, {
                resource_type: "auto"
            })

            // file has been be uploaded succesfully
            console.log("file is uploaded on cloudinary", response.secure_url);
            return response
        } catch (error) {
            fs.unlinkSync(localFIlePath) // remove the localy saved temporary file as the upload operation go failed 
        }
    }

    export { uploadOnCloudinary }