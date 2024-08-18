import bcrypt from 'bcrypt'
import {User} from '../models/user.model.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req , res) => {
    const {email , password , name} = req.body;
    try {
        if(!email || !password || !name){
            throw new Error('All fields are required!')
        }
        
        const userAlreadyExists = await User.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({success:false , message:"user already exists"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 ,// 24 hours 
        })
        await user.save()

        // jwt token 
        generateTokenAndSetCookie(res , user._id)
        res.status(201).json({
            success:true,
            message:"user created successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })

    } catch (error) {
        console.log(error);
        
        
    }

}
export const login = async (req , res) => {
    res.send("login route")
}
export const logout = async (req , res) => {
    res.send("logout route")
}