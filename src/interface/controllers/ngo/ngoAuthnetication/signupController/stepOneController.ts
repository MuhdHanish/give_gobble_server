import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ngoModel } from "../../../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../../../framework/repository/ngoRespository";
import { signupStepOne } from "../../../../../app/usecases/ngo/ngoAuthentication/userSignup/signupStepOne";

const ngoRepository = ngoRepositroyEmpl(ngoModel);
 
const stepOneController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email,username } = req.body;
  const { message, uId } = await signupStepOne(ngoRepository)(username, email);
  if (uId) {
    return res.status(200).json({ uId });
  } else {
    return res.status(409).json({ message });
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
};

export default stepOneController;