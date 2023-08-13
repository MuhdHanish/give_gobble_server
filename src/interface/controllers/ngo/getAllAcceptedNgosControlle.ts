import { Request, Response } from "express";
import { ngoModel } from "../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../framework/repository/ngoRespository";
import { getAllAcceptedNgos } from "../../../app/usecases/ngo/getAllAcceptedNgos";

const ngoRespository = ngoRepositroyEmpl(ngoModel);

 const getAllAcceptedNgosController = async (req: Request, res: Response) => {
 try {
  const ngos = await getAllAcceptedNgos(ngoRespository)();
  return res.status(201).json({ message: "Fetched ngos sucessfully" , ngos });
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default getAllAcceptedNgosController;