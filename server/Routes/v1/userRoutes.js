const { logout } = require('../../Controllers/adminController')
const { register, login } = require('../../Controllers/userController')

const userRouter = require('express').Router()



userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)





module.exports = userRouter