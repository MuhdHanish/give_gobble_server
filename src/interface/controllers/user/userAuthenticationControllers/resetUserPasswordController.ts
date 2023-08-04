import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userModel } from "../../../../framework/database/models/userModel";
import { userRepositoryEmpl } from "../../../../framework/repository/userRepository";
import { resetUserPassword } from "../../../../app/usecases/user/userAuthentication/restUserPassword";

const userRepository = userRepositoryEmpl(userModel);

 const resetUserPasswordController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier, password } = req.body;
  const user = await resetUserPassword(userRepository)(identifier,password);
  if (user) {
  return res.status(201).json({ message: "Password reseted sucessfully" });
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default resetUserPasswordController;