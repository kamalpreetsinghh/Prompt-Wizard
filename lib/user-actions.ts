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
  const result = await User.exists({ username });
  return result != null && result._id !== id;
};

export const updateUserProfile = async (
  id: string,
  newUsername: string,
  newName: string,
  newDescription: string
) => {
  const userProfile = await User.findById(id);
  userProfile.username = newUsername;
  userProfile.name = newName;
  userProfile.description = newDescription;
  const result = await userProfile.save();
  return result;
};
