import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, getServerSession } from "next-auth";
import { CreateUserProfile, SessionInterface } from "@/common.types";
import bcryptjs from "bcryptjs";

import {
  checkIfUserExists,
  createUserProfile,
  getUserByEmail,
  getUserProfileByEmail,
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
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "lovehiking@mountains.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;

        if (username && password) {
          const user = await getUserByEmail(username);

          if (!user) {
            return null;
          }

          const validPassword = await bcryptjs.compare(password, user.password);

          // check if password is correct
          if (!validPassword) {
            return null;
          }

          console.log(username);
          console.log(password);

          const loggedInUser = {
            id: user._id,
            name: user.name,
            email: username,
          };

          return loggedInUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session?.user?.email) {
        const user = await getUserProfileByEmail(session?.user?.email);

        const newSession = {
          ...session,
          user: {
            ...session.user,
            id: user.id,
          },
        };

        return newSession;
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        console.log(JSON.stringify(credentials));

        if (profile?.email) {
          const userExists = await checkIfUserExists(profile.email);
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
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
