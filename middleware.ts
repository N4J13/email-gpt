import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/email/inbox", request.url));
  }

  if (
    request.nextUrl.pathname === "/login" &&
    request.cookies.get("session")?.name === "session"
  ) {
    console.log(request.cookies.get("session")?.name);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/email") &&
    !request.cookies.get("session")?.name
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
