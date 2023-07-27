import mongoose from "mongoose";
import { Request, Response } from "express";
import { ngoModel } from "../../../../../framework/database/models/ngoModel";
import { validationResult } from "express-validator";
import { ngoRepositroyEmpl } from "../../../../../framework/repository/ngoRespository";
import { signupStepTwo } from "../../../../../app/usecases/ngo/ngoAuthentication/userSignup/signupStepTwo";

const ngoRepository = ngoRepositroyEmpl(ngoModel);

const stepTwoController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
   const { username, email, password, ngoType, address, pincode } = req.body;
   const user = await signupStepTwo(ngoRepository)(username,email,password,ngoType,address,pincode);
   if (!user) {
     return res.status(400).json({ message: "Registration failed" });
   } else {
     return res.status(201).json({ message: "Registration successfull, not verified by admin", user });
   }
 } catch (error) {
   console.log(error);
   return res.status(500).json({ message: "Internal server error" });
  }
};

export default stepTwoController;