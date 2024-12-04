const Recipes = require("../../models/Recipes/recipes.models")

const RecipeAdd = async(req,res) =>{
    try {
        let {title,ingredients,instructions,cuisineType}=req.body

        if(!title || !ingredients || !instructions || !cuisineType){
            return res.status(400).json({success:false,message:"All Fields Are Required"})
        }
        let RecipesObj = new Recipes({
            title,ingredients,instructions,cuisineType,author:req.user._id
        })

        await RecipesObj.save()
        res.status(201).json({success:true,Data:{
            ...RecipesObj._doc,
        }})
    } catch (error) {
        console.log("Error in RecipeAdd controller", error.message)
        res.status(500).json({success:false,message:"Interna; Server Error"}) 
    }
}

const RecipeShow = async(req,res) =>{
    try {
        let data = await Recipes.find()
        res.status(201).json({success:true,Data:{
            ...data,
        }})
    } catch (error) {
        console.log("Error in RecipeShow controller", error.message)
        res.status(500).json({success:false,message:"Interna; Server Error"}) 
    }
}

const RecipeSingle = async(req,res)=>{
    try {
        let {id} = req.params

        let data = await Recipes.findById(id)
        res.status(201).json({success:true,Data:{
            ...data,
        }})
    } catch (error) {
        console.log("Error in RecipeSingle controller", error.message)
        res.status(500).json({success:false,message:"Interna; Server Error"}) 
    }
}

const RecipesUpdate = async(req,res)=>{
    try {
        let {id} = req.params
        let {title,ingredients,instructions,cuisineType,author}=req.body
        const existingRecipe = await Recipes.findById(id);
        
        if (!existingRecipe) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        if (!existingRecipe.author.equals(req.user._id)) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        let EditRecipes = await Recipes.findByIdAndUpdate(id,{ title,
            title,ingredients,instructions,cuisineType,author:req.user._id
        },{
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        })
        res.status(201).json({success:true,data:EditRecipes})
    } catch (error) {
        console.log("Error in RecipesUpdate controller", error.message)
        res.status(500).json({success:false,message:"Interna; Server Error"}) 
    }
}

const RecipeDelete = async(req,res)=>{
    try {
        let {id} = req.params
        const existingRecipe = await Recipes.findById(id);
        
        if (!existingRecipe) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        if (!existingRecipe.author.equals(req.user._id)) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        let DeleteData = await Recipes.findByIdAndDelete(id)
        res.status(201).json({success:true,message:"Delete Successfully...",data:DeleteData})
    } catch (error) {
        console.log("Error in RecipeDelete controller", error.message)
        res.status(500).json({success:false,message:"Interna; Server Error"}) 
    }
}

module.exports = {RecipeAdd,RecipeShow,RecipeSingle,RecipesUpdate,RecipeDelete}