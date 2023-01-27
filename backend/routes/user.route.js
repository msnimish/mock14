import express from "express";
import { getAllUsers, login, register } from "../controller/user.controller.js";

const user = express.Router();

user.post("/register", register);
user.post("/login", login);

user.get('/', getAllUsers);



export default user;