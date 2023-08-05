import { Request, Response } from "express";
import { ngoModel } from "../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../framework/repository/ngoRespository";
import { acceptNgo } from "../../../app/usecases/ngo/accountVerify/acceptNgo";
import { rejectNgo } from "../../../app/usecases/ngo/accountVerify/rejectNgo";

const ngoRepository = ngoRepositroyEmpl(ngoModel);

export const acceptNgoController = async (req: Request, res: Response) => {
 try {
   const { id } = req.params;
   const rejectedNgo = await acceptNgo(ngoRepository)(id);
   if (rejectedNgo) {
     res.status(200).json({ message: "Account accepted" });
   } else {
     res.status(400).json({ message: "Error occured" });
   }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export const rejectNgoController = async (req: Request, res: Response) => {
 try {
   const { id } = req.params;
   const rejectedNgo = await rejectNgo(ngoRepository)(id);
   if (rejectedNgo) {
     res.status(200).json({ message: "Account rejected" });
   } else {
     res.status(400).json({ message: "Error occured" });
   }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}
