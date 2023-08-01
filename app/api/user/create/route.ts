import {
  checkIfUserExists,
  createUserCredentialsProfile,
} from "@/lib/user-actions";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const requestBody = await request.json();
  const { name, email, password } = requestBody;

  try {
    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const userExists = await checkIfUserExists(email);

    if (!userExists) {
      const newUser = await createUserCredentialsProfile({
        name,
        email,
        password: hashedPassword,
      });

      return NextResponse.json(newUser, { status: 201 });
    }

    return NextResponse.json({ error: "User Already Exists" }, { status: 403 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
