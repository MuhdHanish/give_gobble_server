import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { restaurantModel } from "../../../../framework/database/models/restaurantModel";
import { restaurantRespositoryEmpl } from "../../../../framework/repository/restaurantRepository";
import { resetRestaurantPassword } from "../../../../app/usecases/restaurant/restaurantAuthentication/resetRestaurantPassword";

const restaurantRepository = restaurantRespositoryEmpl(restaurantModel);

 const resetRestaurantPasswordController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier, password } = req.body;
  const restaurant = await resetRestaurantPassword(restaurantRepository)(identifier,password);
  if (restaurant) {
  return res.status(201).json({ message: "Password reseted sucessfully"});
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default resetRestaurantPasswordController;