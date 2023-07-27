import { Admin } from "../../../../domain/models/Admin";
import { adminRepository } from "../../../../framework/repository/adminRepository";

export const adminLogin =
  (adminRepository: adminRepository) =>
  async (usernameOrEmail: string, password: string): Promise<Admin | null> => {
    const admin = await adminRepository.findByadminnameOrEmailAndPassword(usernameOrEmail,password);
    if (admin) {
      return admin;
    }
    return null;
  };
