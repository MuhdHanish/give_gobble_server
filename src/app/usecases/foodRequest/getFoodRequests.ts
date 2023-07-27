import { FoodRequest } from "../../../domain/models/FoodRequest";
import { foodRequestRepository } from "../../../framework/repository/foodRequestRepository";


export const getSelectedFoodRequest =
  (foodRequestRepository: foodRequestRepository) => async (requestId: string):Promise<FoodRequest|null> => {
    const selecetedFoodRequest = await foodRequestRepository.getSelectedRequest(requestId);
    if (selecetedFoodRequest) {
      return selecetedFoodRequest;
    } else {
      return null;
    }
};
export const getPendingRequests =
  (foodRequestRepository: foodRequestRepository) => async ():Promise<FoodRequest[]|null> => {
    const pendingRequests = await foodRequestRepository.getPendingRequests();
    if (pendingRequests) {
      return pendingRequests;
    } else {
      return null;
    }
  };

export const getAcceptedRequests =
  (foodRequestRepository: foodRequestRepository) => async ():Promise<FoodRequest[]|null> => {
    const acceptedRequests = await foodRequestRepository.getAcceptedRequests();
    if (acceptedRequests) {
      return acceptedRequests;
    } else {
      return null;
    }
  };

export const getCompletedRequests =
  (foodRequestRepository: foodRequestRepository) => async ():Promise<FoodRequest[]|null> => {
    const completedRequests = await foodRequestRepository.getCompletedRequests();
    if (completedRequests) {
      return completedRequests;
    } else {
      return null;
    }
};