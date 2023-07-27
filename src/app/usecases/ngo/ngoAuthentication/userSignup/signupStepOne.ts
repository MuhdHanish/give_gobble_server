import { otpSender } from "../../../../../utils/otpSendAndStore";
import { ngoRepository } from "../../../../../framework/repository/ngoRespository";

export const signupStepOne =
  (ngoRepository: ngoRepository) =>
    async (username: string, email: string): Promise<{ message: string | null, uId: string | null }> => {
      try {
        const user = await ngoRepository.findByUsernameAndEmail(username,email);
         if (user) {
           if (user.username === username) {
             return { message: "Username already exists", uId: null };
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

