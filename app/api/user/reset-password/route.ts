import { updateUserPassword } from "@/lib/user-actions";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { token, password } = requestBody;

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const updatedUser = await updateUserPassword(token, hashedPassword);

    if (!updatedUser) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
