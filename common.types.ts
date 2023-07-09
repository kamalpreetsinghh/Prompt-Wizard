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

export type UserProfile = {
  _id: string;
  email: string;
  name: string;
  username: string;
  image: string;
  bio?: string;
};
