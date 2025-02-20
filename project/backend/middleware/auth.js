import jwt from "jsonwebtoken"
import { User } from "../models/userSchema.js"

export const isauthenticated = async(req, res, next)=>{
    const {token} = req.cookies
    console.log(token)
    if(!token){
        return next(res.status(401).json({
            success:false,
            message:"user not authenticated"
        }))
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next();
    
}