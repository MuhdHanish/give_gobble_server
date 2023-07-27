import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { restaurantModel } from "../../../../framework/database/models/restaurantModel";
import { restaurantRespositoryEmpl } from "../../../../framework/repository/restaurantRepository";
import { restaurantLogin } from "../../../../app/usecases/restaurantAuthentication/restorentLogin";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/tokenUtils";
import mongoose from "mongoose";

const restaurantRepository = restaurantRespositoryEmpl(restaurantModel);

 const loginController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier, password } = req.body;
  const restaurant = await restaurantLogin(restaurantRepository)(identifier, password);
  if (restaurant) {
  const accessToken = await generateAccessToken(restaurant?._id as mongoose.Types.ObjectId, restaurant?.role as string);
   const refreshToken = await generateRefreshToken(restaurant?._id as mongoose.Types.ObjectId, restaurant?.role as string);
  return res.status(201).json({ message: "Login successfull", restaurant, accessToken, refreshToken });
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default loginController;