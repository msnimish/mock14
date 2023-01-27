import express from "express";
import { getAllUsers, getRandomWord, register } from "../controller/user.controller.js";

const user = express.Router();

user.post("/register", register);

user.get('/', getAllUsers);
user.get('/randomWord', getRandomWord);



export default user;