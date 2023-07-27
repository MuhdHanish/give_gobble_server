import { FoodRequest } from "../../../domain/models/FoodRequest";
import { foodRequestRepository } from "../../../framework/repository/foodRequestRepository";


export const acceptRequest = (foodRequestRepository: foodRequestRepository) => async (requestId: string): Promise<FoodRequest | null> => {
  const acceptedRequest = foodRequestRepository.acceptRequest(requestId);
  if (acceptedRequest) {
    return acceptedRequest;
  } else {
    return null
  }
}

export const completeRequest = (foodRequestRepository: foodRequestRepository) => async (requestId: string): Promise<FoodRequest | null> => {
  const completeddRequest = foodRequestRepository.completeRequest(requestId);
  if (completeddRequest) {
    return completeddRequest;
  } else {
    return null;
  }
}