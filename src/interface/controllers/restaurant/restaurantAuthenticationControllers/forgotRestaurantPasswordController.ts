import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { restaurantModel } from "../../../../framework/database/models/restaurantModel";
import { restaurantRespositoryEmpl } from "../../../../framework/repository/restaurantRepository";
import { forgotRestaurantPassword } from "../../../../app/usecases/restaurant/restaurantAuthentication/forgotRestaurantPassword";

const restaurantRepository = restaurantRespositoryEmpl(restaurantModel);
 
const forgotRestaurantPasswordController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identfier } = req.body;
  const uId = await forgotRestaurantPassword(restaurantRepository)(identfier);
  if (uId) {
    return res.status(200).json({ uId });
  } else {
   return res.status(401).json({ message: "No active account found with the given credentials" });
  } 
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
};

export default forgotRestaurantPasswordController;