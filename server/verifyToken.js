const jwt=require("jsonwebtoken");
const verifyToken=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token) 
    return res.status(401).send({auth:false,message:"No token provided"});
    try{
        jwt.verify(token,process.env.SECRET,(error,user)=>{
            if(error){
                return res.status(500).send({auth: false, message: "Invalid Token"})
                }else {
                    req.user = user;
                    next();
                    }
        })
        }catch(ex){
            console.log(ex);
            res.status(400).send({auth:false,message:"Failed to authenticate token."})
            }
}

module.exports={verifyToken};