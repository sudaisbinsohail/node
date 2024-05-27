import {userModel , userRegisterSchema} from "../Model/user.js";
import CustomError from "../utils/customError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import {generateToken , decodeToken} from "../utils/generateToken.js";
import bcrypt from 'bcrypt'
import multer from "multer";


const registerUser = asyncHandler(async(req, res , publicId)=>{  
    const { error, value } = userRegisterSchema.validate(req.body);
    console.log(error)
    value["profileImage"] = publicId;
    if(error){
        throw new CustomError(error,404)
    }else{
        const newUser = new userModel(value)
        const user = await newUser.save() 
        apiResponse(res,'Account created successfully',200,user)
    }
}
)


const loginUser = asyncHandler(async (req,res)=>{
    const {email , password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        throw new CustomError("User Not Found",404)
    }
    const truePassword =  await bcrypt.compare(password , user.password)
    if(!truePassword){
        throw new CustomError("Please Enter Correct Password",404)
    } 
    const accessTokenPayLoad = {
        id :user.id,
        accountType:user.accountType,
        status:user.isActive,
        tokenType:'access'
    }
    const refreshTokenPayLoad = {
        id :user.id,
        accountType:user.accountType,
        status:user.isActive,
        tokenType:'refresh'
    }
    const accessToken = generateToken(accessTokenPayLoad, 'fghkdskljirtyuifgycdkedkfudghdw', '1h');
    const refreshToken = generateToken(refreshTokenPayLoad, 'fghjkltygudhijokplghjsdkjahdhweui','1d')
    const responseObj = {accessToken , refreshToken , data:user}
    apiResponse(res,'user login successfully' , 200 , responseObj)
})


const refresh  = asyncHandler(async(req,res)=>{
    const {token} = req.body;
     
    const user = decodeToken(token);
    const userExist = await userModel.findOne({_id:user.id})
    console.log(userExist)
    if(!userExist){
        throw new Error("Sorry No user Exiist")
    }
    if(user.tokenType !='access'){
        throw new Error("Please provide correct access token")
    }
    const accessTokenPayLoad = {
        id :user.id,
        accountType:user.accountType,
        status:user.isActive,
        tokenType:'access'
    }
    const refreshTokenPayLoad = {
        id :user.id,
        accountType:user.accountType,
        status:user.isActive,
        tokenType:'refresh'
    }
    const accessToken = generateToken(accessTokenPayLoad, 'fghkdskljirtyuifgycdkedkfudghdw', '1h');
    const refreshToken = generateToken(refreshTokenPayLoad, 'fghjkltygudhijokplghjsdkjahdhweui','1d')
    const responseObj = {accessToken , refreshToken , data:user}
    apiResponse(res,'New access token and refresh token return' , 200 , responseObj)
    


})

const getAllUsers = asyncHandler(async (req,res,next)=>{
   const user = await userModel.find();
   apiResponse(res,'Get All user successfully' , 200 , user)
})

export  {registerUser , loginUser , refresh , getAllUsers}