import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/sessions";

export async function middleware(request: NextRequest) {
  const payload = await decrypt(request.cookies.get("_medusa_jwt")?.value);

  // If the user is authenticated with the appropriate scope, continue as normal
  if (request.url.includes("/restaurant") && payload?.scope === "restaurant") {
    return NextResponse.next();
  }

  if (request.url.includes("/driver") && payload?.scope === "driver") {
    return NextResponse.next();
  }

  if (request.url.includes("/customer") && payload?.scope === "customer") {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/dashboard/:path*",
};
