const { addToCart, getCart, removeFromCart, clearCart } = require('../../Controllers/cartController')
const authUser = require('../../Middlewares/authUser')

const cartRouter = require('express').Router()

cartRouter.post("/addtocart/:productId", authUser, addToCart)
cartRouter.get("/getcart", authUser, getCart)

cartRouter.delete("/removefromcart/:productId", authUser, removeFromCart)
cartRouter.post("/clearcart", authUser, clearCart)
module.exports = cartRouter