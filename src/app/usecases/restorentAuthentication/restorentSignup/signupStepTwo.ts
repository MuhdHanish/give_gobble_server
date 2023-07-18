import { Restorent } from "../../../../domain/models/Restorent";
import { restorentRepository } from "../../../../framework/repository/restorentRepository";

export const signupStepTwo =
  (restorentRepository: restorentRepository) =>
  async (restorentname: string,email: string,password: string,location:string
  ): Promise<Restorent | null> => {
    const newRestorent: Restorent = { restorentname, email, password, location };
    const restorent = await restorentRepository.createRestorent(newRestorent);
    if (restorent) {
      return restorent;
    } else {
      return null;
    }
};
