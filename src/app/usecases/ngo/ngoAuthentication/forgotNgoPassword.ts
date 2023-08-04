import { ngoRepository } from "../../../../framework/repository/ngoRespository";
import { otpSender } from "../../../../utils/otpSendAndStore";

export const forgotNgoPassword  =
  (ngoRepository: ngoRepository) =>
  async (usernameOrEmail: string): Promise<string | null> => {
    const currentNgo = await ngoRepository.findByUsernameOrEmail(usernameOrEmail);
    if (currentNgo && currentNgo.status) {
       const uId = await otpSender(currentNgo?.email as string, `Otp verification`);
      return uId;
    }
    return null;
  };
