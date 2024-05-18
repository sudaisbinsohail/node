import {Router} from 'express';
import  {registerUser , loginUser , refresh}  from '../controller/user.js';

const userRouter = Router();

userRouter.post('/addUser' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.post('/refresh' , refresh)

export  default userRouter
