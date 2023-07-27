import { Ngo } from "../../../domain/models/Ngo";
import { ngoRepository } from "../../../framework/repository/ngoRespository";

export const acceptNgo = (ngoRepository: ngoRepository) => async (ngoId:string): Promise<Ngo | null> => {
  const acceptedNgo = await ngoRepository.acceptNgo(ngoId);
  if (acceptedNgo) {
    return acceptedNgo;
  }
  return null
}