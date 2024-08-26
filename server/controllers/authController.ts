import bcryptjs from 'bcryptjs'
import { Request,Response } from 'express'
import client from '../db/db.js'
import { userLoginValidation, userSignupValidation } from '../zod/userSchema.js'
import { generateAndSetCookie } from '../utils/generateAndSetCookie.js'

export const userSignup = async (req:Request , res:Response)=>{
    try {
        const { username,fullName,password,email,gender } = req.body;
        const validData = userSignupValidation(req.body)
        if(!validData.success){
            return res.status(400).json({message:validData.message,success:validData.success})
        }
        //find duplicated username
        const duplicateUsername = await client.user.findFirst({where:{username}})
        if(duplicateUsername){
            return res.status(400).json({message:"Username Already taken",success:false})
        }
        //hash password
        const hashedPassword = await bcryptjs.hash(password,10);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = await client.user.create({
            data:{
                username,
                fullName,
                password:hashedPassword,
                email,
                gender,
                profilePic:gender=='male'?boyProfilePic:girlProfilePic
            }
        })
        if(newUser){
            await generateAndSetCookie(res,username,newUser.id);
            return res.status(201).json({message:"Signup successfull",success:true});
        }
        return res.status(500).json({message:"Something went wrong.Try again later.",success:false})
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({message:"Internal Server error",success:false})
    }
}


export const userLogin = async (req:Request , res:Response)=>{
    try {
        const { username,password } = req.body;
        const validData = userLoginValidation(req.body);
        if(!validData.success){
            return res.status(400).json({message:validData.message,success:validData.success})
        }
        const foundUser = await client.user.findFirst({where:{username}});
        if(!foundUser){
            return res.status(401).json({message:"Invalid credintials"})
        }
        const validPassword = await bcryptjs.compare(password,foundUser.password);
        if(!validPassword){
            return res.status(401).json({message:"Invalid credintials"})
        }
        await generateAndSetCookie(res,username,foundUser.id);
        return res.status(201).json({message:"Login successfull",success:true});
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({message:"Internal Server error",success:false})
    }
}


export const userLogout = async (req:Request , res:Response)=>{
    try {
        res.clearCookie('jwt');
        res.status(200).json({message:"Logged out successfully",success:true})
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({message:"Internal Server error",success:false})
    }
}


export const getMe = async (req:Request,res:Response)=>{
    try {
        const user = await client.user.findFirst({where:{username:req.user.username}});
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

        return res.status(200).json({message:{
            username:user.username,
            fullName:user.fullName,
            profilePic:user.profilePic
        },
        success:true
    })
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({message:"Internal Server error",success:false})
    }
}