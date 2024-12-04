const mongoose = require('mongoose')
require('dotenv').config({path:"../.env"})
console.log(process.env.MONGODB_URL)
const DataBaseConnect = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase Connect...");
    } catch (error) {
        console.log("Error in DataBase Config", error.message)
    }
}

module.exports = {DataBaseConnect}