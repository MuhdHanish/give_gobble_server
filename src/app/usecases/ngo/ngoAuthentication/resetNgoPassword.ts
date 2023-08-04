import { Ngo } from "../../../../domain/models/Ngo";
import { ngoRepository } from "../../../../framework/repository/ngoRespository";

export const resetNgoPassword = (ngoRepository: ngoRepository) => async(usernameOrEmail:string,newPassword:string): Promise<Ngo|null> => {
  const ngo = await ngoRepository.resetNgoPassword(usernameOrEmail,newPassword);
  if (ngo) {
    return ngo;
  } else {
    return null;
  }
}