import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js"; // make sure it's lowercase if file is named DB.js

dotenv.config({
  path: ".env", // Make sure your .env file exists at project root
});

connectDB();























// import express from "express";
// const app = express()
// function connectDB(){}
//  connectDB()
// // efe style
// ;(async () =>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("errror", ()=>{
//             console.log("ERR:", error)
//             throw error
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("Error:", error)
//         throw err
//     }
// })()