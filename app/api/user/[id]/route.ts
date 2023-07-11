import { Params } from "@/common.types";
import { getPromptsByUserId } from "@/lib/prompt-actions";
import {
  checkIfUsernameExists,
  getUserProfile,
  updateUserProfile,
} from "@/lib/user-actions";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params: { id } }: Params) => {
  try {
    const userProfile = await getUserProfile(id);

    if (!userProfile) {
      console.log(error);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const prompts = await getPromptsByUserId(id);

    return NextResponse.json(
      { result: { userProfile, prompts } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Params
) => {
  try {
    const existingUserProfile = await getUserProfile(id);

    if (!existingUserProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { username, name, bio } = await request.json();

    const isUsernameExists = await checkIfUsernameExists(id, username);

    if (isUsernameExists)
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );

    await updateUserProfile(id, { username, name, bio });

    return NextResponse.json(
      { message: "User Profile Updated successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
