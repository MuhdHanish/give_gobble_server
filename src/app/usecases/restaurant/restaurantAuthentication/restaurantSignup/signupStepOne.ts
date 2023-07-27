import { otpSender } from "../../../../../utils/otpSendAndStore";
import { restaurantRepository } from "../../../../../framework/repository/restaurantRepository";

export const signupStepOne =
  (restaurantRepository: restaurantRepository) =>
    async (username: string, email: string): Promise<{ message: string | null, uId: string | null }> => {
      try {
        const user = await restaurantRepository.findByUsernameAndEmail(username,email);
         if (user) {
           if (user.username === username) {
             return { message: "restaurant name already exists", uId: null };
           }
           if (user.email === email) {
             return { message: "Email already exists", uId: null };
           }
         }
         const uId = await otpSender(email, `Otp verification`);
        return { message: null, uId };
      } catch (error:any) {
        throw new Error(error);
      }
  };

