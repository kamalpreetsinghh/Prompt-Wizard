import User from "@/models/user";
import { connectToDB } from "./database";

export const getUserProfile = async (id: string) => {
  await connectToDB();

  const user = await User.findById(id);
  return user;
};

export const checkIfUsernameExists = async (
  id: string,
  username: string
): Promise<boolean> => {
  await connectToDB();

  const user = await User.exists({ username });
  return user != null && user._id !== id;
};

export const updateUserProfile = async (
  id: string,
  updatedUsername: string,
  updatedName: string,
  updatedBio: string
) => {
  await connectToDB();

  const user = await User.findById(id);
  user.username = updatedUsername;
  user.name = updatedName;
  user.bio = updatedBio;
  const result = await user.save();
  return result;
};
