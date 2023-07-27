import { Ngo } from "../../../../domain/models/Ngo";
import { ngoRepository } from "../../../../framework/repository/ngoRespository";

export const userLogin =
  (ngoRepository: ngoRepository) =>
  async (usernameOrEmail: string, password: string): Promise<Ngo | null> => {
    const currentUser = await ngoRepository.findByUsernameOrEmailAndPassword(usernameOrEmail,password);
    if(currentUser&& currentUser.status){
    return currentUser;
    }
      return null;
  };
