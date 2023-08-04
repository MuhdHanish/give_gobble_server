import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userModel } from "../../../../framework/database/models/userModel";
import { userRepositoryEmpl } from "../../../../framework/repository/userRepository";
import { forgotUserPassword } from "../../../../app/usecases/user/userAuthentication/forgotUserPassword";

const userRepository = userRepositoryEmpl(userModel);
 
const forgotUserPasswordController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identfier } = req.body;
  const  uId  = await forgotUserPassword(userRepository)(identfier);
  if (uId) {
    return res.status(200).json({ uId });
  } else {
   return res.status(401).json({ message: "No active account found with the given credentials" });
  } 
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
};

export default forgotUserPasswordController;