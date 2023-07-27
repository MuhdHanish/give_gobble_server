import { FoodRequest } from "../../../domain/models/FoodRequest";
import { foodRequestRepository } from "../../../framework/repository/foodRequestRepository";


export const postFoodRequest = (foodRequestRepository: foodRequestRepository) =>
  async (userId: string, title: string, quantity: number, time: string, location: string,role:string): Promise<FoodRequest | null> => {
    const createdRequest = await foodRequestRepository.postRequest(userId, title, quantity, time, location, role);
    if (createdRequest) {
      return createdRequest;
    } else {
      return null;
    }
  }