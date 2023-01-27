import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    score: { type: Number, default: 0 }
    
    
}, {timestamps: true});


let User = mongoose.model("user", UserSchema);

export default User;