import { Restaurant } from "../../../domain/models/Restaurant";
import { restaurantRepository } from "../../../framework/repository/restaurantRepository";

export const restaurantLogin =
  (restaurantRepository: restaurantRepository) =>
  async (usernameOrEmail: string, password: string): Promise<Restaurant | null> => {
    const currentrestaurant = await restaurantRepository.findByUsernameOrEmailAndPassword(usernameOrEmail,password);
    if (currentrestaurant && currentrestaurant.status) {
      return currentrestaurant;
    }
    return null;
  };
