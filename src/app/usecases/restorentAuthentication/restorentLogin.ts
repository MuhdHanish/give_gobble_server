import { Restorent } from "../../../domain/models/Restorent";
import bcrypt from "bcryptjs";
import { restorentRepository } from "../../../framework/repository/restorentRepository";

export const userLogin =
  (restorentRepository: restorentRepository) =>
  async (email: string, password: string): Promise<Restorent | null> => {
    const currentUser = await restorentRepository.findByRestorentEmail(email);
    if (currentUser && currentUser.status) {
      if (
        currentUser.password &&
        bcrypt.compareSync(password, currentUser.password)
      ) {
        const user: Restorent = {
          _id: currentUser._id,
          restorentname: currentUser.restorentname,
          email: currentUser.email,
          profile: currentUser.profile,
        };
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
