import { Ngo } from "../../../domain/models/Ngo";
import { ngoRepository } from "../../../framework/repository/ngoRespository";

export const getRequestedNgos = (ngoRepository: ngoRepository) => async (): Promise<Ngo[] | null> => {
  const requestedNgos = await ngoRepository.getNotVerifiedNgos();
  if (requestedNgos) {
    return requestedNgos;
  }
  return null
}