import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[3, "name must contain 3 cha racters"],
        maxLength:[32, "name cannot exceed 32 characters."]
    },

    email: String,
    phone: Number,
    password:{
        type:String,
        minLength:[8, "password must have atleast 8 characters "]
    }
})

export const User = mongoose.model("User", userSchema);