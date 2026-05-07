import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "driver", "admin"]
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isApproved:{
         type: Boolean,
        default: false
    }

},{timestamps})

export const User = mongoose.model("User",userSchema)