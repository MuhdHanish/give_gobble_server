import { Request, Response } from "express";
import { foodRequestRepositoryEmpl } from "../../../../framework/repository/foodRequestRepository";
import { getRequestHistory,removeAllRequestFromHistory,removeRequestFromHistory } from "../../../../app/usecases/foodRequest/history/getRequestHistory";
import { foodRequestModel } from "../../../../framework/database/models/foodRequestModel";

const foodRequestRepository = foodRequestRepositoryEmpl(foodRequestModel);

export const getRequestHistoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requestHistory = await getRequestHistory(foodRequestRepository)(id);
    return res.status(200).json({ message: "Fetched pending requests history", requestHistory });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const removeRequestFromHistoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const removedRequest = await removeRequestFromHistory(foodRequestRepository)(id);
    if (removedRequest) {
      return res.status(200).json({ message: "Removed the request of user", removedRequest });
    } else {
      return res.status(400).json({ message: "Removed the request of user failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const removeAllRequestFromHistoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requestHistoryCleared = await removeAllRequestFromHistory(foodRequestRepository)(id);
    if (requestHistoryCleared) {
      return res.status(200).json({ message: "Removed all request of user" });
    } else {
      return res.status(400).json({ message: "Removed all request of user failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

