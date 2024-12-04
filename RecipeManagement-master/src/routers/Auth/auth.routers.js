const {Router} = require("express")
const { register, login, logout } = require("../../controllers/Auth/auth.controllers")

const AuthRouter = Router()

AuthRouter.post('/register',register)
AuthRouter.post('/login',login)
AuthRouter.post('/logout',logout)

module.exports = AuthRouter