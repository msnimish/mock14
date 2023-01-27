import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
}, {timestamps: true});


let User = mongoose.model("user", UserSchema);

export default User;