import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup = async(req,res) =>{
    const { fullName, email, password} = req.body;

    try{ 
        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }
          
        if(password.length() < 5){
            console.log("Password must be more than 5 words")
        }
    
        const user = await User.findOne({email});
        if(user) return res.status(400).json({ message: "Email already exists"});
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })
    
        if(newUser){
            generateToken(newUser._id, res)
            await newUser.save(); 
    
            res.status(201).json({
                _id: newUser._id,
                fullName : newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }

    }catch(error){
       console.log("Error in signup controller", error.message)
    }
}

export const login = (req,res) =>{
    
}

export const logout = (req,res) =>{
    
}