import { User, Session } from "next-auth";

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export type Post = {
  _id: string;
  prompt: string;
  tag: string;
  creator: UserProfile;
};

export type CreateUserProfile = {
  email: string;
  name: string;
  image: string;
};

export type SignUp = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserProfile = {
  name: string;
  username: string;
  bio: string;
};

export type UserProfile = {
  _id: string;
  email: string;
  name: string;
  username: string;
  image?: string;
  bio?: string;
  prompts?: Post[];
  followers?: UserProfile[];
  following?: UserProfile[];
};

export type Params = {
  params: {
    id: string;
  };
};

export type FollowerUser = {
  _id: string;
  username: string;
  name: string;
  image?: string;
};

export enum ModalType {
  "Following",
  "Followers",
}
