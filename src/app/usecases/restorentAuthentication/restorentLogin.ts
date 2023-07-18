import { Restorent } from "../../../domain/models/Restorent";
import { restorentRepository } from "../../../framework/repository/restorentRepository";

export const restorentLogin =
  (restorentRepository: restorentRepository) =>
  async (restorentusernameOrEmail: string, password: string): Promise<Restorent | null> => {
    const currentRestorent = await restorentRepository.findByUsernameOrEmailAndPassword(restorentusernameOrEmail,password);
    if (currentRestorent && currentRestorent.status) {
      return currentRestorent;
    }
    return null;
  };
