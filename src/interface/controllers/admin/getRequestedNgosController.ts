import { Request, Response } from "express";
import { ngoModel } from "../../../framework/database/models/ngoModel";
import { ngoRepositroyEmpl } from "../../../framework/repository/ngoRespository";
import { getRequestedNgos } from "../../../app/usecases/ngo/foodRequestVerify/getNgoRequest";

const ngoRepository = ngoRepositroyEmpl(ngoModel);

 const getRequestedNgosController = async (req: Request, res: Response) => {
  try {
    const requestedNgos = await getRequestedNgos(ngoRepository)();
    if (requestedNgos) {
      res.status(200).json({ message: "Requsted Ngos fetched successfully", requestedNgos });
    } else {
      res.status(400).json({ message: "Error occured" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getRequestedNgosController;