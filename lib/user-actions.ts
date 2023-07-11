import User from "@/models/user";
import { connectToDB } from "./dbConfig";
import { CreateUserProfile, UpdateUserProfile } from "@/common.types";
import mongoose, { Types } from "mongoose";

connectToDB();

export const createUserProfile = async ({
  email,
  name,
  image,
}: CreateUserProfile) => {
  const userExists = await User.exists({ email });

  if (!userExists) {
    const users = await User.find({ name: name }).select("username");
    const existingUsernames: string[] = users.map((user) => user.username);

    const username = createUsername(name, existingUsernames);

    await User.create({
      email,
      name,
      username,
      image,
    });
  }
};

export const getUserProfile = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const getUserProfileByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const checkIfUsernameExists = async (
  id: string,
  username: string
): Promise<boolean> => {
  const user = await User.exists({ username });
  return user != null && user._id != id;
};

export const updateUserProfile = async (
  id: string,
  { name, username, bio }: UpdateUserProfile
) => {
  const user = await User.findById(id);

  let result;

  if (user) {
    user.username = username;
    user.name = name;
    user.bio = bio;

    result = await user.save();
  }

  return result;
};

export const isFollowing = async (id: string, followingId: string) => {
  const user = await User.findById(id).select("following");

  let result = false;

  if (user) {
    const following: string[] = user?.following || [];
    result = following.includes(followingId);
  }

  return result;
};

export const addFollowing = async (id: string, followingId: string) => {
  const user = await User.findById(id);

  if (user) {
    const following: string[] = user?.following || [];
    following.push(followingId);
    user.following = following;

    await user.save();
  }
};

export const removeFollowing = async (id: string, followingId: string) => {
  const user = await User.findById(id);

  if (user) {
    let following = user?.following || [];

    following = following.filter(
      (fId: Types.ObjectId) => fId.toString() !== followingId
    );

    user.following = following;

    await user.save();
  }
};

const createUsername = (name: string, usernames: string[]): string => {
  let username = name.trim().toLowerCase().replace(/\s/g, "");

  let count = 1;
  while (usernames.includes(username)) {
    username = `${username}${count}`;
    count++;
  }
  return username;
};
