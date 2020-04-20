import { User } from "../entity/User";

export const getUserByEmail = async (email: string) => {
  return await User.findOneOrFail({ where: { email } });
};

export const getUserById = async (id: number) => {
  return await User.findOneOrFail(id);
};

export const updatePassword = async (user: User) => {
  // Hash the new password and save
  user.hashPassword();
  return await User.save(user);
};

export const createUser = async (email: string, password: string) => {
  const user = new User();
  user.email = email;
  user.password = password;
  user.hashPassword();
  return await User.save(user);
};
