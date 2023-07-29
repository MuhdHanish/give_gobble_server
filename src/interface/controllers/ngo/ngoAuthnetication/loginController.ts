import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ngoModel } from "../../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../../framework/repository/ngoRespository";
import { userLogin } from "../../../../app/usecases/ngo/ngoAuthentication/userLogin";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/tokenUtils";
import mongoose from "mongoose";

const ngoRepository = ngoRepositroyEmpl(ngoModel);

 const loginController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier, password } = req.body;
  const user = await userLogin(ngoRepository)(identifier, password);
   if (user) {
     if (user.isVerified) {
       if (user.isRejected !== true) {
        const accessToken = await generateAccessToken(user?._id as mongoose.Types.ObjectId,user?.role as string);
        const refreshToken = await generateRefreshToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
        return res.status(201).json({ message: "Login successfull", user, accessToken, refreshToken }); 
       } else {
         return res.status(403).json({ message: " Your account has been reject by admin, remove account and try again", user });
       }
     } else {
       return res.status(401).json({ message: " Your account is currently being verified by our admin team", user });
    }
  }else{
     return res.status(401).json({ message: "No active account found with the given credentials" , user});
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default loginController;