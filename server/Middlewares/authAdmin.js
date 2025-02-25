const jwt = require('jsonwebtoken')

const authAdmin = (req,res,next)=>{

try {
    const {Admin_token}=req.cookies;
  

    if(!Admin_token){
        return res.status(401).json({error:'Token not found'})
    }
    const verifiedToken = jwt.verify(Admin_token,process.env.JWT_SECRET)
    if(!verifiedToken){
        return res.status(401).json({error:"Unauthorized Access"})
    }

    if(verifiedToken.role !== "admin"){

        return res.status(401).json({error: "Access denied"})
    }
    req.admin = verifiedToken.id

    next()
} catch (error) {
    console.log(error)
        res.status(error.status||401).json({error:"Unauthorized"})
        
}

}


module.exports = authAdmin;