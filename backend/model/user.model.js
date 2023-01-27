import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    name: { type: String, required: true, unique:true },
    level: { type: String, required: true,enum:["High","Medium","Low"], default:"Low"},
    score: { type: Number, default: 0 }
    
    
}, {timestamps: true});


let User = mongoose.model("user", UserSchema);

export default User;