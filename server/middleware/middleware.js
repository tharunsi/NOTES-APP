import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import dotenv from "dotenv";

dotenv.config();

const middleware = async (req,res,next) => {
    try{
        if (!req.headers.authorization) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        const token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({success: false, message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        

        if(!decoded){
            return res.status(401).json({success: false, message: "wrong token"})
        }

        const user = await User.findById({_id: decoded.id})
        console.log("User found:", user);

        console.log("Authorization Header:", req.header("Authorization"));
console.log("Decoded Token:", req.user);


        if(!user){
            return res.status(404).json({success: false, message: "no user found"})
        }

        const newUser = {name : user.name, id:
            user._id}
        req.user= newUser
        next()
    } catch(error){
        console.error("Middleware Error:", error);
        return res.status(500).json({success: false, message: "please login"})
    }
}

export default middleware