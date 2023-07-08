import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { NextAuthOptions, getServerSession } from "next-auth";
import { connectToDB } from "@/lib/database";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await User.findOne({
        email: session.user?.email as string,
      });

      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };

      return newSession;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({
          email: profile?.email as string,
        });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile?.email as string,
            name: profile?.name,
            username: profile?.name?.replaceAll(" ", "").toLowerCase(),
            image: user?.image as string,
          });
        }

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
