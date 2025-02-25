const { register, logout } = require('../../Controllers/adminController')
const { login } = require('../../Controllers/adminController')

const adminRouter = require('express').Router()



adminRouter.post("/register",register)
adminRouter.post("/login",login)
adminRouter.post("/logout",logout)



module.exports = adminRouter