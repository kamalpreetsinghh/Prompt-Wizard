import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { CreateUserProfile } from "@/common.types";
import bcryptjs from "bcryptjs";

import {
  createUserProfile,
  getUserByEmail,
  getUserProfileByEmail,
  updateProfileImage,
} from "./user-actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("Email does not exist.");
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        // check if password is correct
        if (!validPassword) {
          throw new Error("Incorrect Username or Password.");
        }

        const loggedInUser = {
          id: user._id,
          name: user.name,
          email: email,
        };

        return loggedInUser;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session?.user?.email) {
        const userProfile = await getUserProfileByEmail(session?.user?.email);

        const newSession: Session = {
          ...session,
          user: {
            ...session.user,
            id: userProfile.id,
            name: userProfile.name,
            image: userProfile.image ? userProfile.image : session.user.image,
          },
        };

        return newSession;
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        if (profile?.email) {
          const userExists = await getUserByEmail(profile.email);
          console.log(user);

          if (userExists && user?.image && !userExists.image) {
            await updateProfileImage(userExists._id, user.image);
          }

          if (!userExists) {
            const newUser: CreateUserProfile = {
              email: profile?.email!,
              name: profile?.name!,
              image: user?.image!,
            };

            await createUserProfile(newUser);
          }
        }

        return true;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session;
}
