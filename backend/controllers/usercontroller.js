import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register = async (req, res, next)=>{
    const {name, email, phone, password} = req.body;
    console.log(name, email, phone, password)
    if(!name || !email || !phone || !password){
        return next(
           console.log("please full fill error"),
            res.status(400).json({
           
            success:false,
            message:"please fill full form.",
        }))
    }
    const isuser = await User.findOne({email});
    if(isuser)
    {
        return next(
           console.log("already exisits error"),
            res.status(400).json({
                success:false,
                message:"user already exists!"
            })
        )
    }
     const hasedpassword = await bcrypt.hash(password,10)
    const user = await User.create({name, email, phone, password: hasedpassword});
    res.status(200).json({
        success: true,
        message:"user registerd!",
        user, 
    })
}

export const login = async (req, res, next)=>{
    const {email , password} = req.body;
    if(!email || !password)
    {
        return next(
            res.status(400).json({
                success: false,
                message:"please fill full form!",
            })
        )
    }
    const user = await User.findOne({email});
    if(!user){
        return next(
            res.status(404).json({
                success:false,
                message:"invalid email or password",                
                
            })
        )
    }

    const ispasswordmatched = await bcrypt.compare(password,user.password);
    if(!ispasswordmatched){
        return next(
            res.status(404).json({
                success: false,
                message:"Invalid Email or Password",
            })
        )
    }

    const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES,
    })

    res.status(200).cookie("token", token, {
        httpOnly:true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 *60 *60 * 1000),
    }).json({

        success: true,
        message:"user logged in.",
        user,
        token ,
});
}

export const getuser = async (req, res, next)=>{
    const user = await User.findById(req.user._id);
    if(!user){
        return next(res.status(404).json({
            success: false,
            message:"user not found"
        }))
    }
    res.status(200).json({
        success: true,
       user,
    })
}

export const logout = async(req, res, next)=>{
    res.status(200).cookie("token","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message:"User logged out." 
    })
}

