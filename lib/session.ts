import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, getServerSession } from "next-auth";
import { CreateUserProfile, SessionInterface } from "@/common.types";
import { createUserProfile, getUserProfileByEmail } from "./user-actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        const newUser: CreateUserProfile = {
          email: profile?.email!,
          name: profile?.name!,
          image: user?.image!,
        };

        await createUserProfile(newUser);

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
