import { Params } from "@/common.types";
import { getUserProfile, removeFollowing } from "@/lib/user-actions";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: Params
) => {
  try {
    const existingUserProfile = await getUserProfile(id);

    if (!existingUserProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }

    const { followingId } = await request.json();

    await removeFollowing(id, followingId);

    return NextResponse.json(
      { message: "User unfollowed successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
