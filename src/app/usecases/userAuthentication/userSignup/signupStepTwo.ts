import { User } from "../../../../domain/models/User";
import { userRepository } from "../../../../framework/repository/userRepository";

export const signupStepTwo =
  (userRepository: userRepository) =>
  async (username: string,email: string,password: string,location:string
  ): Promise<User | null> => {
    const newUser: User = { username, email, password, location };
    const user = await userRepository.createUser(newUser);
    if (user) {
     return user
    } else {
      return null;
    }
};
