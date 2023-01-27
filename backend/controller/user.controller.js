import User from "../model/user.model.js";
import dotenv from "dotenv";
import randomWord from "random-words";

dotenv.config();



export const register = async (req,res) => {
    try{
        let { name, level } = req.body;
        // console.log(req.body);
        let user = User.findOne({ name: name });
        if(user && user.name){
            res.status(409).json({ message: "Username already exists" });
        }else{
            let newUser = new User({
                name,
                level
            });
            newUser.save();
            let token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
            return res.status(201).send({token});
        }
        
        
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
    try{
        let [word] = randomWord({exactly:1});
        console.log(word);
        res.status(200).send({word:word});
    }
    catch(err){
        console.log(err);
    }
}

export const updateScore = async (req,res) => {
    try{
        let token = req.headers.authorization.split(' ')[1];
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findByIdAndUpdate({_id:decode._id}, {score:req.body});
        res.status(200).send({message:"Score updated successfully"});
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Something went wrong in updateScore API"});
    }   
}
