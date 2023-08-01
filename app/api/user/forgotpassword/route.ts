import { sendEmail } from "@/lib/mailer";
import { checkIfUserExists } from "@/lib/user-actions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email } = requestBody;

    const user = await checkIfUserExists(email);

    // check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    //send password reset email
    await sendEmail({
      email,
      userId: user._id,
    });

    return NextResponse.json({
      message: "Password reset email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.msg }, { status: 500 });
  }
};
