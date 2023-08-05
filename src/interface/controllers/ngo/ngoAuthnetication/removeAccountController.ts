import { Request, Response } from "express";
import { ngoModel } from "../../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../../framework/repository/ngoRespository";
import { removeNgoAccount } from "../../../../app/usecases/ngo/ngoAuthentication/removeNgoAccount";


const ngoRepository = ngoRepositroyEmpl(ngoModel);

 const removeAccountController = async (req: Request, res: Response) => {
 try {
   const { id } = req.params;
   const removedAccount = await removeNgoAccount(ngoRepository)(id);
   if (removedAccount) {
     res.status(200).json({ message: "Account removed" });
   } else {
     res.status(400).json({ message: "Error occured" });
   }
 } catch (error) {
   
 }
}

export default removeAccountController;