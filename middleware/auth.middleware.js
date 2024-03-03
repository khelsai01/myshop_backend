const JWT = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
        if(token){
            JWT.verify(token, "masai",(err,decode)=>{
                if(decode){
                    req.body.userId = decode.userId;
                    next()
                }
                else{
                    console.log(err);
                }
            })
        }
        
   else{

        return res.status(400).send("not authorized")
    }
};

module.exports = auth;