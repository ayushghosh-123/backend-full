import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extedeed: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes

import router from './routes/User.routes.js'


// routes declaration
app.use("/api/v1/users", router);

export default  app