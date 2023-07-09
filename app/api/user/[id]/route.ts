import {
  checkIfUsernameExists,
  getUserProfile,
  updateUserProfile,
} from "@/lib/user-actions";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const userProfile = await getUserProfile(id);
    return new Response(JSON.stringify(userProfile), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user profile from the server.", {
      status: 500,
    });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const existingUserProfile = await getUserProfile(id);

    if (!existingUserProfile) {
      return new Response("User not found", { status: 404 });
    }

    const { username, name, bio } = await request.json();

    const isUsernameExists = await checkIfUsernameExists(id, username);

    if (isUsernameExists)
      return new Response("Username already exists", { status: 409 });

    await updateUserProfile(id, username, name, bio);

    return new Response("User Profile Updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Error Updating User Profile", { status: 500 });
  }
};
