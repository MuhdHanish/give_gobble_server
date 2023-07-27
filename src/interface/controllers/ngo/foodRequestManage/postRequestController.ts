import { Request, Response } from "express";
import { foodRequestModel } from "../../../../framework/database/models/foodRequestModel";
import { foodRequestRepositoryEmpl } from "../../../../framework/repository/foodRequestRepository";
import { postFoodRequest } from "../../../../app/usecases/foodRequest/postFoodRequest";


const foodRequestRepository = foodRequestRepositoryEmpl(foodRequestModel);

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}


const postFoodRequestController = async (req: CustomRequest, res: Response) => {
  try {
    const { title, time, location, quantity } = req.body;
    const postedRequest = await postFoodRequest(foodRequestRepository)(req.userInfo?.id as string, title, quantity, time, location, req.userInfo?.role as string);
    if (postedRequest) {
      return res.status(201).json({ message: "Request posted successfully", postFoodRequest });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default postFoodRequestController;