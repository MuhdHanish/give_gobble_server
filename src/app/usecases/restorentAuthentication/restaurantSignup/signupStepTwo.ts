import { Restaurant } from "../../../../domain/models/Restaurant";
import { restaurantRepository } from "../../../../framework/repository/restaurantRepository";

export const signupStepTwo =
  (restaurantRepository: restaurantRepository) =>
  async (username: string,email: string,password: string,location:string
  ): Promise<Restaurant | null> => {
    const newrestaurant: Restaurant = { username, email, password, location };
    const restaurant = await restaurantRepository.createrestaurant(newrestaurant);
    if (restaurant) {
      return restaurant;
    } else {
      return null;
    }
};
