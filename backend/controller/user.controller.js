import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();



export const register = async (req,res) => {
    try{
        let { name,email, password } = req.body;
        // console.log(req.body);
        let user = await User.findOne({email:email});
        // console.log(user);
        if(user&&user.email){
            return res.status(400).json({message:"User already exists"});
        }else{
            let hashedPassword= await bcrypt.hash(password,10);
            let newUser = new User({
                name,
                email,
                password: hashedPassword, 
            });
            if(email.includes("@masaischool.com")){
                newUser.role = "admin"
            }
            newUser.save();
            return res.status(201).json(newUser);
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong in register API"});
    }
}

export const login = async (req,res) => {
    try{
        let { email, password } = req.body;
        let user = await User.findOne({email:email});
        if(!user){
            res.status(400).json({message:"User not found"});
        }else{
            let isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(400).json({message:"Invalid password"});
            }else{
                let token = jwt.sign({_id: user._id, name: user.name, email:user.email, password: user.password, role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});
                res.status(200).json({token});
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong in login API"});
    }
}

export const getAllUsers = async (req,res) => {
    try{
        let users = await User.find();
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong in getAllUsers API"});
    }
}

export const getProfile = async (req,res) => {
    try{
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        let user = await User.findById(decoded._id);
        console.log(user);
        if(!user){
            res.status(400).json({message:"User not found"});
        }else{
            res.status(200).json(user);
        }

    }catch(err){
        console.log(err)
        res.status(500).send({message:"Something went wrong in getProfile API"});
    }
}