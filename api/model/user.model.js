import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String ,
        required: true,
        unique: true,
    },
    email: {
        type: String ,
        required: true,
        unique: true,
    },
    password: {
        type: String ,
        required: true,
    }
}, {timestamps:true}); // to have a record of the user entry and updations

const User = mongoose.model('User' , userSchema); // update different users in the user schema

export default User ;