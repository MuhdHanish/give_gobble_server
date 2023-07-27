import mongoose from "mongoose";
import { FoodRequest } from "../../domain/models/FoodRequest";
import { MongoDBFoodRequest } from "../database/models/foodRequestModel";

export type foodRequestRepository = {
  postRequest: (userId: string, title: string, quantity: number, time: string, location: string) => Promise<FoodRequest | null>;
  acceptRequest: (requestId: string) => Promise<FoodRequest | null>;
  completeRequest: (requestId: string) => Promise<FoodRequest | null>;
  getSelectedRequest: (requestId: string) => Promise<FoodRequest|null>;
  getPendingRequests: () => Promise<FoodRequest[] | null>;
  getAcceptedRequests: () => Promise<FoodRequest[] | null>;
  getCompletedRequests: () => Promise<FoodRequest[] | null>;
};

export const foodRequestRepositoryEmpl = (foodRequstModel: MongoDBFoodRequest): foodRequestRepository => {

  const postRequest = async (userId: string, title: string, quantity: number, time: string, location: string): Promise<FoodRequest | null> => {
    try {
      const newRequest: FoodRequest = {
        userId: new mongoose.Types.ObjectId(userId),
        title,
        quantity,
        time,
        location
      };
      const createRequest = await foodRequstModel.create(newRequest);
      return createRequest.toObject();
    } catch (error) {
      console.error("Error while storing request", error);
      return null;
    }
  }

  const acceptRequest = async (requestId: string): Promise<FoodRequest | null> => {
    try {
      const acceptedNgo = await foodRequstModel
        .findByIdAndUpdate(
          requestId,
          { status: "Accepted" },
          { new: true }
        )
        .exec();
      if (acceptedNgo) {
        return acceptedNgo.toObject();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error while accepting request", error);
      return null;
    }
  };

  const completeRequest = async (requestId: string): Promise<FoodRequest | null> => {
    try {
      const completedRequest = await foodRequstModel
        .findByIdAndUpdate(
          requestId,
          { status: "Completed" },
          { new: true }
        )
        .exec();
      if (completedRequest) {
        return completedRequest.toObject();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error while completing request", error);
      return null;
    }
  };

  const getSelectedRequest = async (requestId: string): Promise<FoodRequest | null > => {
    try {
      const selectedRequest = await foodRequstModel.findById(requestId).exec();
      if (selectedRequest) {
        return selectedRequest.toObject();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error while getting selected request and user", error);
      return null;
    }
  };

  const getPendingRequests = async (): Promise<FoodRequest[] | null> => {
    try {
      const pendingRequests = await foodRequstModel.find({ status: "Pending" });
      return pendingRequests;
    } catch (error) {
      console.error("Error while getting pending requests", error);
      return null;
    }
  }

  const getAcceptedRequests = async (): Promise<FoodRequest[] | null> => {
    try {
      const acceptedRequests = await foodRequstModel.find({ status: "Accepted" });
      return acceptedRequests;
    } catch (error) {
      console.error("Error while getting accepted requests", error);
      return null;
    }
  }

  const getCompletedRequests = async (): Promise<FoodRequest[] | null> => {
    try {
      const completedRequests = await foodRequstModel.find({ status: "Completed" });
      return completedRequests;
    } catch (error) {
      console.error("Error while getting completed requests", error);
      return null;
    }
  }
  return {
    postRequest,
    acceptRequest,
    completeRequest,
    getSelectedRequest,
    getPendingRequests,
    getAcceptedRequests,
    getCompletedRequests,
  };
};
