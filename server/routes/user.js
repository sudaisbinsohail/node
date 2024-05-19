import {Router} from 'express';
import  {registerUser , loginUser , refresh}  from '../controller/user.js';

import { cloudinary, storage } from '../utils/cloudaniryUpload.js';
import multer from 'multer';

const userRouter = Router();

const upload = multer({storage})


userRouter.post('/addUser', upload.single("storage"), (req, res, next) => {
    const image_url = req.file ? req.file.path : null;
    registerUser(req, res, image_url);
  });
userRouter.post('/login' , loginUser)
userRouter.post('/refresh' , refresh)

export  default userRouter
