import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateAndSetCookie = async (res: Response, username: String,id:String) => {
  // try {

  // } catch (error:any) {
  //     console.log("Internal Server Error")
  //     return res.status(500).json({message:"Internal Server error",success:false})
  // }
  const token = jwt.sign({"username":username,"id":id}, process.env.JWT_SECRET!);
  //console.log(token)
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:'lax'
  });
};
