import { Admin } from "../../domain/models/Admin";
import { MongoDBAdmin } from "../database/models/adminModel";
import bcrypt from "bcryptjs";

export type adminRepository = {
  findByadminnameOrEmailAndPassword: (usernameOrEmail: string,password:string) => Promise<Admin | null>;
};

export const adminRepositoryEmpl = (adminModel: MongoDBAdmin): adminRepository => {
  const findByadminnameOrEmailAndPassword = async (usernameOrEmail: string, password: string): Promise<Admin | null> => {
    const admin = await adminModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    }).exec();
    if (admin) {
      const passwordMatch = bcrypt.compareSync(password, admin.password as string);
      if (passwordMatch) {
        const { password, username, email, ...adminDetails } = admin.toObject();
        return adminDetails;
      }
    }
    return null;
  };

  return {
    findByadminnameOrEmailAndPassword,
  };
}