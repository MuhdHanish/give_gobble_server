import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ngoModel } from "../../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../../framework/repository/ngoRespository";
import { resetNgoPassword } from "../../../../app/usecases/ngo/ngoAuthentication/resetNgoPassword";

const ngoRespository = ngoRepositroyEmpl(ngoModel);

 const resetNgoPasswordController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier, password } = req.body;
  const ngo = await resetNgoPassword(ngoRespository)(identifier,password);
  if (ngo) {
  return res.status(201).json({ message: "Password reseted sucessfully" });
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default resetNgoPasswordController;