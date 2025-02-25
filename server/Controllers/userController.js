const userModel = require("../Models/userModel");
const { createToken } = require("../Utilities/generateToken");
const {hashPassword,comparePassword} = require("../Utilities/passwordUtilities");
const bcrypt = require('bcrypt')
const register = async (req,res)=>{

    try {
        

        const {name,email,phone,password,confirmpassword}=req.body;
        if(!name ||!email||!phone||!password||!confirmpassword){
            return res.status(400).json({message:"all fields are required"})
        }

        if(password !== confirmpassword){
            return res.status(400).json({error:"Passwords are not matching"})
        }
        const userExist = await userModel.findOne({email})

        if(userExist){
            return res.status(400).json({error:"Email already exists"})
        }

        const hashedPassword = await hashPassword(password)
        
        
        const newUser = new userModel({
            name,email,phone,password:hashedPassword
        })

        const saved = await newUser.save()

        if (saved){
            const token = createToken(saved._id)
            res.cookie("token",token)
            return res.status(200).json({message:"User Created"})
        }
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"internal Server Error"})
        
    }

}


const login =  async (req,res)=>{

    try {
        const {email,password}=req.body
        if(!email ||!password){
            return res.status(400).json({error:"All fields are required"})
        }
        const userExist = await userModel.findOne({email})
        
        if (!userExist){
            return res.status(400).json({error:"User not exists"})
        }
        const passwordMatch = await comparePassword(password,userExist.password)

        console.log(passwordMatch);
        if (!passwordMatch){
            return res.status(400).json({error:"password does not match"})

        }
        const token = createToken(userExist._id)
        res.cookie("token",token)

        res.status(200).json({message:"user login successfull",userExist})
    
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"internal Server Error"})
        
    }
}


const logout = (req,res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message: 'Logged out'})
        
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"internal Server Error"})
    }
}


module.exports = {
    register,
    login,
    logout
}