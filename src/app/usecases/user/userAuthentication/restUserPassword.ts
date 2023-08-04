import { User } from "../../../../domain/models/User";
import { userRepository } from "../../../../framework/repository/userRepository";

export const resetUserPassword = (userRepository: userRepository) => async(usernameOrEmail:string,newPassword:string): Promise<User|null> => {
  const user = await userRepository.resetUserPassword(usernameOrEmail,newPassword);
  if (user) {
    return user;
  } else {
    return null;
  }
}