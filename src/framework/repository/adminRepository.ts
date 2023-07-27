import { Admin } from "../../domain/models/Admin";
import { MongoDBAdmin } from "../database/models/adminModel";
import bcrypt from "bcryptjs";

export type adminRepository = {
  findByadminnameOrEmailAndPassword: (usernameOrEmail: string,password:string) => Promise<Admin | null>;
  createAdmin: (amdin: Admin) => Promise<Admin | null>;
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

  const createAdmin = async (admin: Admin): Promise<Admin | null> => {
    const hashPass: string = await bcrypt.hash(admin.password as string, 12);
    const newAdmin: Admin = {
      username: admin.username,
      email: admin.email,
      password: hashPass,
    };
    const createdAdmin = await adminModel.create(newAdmin);
    if (createdAdmin) {
      const { password,username,email, ...adminDetails } = createdAdmin.toObject();
      return adminDetails;
    }
    return null;
  };

  return {
    findByadminnameOrEmailAndPassword,
    createAdmin,
  };
}