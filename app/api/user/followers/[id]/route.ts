import { Params } from "@/common.types";
import { getFollowers, getUserProfile } from "@/lib/user-actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params: { id } }: Params) => {
  try {
    const existingUserProfile = await getUserProfile(id);

    if (!existingUserProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }

    const userFollowers = await getFollowers(id);

    if (!userFollowers) {
      return NextResponse.json([], {
        status: 200,
      });
    }

    return NextResponse.json(userFollowers.followers, {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
