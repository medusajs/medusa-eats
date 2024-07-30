import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/data/sessions";
import { JWTPayload } from "jose";

export async function middleware(request: NextRequest) {
  const payload = (await decrypt(
    request.cookies.get("_medusa_jwt")?.value
  )) as JWTPayload;

  console.log(payload);

  // If the user is authenticated with the appropriate role, continue as normal
  if (
    request.url.includes("/restaurant") &&
    payload?.actor_type === "restaurant"
  ) {
    console.log("restaurant");
    return NextResponse.next();
  }

  if (request.url.includes("/driver") && payload?.actor_type === "driver") {
    console.log("driver");
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  console.log("redirecting to login");
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/dashboard/:path*",
};
