import { Restaurant } from "../../../../domain/models/Restaurant";
import { restaurantRepository } from "../../../../framework/repository/restaurantRepository";

export const resetRestaurantPassword = (restaurantRepository: restaurantRepository) => async(usernameOrEmail:string,newPassword:string): Promise<Restaurant|null> => {
  const restaurant = await restaurantRepository.resetRestaurantPassword(usernameOrEmail,newPassword);
  if (restaurant) {
    return restaurant;
  } else {
    return null;
  }
}