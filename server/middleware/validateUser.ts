import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import client from "../db/db.js";

interface DecodedToken extends JwtPayload {
	username: string;
}

declare global {
	namespace Express {
		export interface Request {
			user: {
                username: string,
				id: string,
                fullName:string,
                profilePic:string,
			};
		}
	}
}

export const validateUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.cookies['jwt'];
        //console.log(token);
        
        if(!token){
            return res.status(403).json({message:"UnAuthorized",success:false})
        }
        const decodedUser = jwt.verify(token,process.env.JWT_SECRET!) as DecodedToken
        const user = await client.user.findFirst({
            where:{username:decodedUser.username},
            select:{id:true,username:true,fullName:true,profilePic:true}
        })
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        req.user = user;
        
        next();
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({message:"Token Validation error",success:false})
    }
}