import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions, getServerSession } from "next-auth";
import { CreateUserProfile, SessionInterface } from "@/common.types";
import { createUserProfile, getUserProfileByEmail } from "./user-actions";

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
      console.log(user?.image);
      try {
        const newUser: CreateUserProfile = {
          email: profile?.email!,
          name: profile?.name!,
          image: user?.image!,
        };

        await createUserProfile(newUser);

        return true;
      } catch (error: any) {
        console.log(error.message);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
