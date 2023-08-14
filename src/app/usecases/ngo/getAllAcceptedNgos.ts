import { Ngo } from "../../../domain/models/Ngo";
import { ngoRepository } from "../../../framework/repository/ngoRespository";

export const getAllAcceptedNgos = (ngoRepository: ngoRepository) => async(id:string): Promise<Ngo[] | null> => {
  const acceptedNgos = await ngoRepository.getAllAcceptedNgos(id);
  if (acceptedNgos) {
    return acceptedNgos;
  }
  return null
}