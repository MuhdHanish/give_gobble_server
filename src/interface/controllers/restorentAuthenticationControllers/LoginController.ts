import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { restorentModel } from "../../../framework/database/models/restorentModel";
import { restorentRespositoryEmpl } from "../../../framework/repository/restorentRepository";
import { restorentLogin } from "../../../app/usecases/restorentAuthentication/restorentLogin";
import { generateAccessToken, generateRefreshToken } from "../../../utils/generateToken";
import mongoose from "mongoose";

const restorentRepository = restorentRespositoryEmpl(restorentModel);

 const loginController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const restorent = await restorentLogin(restorentRepository)(email, password);
  if (restorent) {
  const accessToken = await generateAccessToken(restorent?._id as mongoose.Types.ObjectId, restorent?.role as string);
   const refreshToken = await generateRefreshToken(restorent?._id as mongoose.Types.ObjectId, restorent?.role as string);
  return res.status(201).json({ message: "Login successfull", restorent, accessToken, refreshToken });
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default loginController;