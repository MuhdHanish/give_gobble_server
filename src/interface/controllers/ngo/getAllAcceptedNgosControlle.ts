import { Request, Response } from "express";
import { ngoModel } from "../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../framework/repository/ngoRespository";
import { getAllAcceptedNgos } from "../../../app/usecases/ngo/getAllAcceptedNgos";

const ngoRespository = ngoRepositroyEmpl(ngoModel);

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

 const getAllAcceptedNgosController = async (req: CustomRequest, res: Response) => {
 try {
  const ngos = await getAllAcceptedNgos(ngoRespository)(req.userInfo?.id as string);
  return res.status(201).json({ message: "Fetched ngos sucessfully" , ngos });
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default getAllAcceptedNgosController;