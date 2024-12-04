const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
require('dotenv').config({path:"../.env"})
const generateTokenAndCookieSet = async(UserId,res)=>{
    try {
        const Token = jwt.sign({UserId},process.env.JWT_SECRET,{expiresIn:'15d'})
        res.status(201).cookie("jwt-PersonalBlog",Token,{
        maxAge:15 * 24 * 60 * 60 * 1000, // 15 days in MS
        httpOnly:true,
        sameSite:"strict"
    })
    console.log("Token",Token)
    return Token;
    } catch (error) {
        console.log("Error in generateTokenAndCookieSet Utils", error.message)
        res.status(500).json({success:false,message:"Interna; Server Error"})
    }
}

module.exports = generateTokenAndCookieSet