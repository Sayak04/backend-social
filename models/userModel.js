import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    name : {
        type: String,
        required: [true, "Name is required"],
    },
    email : {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail,
    },
    password : {
        type: String,
        required: [true, "Password is required"],
    }
}, {timestamps: true});

export default mongoose.model("User", userSchema);