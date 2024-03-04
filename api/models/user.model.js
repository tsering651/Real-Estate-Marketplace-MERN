import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    avatar:{
        type: String ,
        default: "https://1000logos.net/wp-content/uploads/2017/05/Pepsi-Logo-1969.png"
    },
},
{
    timestamps:true
})

const User=mongoose.model('User',userSchema);

export default User;
