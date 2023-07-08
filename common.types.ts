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
  creator: {
    _id: string;
    name: string;
    email: string;
    username: string;
    image: string;
    description: string;
  };
};

export type UserProfile = {
  _id: string;
  email: string;
  name: string;
  username: string;
  image: string;
  description?: string;
};
