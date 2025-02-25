const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const apiRouter = require("./Routes")
const cookieparser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieparser())

app.use(cors({
    origin:'https://site-mernfrontend.vercel.app',
    methods: 'GET,POST,DELETE',
    credentials:true
}))

mongoose.connect(process.env.MONGO_URL).then((res)=>{
    console.log("DB Connection successfull");
}).catch((err)=>{
    console.log(err);
})


app.use("/api",apiRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server starts on port ${process.env.PORT}`)
})