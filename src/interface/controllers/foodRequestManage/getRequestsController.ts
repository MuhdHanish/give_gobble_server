import mongoose from "mongoose";
import { Request, Response } from "express";
import { foodRequestModel } from "../../../framework/database/models/foodRequestModel";
import { foodRequestRepositoryEmpl } from "../../../framework/repository/foodRequestRepository";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { getAcceptedRequests, getCompletedRequests, getPendingRequests, getSelectedFoodRequest } from "../../../app/usecases/foodRequest/getFoodRequests";
import { getUserById } from "../../../app/usecases/user/getUserById";
import { getRestaurantById } from "../../../app/usecases/restaurant/getRestaurantById";
import { userModel } from "../../../framework/database/models/userModel";
import { restaurantRespositoryEmpl } from "../../../framework/repository/restaurantRepository";
import { restaurantModel } from "../../../framework/database/models/restaurantModel";

const foodRequestRepository = foodRequestRepositoryEmpl(foodRequestModel);
const restaurantRepository = restaurantRespositoryEmpl(restaurantModel);
const userRepository = userRepositoryEmpl(userModel);

export const getSelectedRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const selectedRequest = await getSelectedFoodRequest(foodRequestRepository)(id);
    let user = null;
    if (selectedRequest) {
      if (selectedRequest.userRole === "user") {
        user = await getUserById(userRepository)(selectedRequest.userId as mongoose.Types.ObjectId);
        return res.status(200).json({message:"feteched selected request and user", selectedRequest, user})
      } else if (selectedRequest.userRole === "restaurant") {
        user = await getRestaurantById(restaurantRepository)(selectedRequest.userId as mongoose.Types.ObjectId);
        return res.status(200).json({message:"feteched selected request and user", selectedRequest, user})
      }
    } else {
      res.status(400).json({ message: "Error occured" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getPendingRequestsContorller =  async (req: Request, res: Response) => {
  try {
    const pendingRequests = await getPendingRequests(foodRequestRepository)();
    return res.status(200).json({ message: "Fetched pending requests", pendingRequests });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const getAcceptedRequestsController =  async (req: Request, res: Response) => {
  try {
    const acceptedRequests = await getAcceptedRequests(foodRequestRepository)();
    return res.status(200).json({ message: "Fetched pending requests", acceptedRequests });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const getCompletedRequestsController =  async (req: Request, res: Response) => {
  try {
    const completedRequests = await getCompletedRequests(foodRequestRepository)();
    return res.status(200).json({ message: "Fetched pending requests", completedRequests });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}