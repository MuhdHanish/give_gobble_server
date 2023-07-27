import { Restaurant } from "../../domain/models/Restaurant";
import { MongoDDRestaurant } from "../database/models/restaurantModel";
import bcrypt from "bcryptjs";

export type restaurantRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<Restaurant | null>;
  findByUsernameOrEmailAndPassword: (usernameOrEmail: string,password:string) => Promise<Restaurant | null>;
  findOnerestaurant: (restaurant: Restaurant) => Promise<Restaurant | null>;
  createrestaurant: (restaurant: Restaurant) => Promise<Restaurant | null>;
};

export const restaurantRespositoryEmpl = (restaurantModel: MongoDDRestaurant): restaurantRepository => {
  const findByUsernameAndEmail = async (username: string, email: string): Promise<Restaurant | null> => {
    const restaurant = await restaurantModel.findOne({ $or: [{ username }, { email }] }, { password: 0 }).exec();
    return restaurant ? restaurant.toObject() : null;
  };

  const findByUsernameOrEmailAndPassword = async (usernameOrEmail: string, password: string): Promise<Restaurant | null> => {
  const restaurant = await restaurantModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
  }).exec();
  if (restaurant) {
    const passwordMatch = bcrypt.compareSync(password, restaurant.password as string);
    if (passwordMatch) {
      const { password, ...restaurantWithoutPassword } = restaurant.toObject();
      return restaurantWithoutPassword;
    }
  }
  return null;
  };

  const findOnerestaurant = async (restaurant: Restaurant): Promise<Restaurant | null> => {
    const currentrestaurant = await restaurantModel.findOne(restaurant, { password: 0 }).exec();
    return currentrestaurant ? currentrestaurant.toObject() : null;
  };

  const createrestaurant = async (restaurant: Restaurant): Promise<Restaurant | null> => {
    const hashPass: string = await bcrypt.hash(restaurant.password as string, 12);
    const newrestaurant: Restaurant = {
      username: restaurant.username,
      email: restaurant.email,
      password: hashPass,
      location: restaurant.location,
    };
    const createdrestaurant = await restaurantModel.create(newrestaurant);
    if (createdrestaurant) {
      const { password, ...restoredrestaurant } = createdrestaurant.toObject();
      return restoredrestaurant;
    }
    return null;
  };

  return {
    findByUsernameAndEmail,
    findByUsernameOrEmailAndPassword,
    findOnerestaurant,
    createrestaurant,
  };
};
