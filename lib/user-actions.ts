import User from "@/models/user";
import { connectToDB } from "./dbConfig";
import { CreateUserProfile, SignUp, UpdateUserProfile } from "@/common.types";
import { Types } from "mongoose";

connectToDB();

export const checkIfUserExists = async (email: string) => {
  const userExists = await User.exists({ email });
  return userExists;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const createUserProfile = async ({
  email,
  name,
  image,
}: CreateUserProfile) => {
  const users = await User.find({ name: name }).select("username");
  const existingUsernames: string[] = users.map((user) => user.username);

  const username = createUsername(name, existingUsernames);

  await User.create({
    email,
    name,
    username,
    image,
  });
};

export const createUserCredentialsProfile = async ({
  name,
  email,
  password,
}: SignUp) => {
  const users = await User.find({ name }).select("username");
  const existingUsernames: string[] = users.map((user) => user.username);

  const username = createUsername(name, existingUsernames);

  const newUser = await User.create({
    email,
    name,
    username,
    password,
  });

  return newUser;
};

export const getUserProfile = async (id: string) => {
  const user = await User.findById(id).select("_id username name image bio");
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

export const getFollowers = async (id: string) => {
  const result = await User.findById(id).populate({
    path: "followers",
    select: "_id name username image",
  });

  return result;
};

export const getFollowing = async (id: string) => {
  const result = await User.findById(id).populate({
    path: "following",
    select: "_id name username image",
  });

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
    if (!following.includes(followingId)) {
      following.push(followingId);
      user.following = following;

      await user.save();
    }
  }

  const followingUser = await User.findById(followingId);
  if (followingUser) {
    const followers: string[] = followingUser?.followers || [];
    if (!followers.includes(id)) {
      followers.push(id);
      followingUser.followers = followers;

      await followingUser.save();
    }
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

  const followingUser = await User.findById(followingId);
  if (followingUser) {
    let followers = followingUser?.followers || [];

    followers = followers.filter(
      (fId: Types.ObjectId) => fId.toString() !== id
    );

    followingUser.followers = followers;

    await followingUser.save();
  }
};

export const updateProfileImage = async (id: string, image: string) => {
  const user = await User.findById(id);

  let result;

  if (user) {
    user.image = image;
    result = await user.save();
  }

  return result;
};

export const updateUserPassword = async (
  forgotPasswordToken: string,
  newPassword: string
) => {
  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  console.log(user);

  if (user) {
    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();
  }

  return user;
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
