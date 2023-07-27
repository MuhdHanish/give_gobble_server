import { Ngo } from "../../../../domain/models/Ngo";
import { ngoRepository } from "../../../../framework/repository/ngoRespository";

export const signupStepTwo =
  (ngoRepository: ngoRepository) =>
  async (username: string,email: string,password: string,ngoType: string, address: string, pincode:string
  ): Promise<Ngo | null> => {
    const newUser: Ngo = { username, email, password,ngoType, address, pincode };
    const user = await ngoRepository.createUser(newUser);
    if (user) {
     return user
    } else {
      return null;
    }
};
