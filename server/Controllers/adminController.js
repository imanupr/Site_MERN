const adminModel = require("../Models/adminModel");
const { createToken } = require("../Utilities/generateToken");
const { hashPassword, comparePassword } = require("../Utilities/passwordUtilities");


const register = async(req,res)=>{

try {

    const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({error:"all fields are required"})
    }
    const alredyExist = await adminModel.findOne({email})

    if (alredyExist){
        return res.status(400).json({error:"Email already exists"})
    }
    const hashedPassword= await hashPassword(password)
    const newAdmin = new adminModel({
        email,password:hashedPassword
    })    

    const saved = await newAdmin.save()

    if(saved){
        return res.status(200).json({message:"Admin created",saved})
    }
} catch (error) {
    console.log(error)
        res.status(error.status||500).json({error:error.message||"internal Server Error"})
        
}


}

const login = async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email ||!password){
            return res.status(400).json({error:"All fields are required"})
        }
        const adminExist = await adminModel.findOne({email})
        
        if (!adminExist){
            return res.status(400).json({error:"User not exists"})
        }
        const passwordMatch = await comparePassword(password,adminExist.password)

        console.log(passwordMatch);
        if (!passwordMatch){
            return res.status(400).json({error:"password does not match"})

        }
        const token = createToken(adminExist._id,"admin")
        res.cookie("Admin_token",token)

        res.status(200).json({message:"Admin login successfull",adminExist})
    
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message||"internal Server Error"})
        
    }

  
}

const logout = async(req,res)=>{
    try {
        res.clearCookie("Admin_token")
        res.status(200).json({message:"logout Successfull"})
    } catch (error) {
        console.log(error)
        res.status(error.status||500).json({error:error.message})
        
    }
}

module.exports = {
    register,
    login,
    logout
}