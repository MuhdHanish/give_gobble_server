import { Admin } from "../../domain/models/Admin";
import { MongoDBAdmin } from "../database/models/adminModel";
import bcrypt from "bcryptjs";

export type adminRepository = {
  findByadminnameOrEmailAndPassword: (usernameOrEmail: string, password: string) => Promise<Admin | null>;
};

export const adminRepositoryEmpl = (adminModel: MongoDBAdmin): adminRepository => {
  const findByadminnameOrEmailAndPassword = async (usernameOrEmail: string, password: string): Promise<Admin | null> => {
    try {
      const admin = await adminModel.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      }).exec();
      if (admin) {
        const passwordMatch = bcrypt.compareSync(password, admin.password as string);
        if (passwordMatch) {
          const { password, username, email, ...adminDetails } = admin.toObject();
          return adminDetails;
        }
      }
      return null;
    } catch (error) {
      console.error("Error finding admin by username or email and password:", error);
      return null;
    }
  };

  return {
    findByadminnameOrEmailAndPassword,
  };
};
