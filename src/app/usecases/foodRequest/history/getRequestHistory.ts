import { FoodRequest } from "../../../../domain/models/FoodRequest";
import { foodRequestRepository } from "../../../../framework/repository/foodRequestRepository";

export const getRequestHistory =
  (foodRequestRepository: foodRequestRepository) => async (userId: string):Promise<FoodRequest[]|null> => {
    const foodRequestHistory = await foodRequestRepository.getRequestHistory(userId);
    if (foodRequestHistory) {
      return foodRequestHistory;
    } else {
      return null;
    }
  };

export const removeRequestFromHistory =
  (foodRequestRepository: foodRequestRepository) => async (requestId: string):Promise<FoodRequest|null> => {
    const removedRequest = await foodRequestRepository.removeRequestFromHistory(requestId);
    if (removedRequest) {
      return removedRequest;
    } else {
      return null;
    }
  };

export const removeAllRequestFromHistory =
  (foodRequestRepository: foodRequestRepository) => async (requestId: string):Promise<boolean|null> => {
    const removedRequest = await foodRequestRepository.removeAllRequestFromHistory(requestId);
    if (removedRequest) {
      return true;
    } else {
      return false;
    }
};