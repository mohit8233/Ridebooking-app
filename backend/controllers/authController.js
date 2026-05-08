import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';


export const register  = async(req,res)=>{
    try {
         const {name,email,password,mobile,role}= req.body;
         if(!name||!email||!password){
            return res.status(400).json({
                status:false,
                message:"All fields are required  "
            })
         }
          const existUser = await User.findOne({email,mobile})
          if (existUser) {
            return res.status(409).json({
               status:false,
               message:"User already registered"
            })
          }
           const hashPassword = await bcrypt.hash(password, 10)
           const user = await User.create({
            name,
            email,
            password:hashPassword,
            mobile,
            role
           })

           return res.status(201).json({
            status:true,
            message:"User register successfully",
            data:user
           })

    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"Error in register user ",
            error:error.message
        })
    }
} 

export const login = async ( req,res)=>{
   try {
     const {email, password} = req.body
     const user = await User.findOne({email})
     if(!user){
        return res.status(404).json({
            status:false,
            message:"User not exist "
        })
     }

     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
        return res.status(400).json({
            status:false,
            message:"Invalid password"
        })
     }
     const token = await jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
     return res.status(200).json({
        status:false,
        message:"user login successfully",
        data:token
     })
   } catch (error) {
      return res.status(500).json({
        message:`Error in login user ${error.message}`
      })
   }
}