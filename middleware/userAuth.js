import jwt from 'jsonwebtoken';

const userAuth=async(req,res,next)=>{
    const {token}=req.body;
    console.log("Token from cookies:", token);
    if(!token){
        return res.json({success:false,message:`Not authorized`});
    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id;
        }
        else{
            return res.json({success:false,message:`Not authorized Login again!!`});
        }
        next();
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}

export default userAuth;