import mongoose from "mongoose";
import { Request, Response } from "express";
import { restaurantModel } from "../../../../framework/database/models/restaurantModel";
import { validationResult } from "express-validator";
import { restaurantRespositoryEmpl } from "../../../../framework/repository/restaurantRepository";
import { signupStepTwo } from "../../../../app/usecases/restaurantAuthentication/restaurantSignup/signupStepTwo";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/generateToken";

const restaurantRepository = restaurantRespositoryEmpl(restaurantModel);

const stepTwoController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
   const { username, email, password,location } = req.body;
   const restaurant = await signupStepTwo(restaurantRepository)(username, email,password, location);
   if (!restaurant) {
     return res.status(400).json({ message: "Registration failed" });
   } else {
     const accessToken = await generateAccessToken(restaurant?._id as mongoose.Types.ObjectId,restaurant?.role as string);
     const refreshToken = await generateRefreshToken(restaurant?._id as mongoose.Types.ObjectId, restaurant?.role as string);
     return res.status(201).json({ message: "Registration successfull", restaurant, accessToken, refreshToken });
   }
 } catch (error) {
   return res.status(500).json({ message: "Internal server error" });
  }
};

export default stepTwoController;