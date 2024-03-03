const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const userModel = require("../modules/user.module");

userRouter.post("/register",async(req,res)=>{
    const {username,email,password} = req.body;
    try {
        const exituser = await userModel.findOne({email});
        if(exituser){
            return res.status(200).send(`This email ${email} is already registered please login`);
        }
        else{

            const hash = bcrypt.hashSync(password,5);

            const newUser = new userModel({
                ...req.body,
                password:hash
            });
            await newUser.save();

            return res.status(200).send({message:"new user has been registerd","user":newUser});
        }
    } catch (error) {
        return res.status(400).send({error:error.message});
    }
});

userRouter.post("/login", async(req,res)=>{

    const {email,password} = req.body;
    try {

        const user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    return res.status(400).send("password not match")
                }else{
                    const token = JWT.sign({userId:user._id},"masai");
                    return res.status(200).send({message:"login successful", "token":token})
                }
            })
        }
        
    } catch (error) {
        return res.status(400).send({error:error.message});
    }
});

module.exports  = userRouter;