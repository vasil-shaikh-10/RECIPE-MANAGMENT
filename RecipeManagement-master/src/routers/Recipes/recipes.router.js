const {Router} = require('express')
const { RecipeAdd, RecipeShow, RecipeSingle, RecipesUpdate, RecipeDelete } = require('../../controllers/Recipe/recipe.controller')

const RecipesRouter = Router()

RecipesRouter.get('/show',RecipeShow)
RecipesRouter.get('/single/:id',RecipeSingle)
RecipesRouter.post('/add',RecipeAdd)
RecipesRouter.patch('/update/:id',RecipesUpdate)
RecipesRouter.delete('/delete/:id',RecipeDelete)


module.exports = RecipesRouter