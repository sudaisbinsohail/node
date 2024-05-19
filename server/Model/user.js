import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import CustomError from '../utils/customError.js';
import Joi from 'joi';
const { Schema } = mongoose;


const UserSchema = new Schema({
    userName: {
        type: String,
    },
    accountType : {
        type:String,
        enum:['reader','writer','admin'],
     
    },
    email: {
        type:String,
    },
    isActive:Boolean,
    password: String,
    profileImage:String
})


const userRegisterSchema = Joi.object({
    userName : Joi.string().required(),
    email : Joi.string().required(),
    accountType  : Joi.string().default('reader'),
    password : Joi.string().required(),
    isActive  :Joi.boolean().default(false)

})

UserSchema.pre('save', async function(next) {

    //update encrypting password logic when we add update feild
    try {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        throw new CustomError("Please provide password",390)
    }
});
    


const userModel = mongoose.model('user', UserSchema);
export  {userModel , userRegisterSchema};