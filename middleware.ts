import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request?.nextUrl?.pathname;

  const isPublicPath =
    path === "/signin" ||
    path === "/signup" ||
    path === "/forgotpassword" ||
    path === "/resetpassword";

  const isPrivatePath =
    path === "/create-prompt" ||
    path === "/update-prompt" ||
    path === "/update-profile";

  const token =
    request.cookies.get(process.env.NEXTAUTH_COOKIE_TOKEN!)?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/forgotpassword",
    "/resetpassword",
    "/create-prompt",
    "/update-prompt",
    "/update-profile",
  ],
};
