const adminRouter = require('./adminRoutes')
const userRouter = require('./userRoutes')
const productRouter = require('./productRoutes')
const cartRouter = require('./cartRoutes')
const paymentRouter = require('./paymentRoutes')

const v1Router = require('express').Router()

v1Router.use("/user",userRouter)
v1Router.use("/admin",adminRouter)
v1Router.use("/products",productRouter);
v1Router.use("/cart",cartRouter);
v1Router.use("/payment",paymentRouter);

module.exports = v1Router