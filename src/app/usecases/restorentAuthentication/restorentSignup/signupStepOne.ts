import { otpSender } from "../../../../utils/otpSendAndStore";
import { restorentRepository } from "../../../../framework/repository/restorentRepository";

export const signupStepOne =
  (restorentRepository: restorentRepository) =>
    async (restorentname: string, email: string): Promise<{ message: string | null, uId: string | null }> => {
      try {
        const user = await restorentRepository.findByRestorentnameAndEmail(restorentname,email);
         if (user) {
           if (user.restorentname === restorentname) {
             return { message: "Restorent name already exists", uId: null };
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

