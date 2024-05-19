import express from 'express';
import mongoose from 'mongoose'
import userRouter from './server/routes/user.js';
import {userModel} from './server/Model/user.js';
import CustomError from './server/utils/customError.js';
import globalError from './server/controller/errorController.js'
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())
// let host = "192.168.1.23"
// let host = " 192.168.1.54"
app.use('/api' , userRouter)
app.use('*' , (req,res,next)=>{
    const error = new CustomError(`cannot find url ${req.originalUrl}` , 200)
    next(error)
})
app.use(globalError)

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch((err)=>
{
    console.log("Database Connection error",err)
})

app.listen(8000 , ()=>{
    console.log("server is running....." );
   
})