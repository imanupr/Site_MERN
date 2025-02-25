const jwt = require('jsonwebtoken')

const authUser = (req,res,next)=>{

try {
    const {token}=req.cookies;
  

    if(!token){
        return res.status(401).json({error:'Token not found'})
    }
    const verifiedToken = jwt.verify(token,process.env.JWT_SECRET)
    if(!verifiedToken){
        return res.status(401).json({error:"Unauthorized Access"})
    }

    if(verifiedToken.role !== "user"){

        return res.status(401).json({error: "Access denied"})
    }
    req.user = verifiedToken.id

    next()
} catch (error) {
    console.log(error)
        res.status(error.status||401).json({error:"Unauthorized"})
        
}

}


module.exports = authUser;