import mongoose from "mongoose";
import { Restaurant } from "../../../domain/models/Restaurant";
import { restaurantRepository } from "../../../framework/repository/restaurantRepository";

export const getRestaurantById = (restaurantRepository: restaurantRepository) => async(restaurantId: mongoose.Types.ObjectId): Promise<Restaurant|null> => {
  const restaurant = await restaurantRepository.findRestaurantById(restaurantId);
  if (restaurant) {
    return restaurant;
  } else {
    return null;
  }
}