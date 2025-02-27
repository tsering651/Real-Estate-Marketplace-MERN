import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup= async (req,res, next)=>{
   const {username,email,password}= req.body;
   const hashPassword=bcrypt.hashSync(password,10);
   const newUser = new User({username,email,password:hashPassword});
   try {
      await newUser.save();
     res.status(201).json("User Created Successfully");
   } 
   catch (error) {
      res.status(500).json(error.message);
   }
   
}

export const signin = async(req, res, next) =>{
const {email , password} = req.body;
try {
   const validUser = await User.findOne({ email });
   if(!validUser) return next(errorHandler( 404 , 'User not found!')) //next id for giving control to the middleware
   const validPassword = bcrypt.compareSync(password , validUser.password);
   if(!validPassword) return next(errorHandler(404 , 'Wrong Credentials')) //next id for giving control to the middleware
   
const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET); // scret key to make the token unique
//A "TOKEN" typically refers to a piece of data used for authentication and authorization. Tokens are
// commonly used in web applications, including those built with React, to manage user sessions securely.
const { password : pass , ...rest} = validUser._doc ; // to hide the password even in hash form
res
.cookie('access_token',token ,{ httpOnly : true })
.status(200)
.json(rest) ; 
} catch (error) {
   next(error);
}
};

