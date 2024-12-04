const jwt = require('jsonwebtoken');
const User = require('../models/Auth/auth.models');
// const User = require('../models/auth/auth.schema')
require('dotenv').config({path:"../.env"})

const RacipeManage = async(req,res,next)=>{
    try {
        const token = req.cookies["jwt-PersonalBlog"];
        if(!token){
            res.status(401).json({success:false,message:"Unauthorized - No Token Provided"})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            res.status(401).json({success:false,message:"Unauthorized - Invalid Token"})
        }   

        const user = await User.findById(decode.UserId)
        if(!user){
            res.status(404).json({success:false,message:"User Not Found."})
        }
        req.user = user;
        next()
    } catch (error) {
        console.log("Error in RacipeManage Middlewares", error.message)
        res.status(500).json({success:false,message:"Interna; Server Error"})
    }
}

module.exports = RacipeManage