import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { signupStepOne } from "../../../../app/usecases/restorentAuthentication/restorentSignup/signupStepOne";
import { restorentModel } from "../../../../framework/database/models/restorentModel";
import { restorentRepository, restorentRespositoryEmpl } from "../../../../framework/repository/restorentRepository";

const restorentRepository = restorentRespositoryEmpl(restorentModel);
 
const stepOneController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
   
  const { email, restorentname } = req.body;
  const { message,uId } = await signupStepOne(restorentRepository)(restorentname,email);
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