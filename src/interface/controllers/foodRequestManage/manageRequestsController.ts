import { Request, Response } from "express";
import { foodRequestModel } from "../../../framework/database/models/foodRequestModel";
import { foodRequestRepositoryEmpl } from "../../../framework/repository/foodRequestRepository";
import { acceptRequest, completeRequest } from "../../../app/usecases/foodRequest/manageFoodRequest";

const foodRequestRepository = foodRequestRepositoryEmpl(foodRequestModel);

export const acceptRequestController = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const acceptedRequest = await acceptRequest(foodRequestRepository)(id);
    if (acceptedRequest) {
      return res.status(200).json({ message: "Request accepted", acceptedRequest });
    } else {
      return res.status(400).json({ message: "Error occured" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const completeRequestController = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const completedRequest = await completeRequest(foodRequestRepository)(id);
    if (completedRequest) {
      return res.status(200).json({ message: "Request completed", completedRequest });
    } else {
      return res.status(400).json({ message: "Error occured" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}