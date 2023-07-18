import mongoose from "mongoose";
import { Request, Response } from "express";
import { restorentModel } from "../../../../framework/database/models/restorentModel";
import { validationResult } from "express-validator";
import { restorentRespositoryEmpl } from "../../../../framework/repository/restorentRepository";
import { signupStepTwo } from "../../../../app/usecases/restorentAuthentication/restorentSignup/signupStepTwo";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/generateToken";

const restorentRepository = restorentRespositoryEmpl(restorentModel);

const stepTwoController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
   const { restorentname, email, password,location } = req.body;
   const restorent = await signupStepTwo(restorentRepository)(restorentname, email,location, password);
   if (!restorent) {
     return res.status(400).json({ message: "Registration failed" });
   } else {
     const accessToken = await generateAccessToken(restorent?._id as mongoose.Types.ObjectId,restorent?.role as string);
     const refreshToken = await generateRefreshToken(restorent?._id as mongoose.Types.ObjectId, restorent?.role as string);
     return res.status(201).json({ message: "Registration successfull", restorent, accessToken, refreshToken });
   }
 } catch (error) {
   return res.status(500).json({ message: "Internal server error" });
  }
};

export default stepTwoController;