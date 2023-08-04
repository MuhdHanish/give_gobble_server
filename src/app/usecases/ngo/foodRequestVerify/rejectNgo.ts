import { Ngo } from "../../../domain/models/Ngo";
import { ngoRepository } from "../../../framework/repository/ngoRespository";

export const rejectNgo = (ngoRepository: ngoRepository) => async (ngoId: string):Promise<Ngo|null> => {
  const rejectedNgo = await ngoRepository.rejectNgo(ngoId);
  if (rejectedNgo) {
    return rejectedNgo;
  }
  return null;
}