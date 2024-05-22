import express from 'express';
import mongoose from 'mongoose'
import userRouter from './server/routes/user.js';
import CustomError from './server/utils/customError.js';
import globalError from './server/controller/errorController.js'
import cors from 'cors'
import dotenv from 'dotenv';
import {Server}  from 'socket.io';
import http from 'http'
import jwt from 'jsonwebtoken'
import { handleSocketConnections } from './server/utils/socketConnection.js';

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
const server = http.createServer(app);
const io = new Server(server)
handleSocketConnections(io)
let host = "0.0.0.0"
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

server.listen(8080 , host,()=>{
    console.log("server is running....." );
})
