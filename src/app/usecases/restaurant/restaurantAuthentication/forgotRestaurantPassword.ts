import { restaurantRepository } from "../../../../framework/repository/restaurantRepository";
import { otpSender } from "../../../../utils/otpSendAndStore";

export const forgotRestaurantPassword  =
  (restaurantRepository: restaurantRepository) =>
  async (usernameOrEmail: string): Promise<string | null> => {
    const currentRestuarant = await restaurantRepository.findByUsernameOrEmail(usernameOrEmail);
    if (currentRestuarant && currentRestuarant.status) {
       const uId = await otpSender(currentRestuarant?.email as string, `Otp verification`);
      return uId;
    }
    return null;
  };
