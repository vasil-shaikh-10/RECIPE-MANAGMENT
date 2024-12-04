const mongoose = require('mongoose')

const RecipesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    ingredients:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    cuisineType:{
        type:String,
        required:true      
    },
    author:{
        type:mongoose.Schema.Types.ObjectId, ref:'User', required: true
    }
})


const Recipes = mongoose.model("Recipe",RecipesSchema)

module.exports = Recipes