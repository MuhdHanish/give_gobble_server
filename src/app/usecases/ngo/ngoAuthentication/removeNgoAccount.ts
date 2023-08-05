import { Ngo } from "../../../../domain/models/Ngo";
import { ngoRepository } from "../../../../framework/repository/ngoRespository";

export const removeNgoAccount =
  (ngoRepository: ngoRepository) =>
  async (ngoId: string): Promise<Ngo | null> => {
    const removedNgoAccount = await ngoRepository.removeNgoAccount(ngoId);
    if (removedNgoAccount) {
      return removedNgoAccount;
    }
    return null;
  };
