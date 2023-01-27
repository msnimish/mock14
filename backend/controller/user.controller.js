import User from "../model/user.model.js";
import dotenv from "dotenv";
import randomWord from "random-words";

dotenv.config();



export const register = async (req,res) => {
    try{
        let { name, level } = req.body;
        // console.log(req.body);
        
        let newUser = new User({
            name,
            level
        });
        newUser.save();
        return res.status(201).json(newUser);
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong in register API"});
    }
}

export const getAllUsers = async (req,res) => {
    try{
        let users = await User.find().sort({score:1});
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something went wrong in getAllUsers API"});
    }
}

export const getRandomWord = (req,res) =>{
    let [word] = randomWord({exactly:1});
    return res.status(200).send({word:word});
}

