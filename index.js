import express from 'express';
import mongoose from 'mongoose'
import userRouter from './server/routes/user.js';
import {userModel} from './server/Model/user.js';
import CustomError from './server/utils/customError.js';
import globalError from './server/controller/errorController.js'


const app = express()
app.use(express.json())

app.use('/api' , userRouter)
app.use('*' , (req,res,next)=>{
    const error = new CustomError(`cannot find url ${req.originalUrl}` , 200)
    next(error)
})
app.use(globalError)









mongoose.connect('mongodb+srv://sudaisbinsohail:2uCJ91k3qvbUYHN1@cluster0.w4y6vpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch((err)=>
{
    console.log("Database Connection error",err)
})

app.listen(3000 , ()=>{
    console.log("server is running....." );
   
})