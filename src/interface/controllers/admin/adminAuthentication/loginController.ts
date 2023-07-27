import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/tokenUtils";
import mongoose from "mongoose";
import { adminRepositoryEmpl } from "../../../../framework/repository/adminRepository";
import { adminModel } from "../../../../framework/database/models/adminModel";
import { adminLogin } from "../../../../app/usecases/admin/adminAuthentication/adminLogin";

const adminRepository = adminRepositoryEmpl(adminModel);

 const loginController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier, password } = req.body;
  const user = await adminLogin(adminRepository)(identifier, password);
  if (user) {
  const accessToken = await generateAccessToken(user?._id as mongoose.Types.ObjectId,user?.role as string);
  const refreshToken = await generateRefreshToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
  
  return res.status(201).json({ message: "Login successfull", user, accessToken, refreshToken });
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default loginController;