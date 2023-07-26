import { Restaurant } from "../../../domain/models/Restaurant";
import { restaurantRepository } from "../../../framework/repository/restaurantRepository";

export const restaurantLogin =
  (restaurantRepository: restaurantRepository) =>
  async (restaurantusernameOrEmail: string, password: string): Promise<Restaurant | null> => {
    const currentrestaurant = await restaurantRepository.findByrestaurantnameOrEmailAndPassword(restaurantusernameOrEmail,password);
    if (currentrestaurant && currentrestaurant.status) {
      return currentrestaurant;
    }
    return null;
  };
