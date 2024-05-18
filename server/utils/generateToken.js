import jwt from 'jsonwebtoken'



const generateToken = (payload , secretString , expiresIn)=>{
   return  jwt.sign(payload,secretString,{expiresIn:expiresIn})
}


const decodeToken = (payload)=>{
   return jwt.decode(payload)
}


export { generateToken , decodeToken}